export default function HomePage() {
	return (
		<div style={{ padding: "2rem", fontFamily: "system-ui" }}>
			<h1>Cloud Agents</h1>
			<p>Roo Code task execution service</p>

			<div style={{ marginTop: "2rem" }}>
				<h2>Status</h2>
				<p>Service is running</p>
			</div>

			<div style={{ marginTop: "2rem" }}>
				<h2>API Endpoints</h2>
				<ul>
					<li>
						<code>POST /api/jobs</code> - Create a new job
					</li>
					<li>
						<code>GET /api/jobs/:id</code> - Get job status
					</li>
					<li>
						<code>POST /api/webhooks/github</code> - GitHub webhook handler
					</li>
					<li>
						<code>GET /api/health</code> - Health check
					</li>
				</ul>
			</div>
		</div>
	)
}
