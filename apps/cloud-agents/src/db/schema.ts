import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

/**
 * cloudJobs
 */

export const cloudJobs = pgTable("cloud_jobs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	type: text().notNull(), // e.g., 'github.issue.fix'
	status: text().notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'
	payload: jsonb().notNull(), // job-specific data
	result: jsonb(), // job output
	error: text(), // error message if failed
	createdAt: timestamp("created_at").notNull().defaultNow(),
	startedAt: timestamp("started_at"),
	completedAt: timestamp("completed_at"),
})

export const cloudJobsRelations = relations(cloudJobs, ({ many }) => ({
	tasks: many(cloudTasks),
}))

export type CloudJob = typeof cloudJobs.$inferSelect
export type InsertCloudJob = typeof cloudJobs.$inferInsert
export type UpdateCloudJob = Partial<Omit<CloudJob, "id" | "createdAt">>

/**
 * cloudTasks
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

export const cloudTasksRelations = relations(cloudTasks, ({ one }) => ({
	job: one(cloudJobs, { fields: [cloudTasks.jobId], references: [cloudJobs.id] }),
}))

export type CloudTask = typeof cloudTasks.$inferSelect
export type InsertCloudTask = typeof cloudTasks.$inferInsert
export type UpdateCloudTask = Partial<Omit<CloudTask, "id" | "createdAt">>

/**
 * schema
 */

export const schema = {
	cloudJobs,
	cloudTasks,
	cloudJobsRelations,
	cloudTasksRelations,
}
