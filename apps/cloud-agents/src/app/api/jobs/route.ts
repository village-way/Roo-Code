import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db, cloudJobs, JobTypes } from "@/lib/db"
import { addJob } from "@/lib/queue"

const githubIssueFixSchema = z.object({
	repo: z.string(),
	issue: z.number(),
	title: z.string(),
	body: z.string(),
	labels: z.array(z.string()).optional(),
})

const taskExecuteSchema = z.object({
	prompt: z.string(),
	workspace: z.string().optional(),
	settings: z.record(z.unknown()).optional(),
})

const createJobSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("github.issue.fix"),
		payload: githubIssueFixSchema,
	}),
	z.object({
		type: z.literal("task.execute"),
		payload: taskExecuteSchema,
	}),
])

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const parsed = createJobSchema.parse(body)

		// Create job record in database
		const jobs = await db
			.insert(cloudJobs)
			.values({
				type: parsed.type,
				status: "pending",
				payload: parsed.payload,
			})
			.returning()

		const job = jobs[0]
		if (!job) {
			throw new Error("Failed to create job")
		}

		// Add job to queue with proper typing
		if (parsed.type === "github.issue.fix") {
			await addJob("github.issue.fix", parsed.payload as JobTypes["github.issue.fix"], job.id)
		} else if (parsed.type === "task.execute") {
			await addJob("task.execute", parsed.payload as JobTypes["task.execute"], job.id)
		}

		return NextResponse.json({
			id: job.id,
			type: job.type,
			status: job.status,
			createdAt: job.createdAt,
		})
	} catch (error) {
		console.error("Error creating job:", error)

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: "Invalid request body", details: error.errors }, { status: 400 })
		}

		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
