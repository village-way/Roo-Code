# Cloud Agents Architecture

## Overview

Cloud Agents is a Next.js application that exposes an API for enqueueing Roo Code tasks via BullMQ, processes them in Docker containers, and integrates with GitHub webhooks to automatically fix issues.

## System Architecture

```mermaid
flowchart TB
    GH[GitHub Webhook] --> API[Next.js API Routes]
    API --> BQ[BullMQ Queue]
    BQ --> JH[Job Handler]
    JH --> DC[Docker Container]
    DC --> RC[Roo Code Task Runner]

    subgraph Infrastructure
        PG[(PostgreSQL)]
        RD[(Redis)]
    end

    API --> PG
    BQ --> RD
    JH --> PG
```

## Directory Structure

```
apps/cloud-agents/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── webhooks/
│   │   │   │   └── github/
│   │   │   │       └── route.ts      # GitHub webhook handler
│   │   │   ├── jobs/
│   │   │   │   ├── route.ts          # Create job endpoint
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # Get job status
│   │   │   └── health/
│   │   │       └── route.ts          # Health check
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Simple dashboard
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts              # Cloud agents schema
│   │   │   └── index.ts
│   │   ├── queue/
│   │   │   ├── processor.ts           # BullMQ processor
│   │   │   ├── jobs.ts                # Job definitions
│   │   │   └── index.ts
│   │   ├── docker/
│   │   │   ├── runner.ts              # Docker container runner
│   │   │   └── config.ts
│   │   └── github/
│   │       ├── webhooks.ts            # Webhook handlers
│   │       └── types.ts
│   └── types/
│       └── index.ts
├── docker/
│   ├── Dockerfile.agent               # Simplified runner
│   └── docker-compose.yml
├── package.json
├── tsconfig.json
├── next.config.ts
└── .env.example
```

## Key Components

### 1. Database Schema (Drizzle ORM)

The cloud agents database extends the existing evals database with additional tables:

```typescript
// Cloud agent specific tables
- cloudJobs: Track job requests
  - id: integer (primary key)
  - type: text (e.g., 'github.issue.fix', 'task.execute')
  - status: text ('pending', 'processing', 'completed', 'failed')
  - payload: jsonb (job-specific data)
  - result: jsonb (job output)
  - error: text (error message if failed)
  - createdAt: timestamp
  - startedAt: timestamp
  - completedAt: timestamp

- cloudTasks: Link cloud jobs to Roo Code tasks
  - id: integer (primary key)
  - jobId: integer (references cloudJobs)
  - taskId: integer (references tasks from evals)
  - containerId: text (Docker container ID)
  - createdAt: timestamp
```

### 2. BullMQ Job Types

```typescript
interface JobTypes {
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
		settings?: RooCodeSettings // Optional Roo Code settings override
	}
}
```

### 3. Simplified Docker Runner

The cloud agents Docker image is based on the existing `Dockerfile.runner` but simplified:

**Remove:**

- Language-specific VS Code extensions (Go, Java, Python, Rust)
- Eval-specific dependencies and test infrastructure
- UV/Python sync steps

**Keep:**

- Base Node.js environment
- VS Code installation
- Roo Code extension build and installation
- Basic utilities (git, curl, etc.)
- Docker CLI for nested container support

### 4. API Endpoints

#### `POST /api/webhooks/github`

Handles GitHub webhook events, specifically for issue events.

- Verifies webhook signature
- Parses issue data
- Creates appropriate job in queue

#### `POST /api/jobs`

Creates a new job in the queue.

```typescript
Request: {
  type: keyof JobTypes
  payload: JobTypes[type]
}
Response: {
  id: string
  status: string
}
```

#### `GET /api/jobs/:id`

Retrieves job status and results.

```typescript
Response: {
  id: string
  type: string
  status: string
  payload: object
  result?: object
  error?: string
  createdAt: string
  startedAt?: string
  completedAt?: string
}
```

#### `GET /api/health`

Health check endpoint for monitoring.

```typescript
Response: {
	status: "ok" | "error"
	services: {
		database: boolean
		redis: boolean
		docker: boolean
	}
}
```

## Implementation Phases

### Phase 1: Core Infrastructure

1. Create Next.js app structure in `apps/cloud-agents`
2. Set up database schema using Drizzle ORM
3. Configure Docker compose with PostgreSQL & Redis
4. Create simplified Dockerfile.agent

### Phase 2: Job Queue

1. Implement BullMQ setup and configuration
2. Create job processor with proper error handling
3. Add Docker container spawning logic
4. Implement job status tracking in database

### Phase 3: API & Webhooks

1. Create all API route handlers
2. Implement GitHub webhook signature verification
3. Add issue parsing and automatic job creation
4. Create simple status dashboard

### Phase 4: Testing & Deployment

1. Add integration tests for API endpoints
2. Create production docker-compose configuration
3. Add monitoring and structured logging
4. Write comprehensive documentation

## Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/cloud_agents

# Redis
REDIS_URL=redis://localhost:6379

# GitHub Integration
GITHUB_WEBHOOK_SECRET=your-webhook-secret
GITHUB_APP_ID=your-app-id
GITHUB_PRIVATE_KEY=your-private-key-base64

# API Keys for Roo Code
OPENROUTER_API_KEY=your-openrouter-key
ANTHROPIC_API_KEY=your-anthropic-key

# Docker Configuration
DOCKER_NETWORK=cloud-agents_default
DOCKER_IMAGE=cloud-agents-runner:latest
MAX_CONCURRENT_CONTAINERS=5

# Application
PORT=3001
NODE_ENV=development
```

### Docker Compose Services

```yaml
services:
    app:
        build: .
        ports:
            - "3001:3001"
        environment:
            - DATABASE_URL
            - REDIS_URL
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
        depends_on:
            - db
            - redis

    db:
        image: postgres:17
        environment:
            - POSTGRES_PASSWORD=password
            - POSTGRES_DB=cloud_agents

    redis:
        image: redis:7-alpine
```

## Error Handling & Retry Logic

1. **Job Retries**: Failed jobs will be retried up to 3 times with exponential backoff
2. **Container Timeouts**: Tasks have a 30-minute timeout by default
3. **Resource Cleanup**: Containers are always cleaned up, even on failure
4. **Dead Letter Queue**: Failed jobs after all retries go to DLQ for manual review

## Security Considerations

1. **Webhook Verification**: All GitHub webhooks are verified using HMAC
2. **Container Isolation**: Each task runs in an isolated container
3. **Resource Limits**: CPU and memory limits on containers
4. **API Authentication**: Consider adding API key authentication for job creation

## Monitoring & Observability

1. **Metrics**: Job queue depth, processing time, success rate
2. **Logging**: Structured logs for all job processing steps
3. **Health Checks**: Regular checks on all dependent services
4. **Alerts**: Notifications for failed jobs and system issues
