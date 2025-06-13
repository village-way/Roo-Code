import { NextRequest, NextResponse } from "next/server"
import { createHmac } from "crypto"
import { z } from "zod"

import { type JobType, type JobStatus, type JobPayload, githubWebhookSchema } from "@/types"
import { db, cloudJobs } from "@/db"
import { enqueue } from "@/lib"

function verifySignature(body: string, signature: string, secret: string): boolean {
	const expectedSignature = createHmac("sha256", secret).update(body, "utf8").digest("hex")
	const receivedSignature = signature.replace("sha256=", "")
	return expectedSignature === receivedSignature
}

export async function POST(request: NextRequest) {
	try {
		const signature = request.headers.get("x-hub-signature-256")
		const event = request.headers.get("x-github-event")

		if (!signature) {
			return NextResponse.json({ error: "Missing signature" }, { status: 400 })
		}

		const body = await request.text()

		if (!verifySignature(body, signature, process.env.GITHUB_WEBHOOK_SECRET!)) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
		}

		console.log("✅ Signature verified")
		console.log("📋 Event ->", event)

		if (event !== "issues") {
			return NextResponse.json({ message: "event_ignored" })
		}

		const data = githubWebhookSchema.parse(JSON.parse(body))

		console.log("🗄️ Data ->", data)

		if (data.action !== "opened") {
			return NextResponse.json({ message: "action_ignored" })
		}

		const type: JobType = "github.issue.fix"
		const status: JobStatus = "pending"

		const payload: JobPayload<typeof type> = {
			repo: data.repository.full_name,
			issue: data.issue.number,
			title: data.issue.title,
			body: data.issue.body || "",
			labels: data.issue.labels.map((label) => label.name),
		}

		const [job] = await db.insert(cloudJobs).values({ type, status, payload }).returning()

		if (!job) {
			throw new Error("Failed to create job")
		}

		await enqueue({ jobId: job.id, type, payload })
		return NextResponse.json({ message: "Job created successfully", jobId: job.id })
	} catch (error) {
		console.error("GitHub webhook error:", error)

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: "Invalid webhook payload", details: error.errors }, { status: 400 })
		}

		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
