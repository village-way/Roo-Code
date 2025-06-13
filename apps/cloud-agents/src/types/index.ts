import { z } from "zod"

export interface JobTypes {
	"github.issue.fix": {
		repo: string // e.g., "RooCodeInc/Roo-Code"
		issue: number // Issue number
		title: string // Issue title
		body: string // Issue description
		labels?: string[] // Issue labels
	}
}

export type JobStatus = "pending" | "processing" | "completed" | "failed"

export type CloudJobData<T extends keyof JobTypes = keyof JobTypes> = {
	type: T
	payload: JobTypes[T]
	jobId: number
}

export const createJobSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("github.issue.fix"),
		payload: z.object({
			repo: z.string(),
			issue: z.number(),
			title: z.string(),
			body: z.string(),
			labels: z.array(z.string()).optional(),
		}),
	}),
])

export type CreateJob = z.infer<typeof createJobSchema>
