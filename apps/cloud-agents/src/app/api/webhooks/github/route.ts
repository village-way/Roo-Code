import { NextRequest, NextResponse } from "next/server"
import { createHmac } from "crypto"
import { z } from "zod"

import { db, cloudJobs } from "@/db"
import { enqueue } from "@/lib"

const githubWebhookSchema = z.object({
	action: z.string(),
	issue: z.object({
		number: z.number(),
		title: z.string(),
		body: z.string().nullable(),
		labels: z.array(z.object({ name: z.string() })),
	}),
	repository: z.object({
		full_name: z.string(),
	}),
})

function verifySignature(payload: string, signature: string, secret: string): boolean {
	const expectedSignature = createHmac("sha256", secret).update(payload, "utf8").digest("hex")
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

		const payload = await request.text()

		if (!verifySignature(payload, signature, process.env.GITHUB_WEBHOOK_SECRET!)) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
		}

		if (event !== "issues") {
			return NextResponse.json({ message: "Event ignored" })
		}

		const data = githubWebhookSchema.parse(JSON.parse(payload))

		if (data.action !== "opened") {
			return NextResponse.json({ message: "Action ignored" })
		}

		const jobPayload = {
			repo: data.repository.full_name,
			issue: data.issue.number,
			title: data.issue.title,
			body: data.issue.body || "",
			labels: data.issue.labels.map((label) => label.name),
		}

		const [job] = await db
			.insert(cloudJobs)
			.values({ type: "github.issue.fix", status: "pending", payload: jobPayload })
			.returning()

		if (!job) {
			throw new Error("Failed to create job")
		}

		await enqueue("github.issue.fix", jobPayload, job.id)
		return NextResponse.json({ message: "Job created successfully", jobId: job.id })
	} catch (error) {
		console.error("GitHub webhook error:", error)

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: "Invalid webhook payload", details: error.errors }, { status: 400 })
		}

		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
