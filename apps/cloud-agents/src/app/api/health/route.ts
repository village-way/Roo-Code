import { NextResponse } from "next/server"
import { redis } from "@/lib/queue"
import { db } from "@/lib/db"

export async function GET() {
	try {
		const services = {
			database: false,
			redis: false,
		}

		// Check database connection
		try {
			await db.execute("SELECT 1")
			services.database = true
		} catch (error) {
			console.error("Database health check failed:", error)
		}

		// Check Redis connection
		try {
			await redis.ping()
			services.redis = true
		} catch (error) {
			console.error("Redis health check failed:", error)
		}

		const allHealthy = Object.values(services).every(Boolean)

		return NextResponse.json(
			{
				status: allHealthy ? "ok" : "error",
				services,
			},
			{ status: allHealthy ? 200 : 500 },
		)
	} catch (error) {
		console.error("Health check error:", error)
		return NextResponse.json(
			{
				status: "error",
				error: "Internal server error",
			},
			{ status: 500 },
		)
	}
}
