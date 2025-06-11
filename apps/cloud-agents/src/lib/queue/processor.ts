import { Worker, Job } from "bullmq"
import { redis } from "./index.js"
import { db, cloudJobs, JobTypes } from "../db/index.js"
import { eq } from "drizzle-orm"
import { runTaskInContainer } from "../docker/runner.js"

export type CloudJobData<T extends keyof JobTypes = keyof JobTypes> = {
	type: T
	payload: JobTypes[T]
	jobId: number
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
		if (result) updates.result = result
		if (error) updates.error = error
	}

	await db.update(cloudJobs).set(updates).where(eq(cloudJobs.id, jobId))
}

async function processGitHubIssueFix(
	jobId: number,
	payload: JobTypes["github.issue.fix"],
): Promise<{
	repo: string
	issue: number
	result: unknown
}> {
	// Generate a prompt for fixing the GitHub issue
	const prompt = `
Fix the following GitHub issue:

Repository: ${payload.repo}
Issue #${payload.issue}: ${payload.title}

Description:
${payload.body}

${payload.labels && payload.labels.length > 0 ? `Labels: ${payload.labels.join(", ")}` : ""}

Please analyze the issue, understand what needs to be fixed, and implement a solution.
`.trim()

	// Run the task in a container
	const result = await runTaskInContainer({
		prompt,
		jobId,
		type: "github.issue.fix",
	})

	return {
		repo: payload.repo,
		issue: payload.issue,
		result,
	}
}

async function processTaskExecute(jobId: number, payload: JobTypes["task.execute"]): Promise<unknown> {
	// Run the custom task in a container
	const result = await runTaskInContainer({
		prompt: payload.prompt,
		workspace: payload.workspace,
		settings: payload.settings,
		jobId,
		type: "task.execute",
	})

	return result
}

async function processJob(job: Job<CloudJobData>) {
	const { type, payload, jobId } = job.data

	console.log(`Processing job ${jobId} of type ${type}`)

	try {
		// Update job status to processing
		await updateJobStatus(jobId, "processing")

		let result: unknown

		switch (type) {
			case "github.issue.fix":
				result = await processGitHubIssueFix(jobId, payload as JobTypes["github.issue.fix"])
				break
			case "task.execute":
				result = await processTaskExecute(jobId, payload as JobTypes["task.execute"])
				break
			default:
				throw new Error(`Unknown job type: ${type}`)
		}

		// Update job status to completed
		await updateJobStatus(jobId, "completed", result)

		console.log(`Job ${jobId} completed successfully`)
	} catch (error) {
		console.error(`Job ${jobId} failed:`, error)

		const errorMessage = error instanceof Error ? error.message : String(error)
		await updateJobStatus(jobId, "failed", undefined, errorMessage)

		throw error // Re-throw to mark job as failed in BullMQ
	}
}

// Create and export the worker
export const worker = new Worker("cloud-agents", processJob, {
	connection: redis,
	concurrency: 2, // Process up to 2 jobs concurrently
	removeOnComplete: { count: 100 },
	removeOnFail: { count: 50 },
})

worker.on("completed", (job) => {
	console.log(`Job ${job.id} completed`)
})

worker.on("failed", (job, err) => {
	console.error(`Job ${job?.id} failed:`, err)
})

worker.on("error", (err) => {
	console.error("Worker error:", err)
})

console.log("Cloud agents worker started")
