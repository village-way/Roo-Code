import { NextRequest, NextResponse } from "next/server"
import { createHmac } from "crypto"
import { z } from "zod"
import { db, cloudJobs } from "@/lib/db"
import { addJob } from "@/lib/queue"

const githubWebhookSchema = z.object({
	action: z.string(),
	issue: z.object({
		number: z.number(),
		title: z.string(),
		body: z.string().nullable(),
		labels: z.array(
			z.object({
				name: z.string(),
			}),
		),
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

		// Verify webhook signature
		const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET
		if (webhookSecret && !verifySignature(payload, signature, webhookSecret)) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
		}

		// Only handle issue events
		if (event !== "issues") {
			return NextResponse.json({ message: "Event ignored" })
		}

		const data = githubWebhookSchema.parse(JSON.parse(payload))

		// Only handle opened issues
		if (data.action !== "opened") {
			return NextResponse.json({ message: "Action ignored" })
		}

		// Create job for issue fix
		const jobPayload = {
			repo: data.repository.full_name,
			issue: data.issue.number,
			title: data.issue.title,
			body: data.issue.body || "",
			labels: data.issue.labels.map((label) => label.name),
		}

		// Create job record in database
		const jobs = await db
			.insert(cloudJobs)
			.values({
				type: "github.issue.fix",
				status: "pending",
				payload: jobPayload,
			})
			.returning()

		const job = jobs[0]
		if (!job) {
			throw new Error("Failed to create job")
		}

		// Add job to queue
		await addJob("github.issue.fix", jobPayload, job.id)

		return NextResponse.json({
			message: "Job created successfully",
			jobId: job.id,
		})
	} catch (error) {
		console.error("GitHub webhook error:", error)

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: "Invalid webhook payload", details: error.errors }, { status: 400 })
		}

		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
