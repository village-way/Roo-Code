import * as path from "path"
import * as os from "node:os"

import type { JobTypes } from "@/types"

import { runTask } from "../runTask"
import { Logger } from "../logger"

export async function fixGitHubIssue(
	jobId: number,
	payload: JobTypes["github.issue.fix"],
): Promise<{
	repo: string
	issue: number
	result: unknown
}> {
	const prompt = `
Fix the following GitHub issue:

Repository: ${payload.repo}
Issue #${payload.issue}: ${payload.title}

Description:
${payload.body}

${payload.labels && payload.labels.length > 0 ? `Labels: ${payload.labels.join(", ")}` : ""}

Please analyze the issue, understand what needs to be fixed, and implement a solution.
`.trim()

	const result = await runTask({
		prompt,
		publish: async () => {},
		logger: new Logger({
			logDir: path.resolve(os.tmpdir(), "logs"),
			filename: "worker.log",
			tag: "worker",
		}),
	})

	return { repo: payload.repo, issue: payload.issue, result }
}
