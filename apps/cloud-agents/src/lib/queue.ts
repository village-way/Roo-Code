import { Queue, Job } from "bullmq"

import type { JobTypes, CloudJobData } from "@/types"

import { redis } from "./redis"

const queue = new Queue("cloud-agents", {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: 100,
		removeOnFail: 50,
		attempts: 3,
		backoff: { type: "exponential", delay: 2000 },
	},
})

export async function enqueue<T extends keyof JobTypes>(
	type: T,
	payload: JobTypes[T],
	jobId: number,
): Promise<Job<CloudJobData<T>>> {
	return queue.add(type, { type, payload, jobId }, { jobId: `${type}-${jobId}` })
}
