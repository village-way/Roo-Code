import { Queue, Job } from "bullmq"
import IORedis from "ioredis"
import { JobTypes } from "../db/schema.js"

// Redis connection
const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
	maxRetriesPerRequest: null,
})

// Job queue
export const cloudQueue = new Queue("cloud-agents", {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: 100,
		removeOnFail: 50,
		attempts: 3,
		backoff: {
			type: "exponential",
			delay: 2000,
		},
	},
})

// Job types
export type CloudJobData<T extends keyof JobTypes = keyof JobTypes> = {
	type: T
	payload: JobTypes[T]
	jobId: number
}

// Add job to queue
export async function addJob<T extends keyof JobTypes>(
	type: T,
	payload: JobTypes[T],
	jobId: number,
): Promise<Job<CloudJobData<T>>> {
	return cloudQueue.add(
		type,
		{
			type,
			payload,
			jobId,
		},
		{
			jobId: `${type}-${jobId}`,
		},
	)
}

// Export redis connection for other uses
export { redis }
