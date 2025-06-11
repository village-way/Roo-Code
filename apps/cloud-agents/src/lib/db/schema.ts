import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

/**
 * Cloud Jobs - Track job requests
 */
export const cloudJobs = pgTable("cloud_jobs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	type: text().notNull(), // e.g., 'github.issue.fix', 'task.execute'
	status: text().notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'
	payload: jsonb().notNull(), // job-specific data
	result: jsonb(), // job output
	error: text(), // error message if failed
	createdAt: timestamp("created_at").notNull().defaultNow(),
	startedAt: timestamp("started_at"),
	completedAt: timestamp("completed_at"),
})

/**
 * Cloud Tasks - Link cloud jobs to Roo Code tasks
 */
export const cloudTasks = pgTable("cloud_tasks", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	jobId: integer("job_id")
		.references(() => cloudJobs.id)
		.notNull(),
	taskId: integer("task_id"), // references tasks from evals database
	containerId: text("container_id"), // Docker container ID
	createdAt: timestamp("created_at").notNull().defaultNow(),
})

/**
 * Relations
 */
export const cloudJobsRelations = relations(cloudJobs, ({ many }) => ({
	tasks: many(cloudTasks),
}))

export const cloudTasksRelations = relations(cloudTasks, ({ one }) => ({
	job: one(cloudJobs, { fields: [cloudTasks.jobId], references: [cloudJobs.id] }),
}))

/**
 * Types
 */
export type CloudJob = typeof cloudJobs.$inferSelect
export type InsertCloudJob = typeof cloudJobs.$inferInsert
export type UpdateCloudJob = Partial<Omit<CloudJob, "id" | "createdAt">>

export type CloudTask = typeof cloudTasks.$inferSelect
export type InsertCloudTask = typeof cloudTasks.$inferInsert
export type UpdateCloudTask = Partial<Omit<CloudTask, "id" | "createdAt">>

/**
 * Job Types
 */
export interface JobTypes {
	"github.issue.fix": {
		repo: string // e.g., "RooCodeInc/Roo-Code"
		issue: number // Issue number
		title: string // Issue title
		body: string // Issue description
		labels?: string[] // Issue labels
	}
	"task.execute": {
		prompt: string // Task prompt
		workspace?: string // Optional workspace path
		settings?: Record<string, unknown> // Optional Roo Code settings override
	}
}

/**
 * Job Status
 */
export type JobStatus = "pending" | "processing" | "completed" | "failed"

/**
 * Schema export
 */
export const schema = {
	cloudJobs,
	cloudTasks,
	cloudJobsRelations,
	cloudTasksRelations,
}
