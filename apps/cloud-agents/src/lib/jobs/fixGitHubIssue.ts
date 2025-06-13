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
If you're reasonably satisfied with the solution then create and submit a pull request using the "gh" command line tool.
You'll first need to create a new branch for the pull request.

Make sure to reference the issue in the pull request description.
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
