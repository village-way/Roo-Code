import { eq } from "drizzle-orm"
import { Job } from "bullmq"

import { db, cloudJobs } from "@/db"
import type { JobTypes, CloudJobData } from "@/types"

import { fixGitHubIssue } from "./jobs/fixGitHubIssue"

export async function processJob(job: Job<CloudJobData>) {
	const { type, payload, jobId } = job.data
	console.log(`Processing job ${jobId} of type ${type}`)

	try {
		await updateJobStatus(jobId, "processing")
		let result: unknown

		switch (type) {
			case "github.issue.fix":
				result = await fixGitHubIssue(jobId, payload as JobTypes["github.issue.fix"])
				break
			default:
				throw new Error(`Unknown job type: ${type}`)
		}

		await updateJobStatus(jobId, "completed", result)
		console.log(`Job ${jobId} completed successfully`)
	} catch (error) {
		console.error(`Job ${jobId} failed:`, error)
		const errorMessage = error instanceof Error ? error.message : String(error)
		await updateJobStatus(jobId, "failed", undefined, errorMessage)
		throw error // Re-throw to mark job as failed in BullMQ.
	}
}

async function updateJobStatus(
	jobId: number,
	status: "processing" | "completed" | "failed",
	result?: unknown,
	error?: string,
) {
	const updates: Record<string, unknown> = { status }

	if (status === "processing") {
		updates.startedAt = new Date()
	} else if (status === "completed" || status === "failed") {
		updates.completedAt = new Date()

		if (result) {
			updates.result = result
		}

		if (error) {
			updates.error = error
		}
	}

	await db.update(cloudJobs).set(updates).where(eq(cloudJobs.id, jobId))
}
