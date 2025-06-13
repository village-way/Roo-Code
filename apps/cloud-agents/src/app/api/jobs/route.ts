import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { createJobSchema } from "@/types"
import { db, cloudJobs } from "@/db"
import { enqueue } from "@/lib"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const values = createJobSchema.parse(body)
		const [job] = await db
			.insert(cloudJobs)
			.values({ ...values, status: "pending" })
			.returning()

		if (!job) {
			throw new Error("Failed to create job")
		}

		switch (values.type) {
			case "github.issue.fix":
				await enqueue({ jobId: job.id, type: "github.issue.fix", payload: values.payload })
				break
			default:
				throw new Error(`Unknown job type: ${values.type}`)
		}

		return NextResponse.json(job)
	} catch (error) {
		console.error("Error creating job:", error)

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: "Invalid request body", details: error.errors }, { status: 400 })
		}

		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
