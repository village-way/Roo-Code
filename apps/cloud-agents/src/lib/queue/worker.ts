#!/usr/bin/env node

import { worker } from "./processor.js"

// Handle graceful shutdown
process.on("SIGTERM", async () => {
	console.log("Received SIGTERM, shutting down gracefully...")
	await worker.close()
	process.exit(0)
})

process.on("SIGINT", async () => {
	console.log("Received SIGINT, shutting down gracefully...")
	await worker.close()
	process.exit(0)
})

// Keep the process running
console.log("Worker process started")
