import { createBullBoard } from "@bull-board/api"
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
import { ExpressAdapter } from "@bull-board/express"
import { Queue } from "bullmq"
import IORedis from "ioredis"
import express, { type Express, type Request, type Response } from "express"

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6380", {
	maxRetriesPerRequest: null,
})

const cloudQueue = new Queue("cloud-agents", { connection: redis })

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath("/admin/queues")

createBullBoard({ queues: [new BullMQAdapter(cloudQueue)], serverAdapter: serverAdapter })

const app: Express = express()

app.use("/admin/queues", serverAdapter.getRouter())

app.use("/", (req: Request, res: Response) => {
	res.redirect("/admin/queues")
})

const port = process.env.BULL_BOARD_PORT || 3002

app.listen(port, () => {
	console.log(`Bull Board running on: http://localhost:${port}/admin/queues`)
})
