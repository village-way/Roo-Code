# Cloud Agents

A Next.js application that exposes an API for enqueueing Roo Code tasks via BullMQ, processes them in Docker containers, and integrates with GitHub webhooks to automatically fix issues.

## Features

- **Job Queue**: BullMQ-powered job processing with Redis
- **GitHub Integration**: Webhook handler for automatic issue fixing
- **Docker Containers**: Isolated task execution using Roo Code
- **REST API**: Simple endpoints for job management
- **Database**: PostgreSQL with Drizzle ORM

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm
- Docker & Docker Compose

### Development Setup

1. **Install dependencies**:

    ```bash
    cd apps/cloud-agents
    pnpm install
    ```

2. **Set up environment**:

    ```bash
    cp .env.example .env.local
    # Edit .env.local with your configuration
    ```

3. **Start services**:

    ```bash
    pnpm services:start
    ```

4. **Run database migrations**:

    ```bash
    pnpm db:push
    ```

5. **Start the development server**:

    ```bash
    pnpm dev
    ```

6. **Start the worker** (in another terminal):
    ```bash
    pnpm worker:dev
    ```

The API will be available at http://localhost:3001

### Production Deployment

1. **Build Docker images**:

    ```bash
    docker compose build
    ```

2. **Start all services**:
    ```bash
    docker compose --profile server up -d
    ```

## API Endpoints

### Health Check

```http
GET /api/health
```

### Create Job

```http
POST /api/jobs
Content-Type: application/json

{
  "type": "github.issue.fix",
  "payload": {
    "repo": "owner/repo",
    "issue": 123,
    "title": "Issue title",
    "body": "Issue description"
  }
}
```

### Get Job Status

```http
GET /api/jobs/:id
```

### GitHub Webhook

```http
POST /api/webhooks/github
```

## Job Types

### GitHub Issue Fix

Automatically creates tasks to fix GitHub issues when they are opened.

```typescript
{
  "type": "github.issue.fix",
  "payload": {
    "repo": "owner/repo",
    "issue": 123,
    "title": "Issue title",
    "body": "Issue description",
    "labels": ["bug", "priority:high"]
  }
}
```

### Custom Task

Execute arbitrary Roo Code tasks.

```typescript
{
  "type": "task.execute",
  "payload": {
    "prompt": "Your task description",
    "workspace": "/path/to/workspace",
    "settings": {
      "model": "claude-3-sonnet",
      "temperature": 0.1
    }
  }
}
```

## Configuration

### Environment Variables

See `.env.example` for all available configuration options.

### GitHub Webhook Setup

1. Create a webhook in your GitHub repository
2. Set the payload URL to `https://your-domain.com/api/webhooks/github`
3. Set the content type to `application/json`
4. Set the secret to match `GITHUB_WEBHOOK_SECRET` in your environment
5. Subscribe to "Issues" events

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design and component descriptions.

## Development

### Database Management

```bash
# Generate migration
pnpm db:generate

# Apply migration
pnpm db:migrate

# Push schema changes (development)
pnpm db:push

# Open database studio
pnpm db:studio
```

### Docker Commands

```bash
# Build agent container
docker compose build runner

# Start a shell in the agent container
docker compose run --rm runner bash

# View logs
docker compose logs -f worker
```

### Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:3001/api/health

# Create a job
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "type": "task.execute",
    "payload": {
      "prompt": "Create a simple hello world program"
    }
  }'

# Check job status
curl http://localhost:3001/api/jobs/1
```

## Troubleshooting

### Common Issues

1. **Database connection failed**: Make sure PostgreSQL is running and the connection string is correct
2. **Redis connection failed**: Ensure Redis is running on the specified port
3. **Docker permission denied**: Make sure your user is in the docker group
4. **Port already in use**: Check if another service is using ports 3001, 5433, or 6380

### Logs

```bash
# Application logs
docker compose logs app

# Worker logs
docker compose logs worker

# Database logs
docker compose logs db
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

See the main repository license.
