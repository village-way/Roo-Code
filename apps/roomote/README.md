# Roomote - 云端代理任务执行系统

Roomote 是 Roo Code 项目中的远程代理系统，用于自动化执行 GitHub issue 修复等开发任务。该系统通过容器化的方式运行 VS Code 实例，利用 AI 代理自动分析问题、编写代码、创建 Pull Request，实现全自动化的代码修复流程。

## 🏗️ 系统架构

### 核心组件

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub API    │    │   Slack API     │    │   PostgreSQL    │
│   (Webhooks)    │    │  (通知系统)     │    │   (作业存储)    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Roomote API (Next.js)                       │
│  • REST API 端点            • GitHub Webhook 处理              │
│  • 作业管理                 • 健康检查                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Redis (BullMQ)                              │
│  • 作业队列                 • 状态管理                         │
│  • 任务调度                 • 结果缓存                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Worker Controller                             │
│  • 动态工作节点管理         • 自动伸缩                         │
│  • 负载监控                 • 容器编排                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Worker Instances                               │
│  • VS Code 容器实例         • AI 代理执行                     │
│  • 代码分析和修复           • PR 创建                          │
└─────────────────────────────────────────────────────────────────┘
```

### 服务组件详解

#### 1. **API 服务** (`roomote-api`)

- **功能**: 提供 REST API 接口，处理作业创建、查询和 GitHub Webhooks
- **端口**: 3001
- **关键端点**:
    - `POST /api/jobs` - 创建新的作业
    - `GET /api/jobs/:id` - 查询作业状态
    - `POST /api/webhooks/github` - 处理 GitHub 事件
    - `GET /api/health` - 健康检查

#### 2. **控制器服务** (`roomote-controller`)

- **功能**: 监控作业队列，动态管理工作节点
- **特性**:
    - 实时监控 Redis 队列状态
    - 根据负载自动启动/停止 Worker 容器
    - 最大支持 5 个并发 Worker
    - 每 5 秒检查一次队列状态

#### 3. **工作节点** (`roomote-worker`)

- **功能**: 执行具体的作业任务
- **特性**:
    - 单次作业处理模式
    - 内置完整的开发环境 (VS Code + Git + GitHub CLI)
    - 30 分钟作业超时限制
    - 自动资源清理

#### 4. **监控面板** (`roomote-dashboard`)

- **功能**: 基于 Bull Board 的队列监控界面
- **端口**: 3002
- **访问**: `http://localhost:3002/admin/queues`

#### 5. **数据存储**

- **PostgreSQL**: 持久化作业数据、状态和结果
- **Redis**: 作业队列管理和状态缓存

## 🔧 数据模型

### CloudJobs 表结构

```sql
CREATE TABLE "cloud_jobs" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT NOT NULL,                    -- 作业类型 (如: github.issue.fix)
  "status" TEXT DEFAULT 'pending',         -- 状态: pending|processing|completed|failed
  "payload" JSONB NOT NULL,                -- 作业参数
  "result" JSONB,                          -- 执行结果
  "error" TEXT,                            -- 错误信息
  "slack_thread_ts" TEXT,                  -- Slack 线程标识
  "started_at" TIMESTAMP,                  -- 开始时间
  "completed_at" TIMESTAMP,                -- 完成时间
  "created_at" TIMESTAMP DEFAULT NOW()     -- 创建时间
);
```

### 作业类型定义

#### GitHub Issue 修复作业

```typescript
interface GitHubIssueFixPayload {
	repo: string // 仓库名称 (如: "RooCodeInc/Roo-Code")
	issue: number // Issue 编号
	title: string // Issue 标题
	body: string // Issue 描述
	labels?: string[] // 标签列表
}
```

## 🚀 部署与启动

### 环境要求

- Docker & Docker Compose
- Node.js 20+
- pnpm
- GitHub Personal Access Token

### 环境变量配置

创建 `.env` 文件：

```bash
# GitHub 访问令牌 (必需)
GH_TOKEN=ghp_xxxxxxxxxxxx

# GitHub Webhook 密钥 (用于验证 webhook 签名)
GH_WEBHOOK_SECRET=your_webhook_secret

# Slack API 令牌 (用于通知)
SLACK_API_TOKEN=xoxb-xxxxxxxxxxxxx

# OpenRouter API 密钥 (用于 AI 模型)
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxx

# 数据库连接 (默认值，可选)
DATABASE_URL=postgresql://postgres:password@db:5432/cloud_agents
REDIS_URL=redis://redis:6379
```

### 快速启动

```bash
# 1. 构建基础镜像
./scripts/build.sh base

# 2. 启动基础服务 (数据库、Redis、监控面板)
pnpm services:start

# 3. 运行数据库迁移
pnpm install
pnpm db:migrate

# 4. 构建并启动所有服务
docker compose up -d
```

### 单独构建服务

```bash
# 构建特定服务
./scripts/build.sh api        # API 服务
./scripts/build.sh controller # 控制器
./scripts/build.sh worker     # 工作节点
./scripts/build.sh dashboard  # 监控面板
```

## 📋 使用方法

### 1. 通过 API 创建作业

```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "type": "github.issue.fix",
    "payload": {
      "repo": "RooCodeInc/Roo-Code",
      "issue": 123,
      "title": "修复登录页面的样式问题",
      "body": "登录按钮在移动设备上显示不正确...",
      "labels": ["bug", "frontend"]
    }
  }'
```

### 2. 通过脚本快速创建作业

```bash
# 从真实的 GitHub Issue 创建作业
./scripts/enqueue-github-issue-job.sh 123
./scripts/enqueue-github-issue-job.sh 456 "other-org/repo"
```

### 3. 查询作业状态

```bash
curl http://localhost:3001/api/jobs/1
```

响应示例：

```json
{
	"id": 1,
	"type": "github.issue.fix",
	"status": "completed",
	"payload": {
		"repo": "RooCodeInc/Roo-Code",
		"issue": 123,
		"title": "修复登录页面的样式问题"
	},
	"result": {
		"repo": "RooCodeInc/Roo-Code",
		"issue": 123,
		"result": "PR created successfully"
	},
	"createdAt": "2024-01-15T10:30:00Z",
	"startedAt": "2024-01-15T10:30:05Z",
	"completedAt": "2024-01-15T10:45:30Z"
}
```

### 4. GitHub Webhook 集成

在 GitHub 仓库设置中配置 Webhook：

- **Payload URL**: `https://your-domain.com/api/webhooks/github`
- **Content type**: `application/json`
- **Secret**: 你的 `GH_WEBHOOK_SECRET`
- **Events**: `Issues`, `Pull requests`

当 Issue 被创建时，系统会自动创建修复作业。

## 🎯 工作流程详解

### GitHub Issue 自动修复流程

#### 📊 API请求参数结构

脚本 `enqueue-github-issue-job.sh` 发送的JSON Payload：

```json
{
	"type": "github.issue.fix",
	"payload": {
		"repo": "village-way/Roo-Code", // 仓库名称
		"issue": 123, // Issue编号
		"title": "修复登录页面的样式问题", // Issue标题
		"body": "登录按钮在移动设备上...", // Issue描述
		"labels": ["bug", "frontend"] // 标签列表（可选）
	}
}
```

#### 🤖 初始AI Prompt

当任务启动时，系统会生成以下初始Prompt给AI代理：

```text
Fix the following GitHub issue:

Repository: village-way/Roo-Code
Issue #123: 修复登录页面的样式问题

Description:
登录按钮在移动设备上显示不正确，需要优化响应式布局...

Labels: bug, frontend

Please analyze the issue, understand what needs to be fixed, and implement a solution.

When you're finished:
- Create a git branch to store your work (git checkout -b fix-123)
- Commit your changes to this branch (git commit -m "Fixes #123")
- Push your branch to the remote repository (git push --set-upstream origin fix-123)
- Submit a pull request using the "gh" command line tool (gh pr create --title "Fixes #123\n\n[Your PR description here.]" --fill)

Your job isn't done until you've created a pull request. Try to solve any git issues that arise while creating your branch and submitting your pull request.
```

#### 🔄 完整执行流程

1. **🚀 请求发送阶段**

    - **脚本执行**: `enqueue-github-issue-job.sh` 使用GitHub CLI获取Issue信息
    - **参数构建**: 将Issue数据构建为标准JSON payload
    - **API调用**: POST请求发送到 `http://localhost:3001/api/jobs`

2. **📝 任务入队阶段**

    - **请求验证**: `/api/jobs` 端点使用Zod schema验证请求格式
    - **数据库存储**: 在PostgreSQL的 `cloudJobs` 表中创建记录，状态为 `pending`
    - **队列入队**: 通过BullMQ将任务添加到Redis队列，生成唯一任务ID
    - **响应返回**: 返回 `jobId` 和 `enqueuedJobId` 给客户端

3. **⚡ Worker分配阶段**

    - **Controller监控**: Controller服务持续监控Redis队列中的新任务
    - **Worker启动**: 动态启动独立的Worker容器来处理任务
    - **任务锁定**: Worker通过BullMQ获取并锁定特定任务，防止重复处理

4. **💻 任务执行阶段**

    - **VS Code启动**: Worker启动隔离的VS Code实例（使用xvfb虚拟显示）
    - **IPC连接**: 通过Unix Socket建立与Roo Code扩展的进程间通信
    - **配置初始化**: 加载AI模型配置（OpenRouter API密钥等）
    - **Prompt发送**: 将构建好的初始Prompt发送给AI代理
    - **Slack通知**: 发送任务开始通知到指定Slack频道

5. **🧠 AI代理工作阶段**

    - **代码分析**: AI代理读取仓库代码，理解项目结构和Issue要求
    - **问题诊断**: 分析Issue描述，定位需要修复的具体问题
    - **解决方案设计**: 制定修复策略，选择合适的实现方法
    - **代码实现**: 编写、修改代码文件来解决问题
    - **测试验证**: 运行相关测试确保修复有效且不引入新问题

6. **🔧 Git操作阶段**

    - **分支创建**: `git checkout -b fix-{issue-number}`
    - **更改提交**: `git commit -m "Fixes #{issue-number}"`
    - **代码推送**: `git push --set-upstream origin fix-{issue-number}`
    - **PR创建**: 使用GitHub CLI创建Pull Request并关联原Issue

7. **✅ 任务完成阶段**
    - **状态更新**: 将数据库中的任务状态更新为 `completed`
    - **结果存储**: 保存任务执行结果和相关元数据
    - **成功通知**: Slack通知任务完成状态和PR链接
    - **资源清理**: 自动清理Worker容器、临时文件和网络资源

#### 📈 监控与状态追踪

任务在整个生命周期中的状态变化：

- `pending` → 任务已创建，等待Worker处理
- `processing` → Worker已接收，AI代理正在工作
- `completed` → 任务成功完成，PR已创建
- `failed` → 任务执行失败，包含错误信息

可通过以下方式监控任务状态：

```bash
# 查询特定任务状态
curl http://localhost:3001/api/jobs/{jobId}

# 监控队列状态
访问 http://localhost:3002/admin/queues

# 查看实时日志
docker compose logs -f worker
```

## 🔍 监控与调试

### 监控面板

访问 `http://localhost:3002/admin/queues` 查看：

- 队列状态和统计信息
- 活跃、等待、完成的作业
- 作业执行详情和日志
- 失败作业的错误信息

### 日志查看

```bash
# 查看所有服务日志
docker compose logs -f

# 查看特定服务日志
docker compose logs -f api
docker compose logs -f controller
docker compose logs -f worker

# 查看 Worker 日志文件
ls /tmp/roomote/
tail -f /tmp/roomote/worker.log
```

### 健康检查

```bash
curl http://localhost:3001/api/health
```

响应示例：

```json
{
	"status": "ok",
	"services": {
		"database": true,
		"redis": true
	}
}
```

## 🛠️ 开发指南

### 本地开发环境

```bash
# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 类型检查
pnpm check-types

# 代码格式化
pnpm lint
```

### 添加新的作业类型

1. **定义类型** (`src/types/index.ts`):

```typescript
export interface JobTypes {
	"github.issue.fix": {
		/* ... */
	}
	"new.job.type": {
		// 新作业类型的参数定义
		param1: string
		param2: number
	}
}
```

2. **创建处理器** (`src/lib/jobs/newJobType.ts`):

```typescript
export async function handleNewJobType(payload: JobPayload<"new.job.type">, callbacks?: RunTaskCallbacks) {
	// 实现作业处理逻辑
}
```

3. **注册处理器** (`src/lib/job.ts`):

```typescript
switch (type) {
	case "github.issue.fix":
		result = await fixGitHubIssue(payload, callbacks)
		break
	case "new.job.type":
		result = await handleNewJobType(payload, callbacks)
		break
}
```

### 自定义 Worker 镜像

修改 `Dockerfile.worker` 来添加额外的工具或配置：

```dockerfile
# 安装额外的开发工具
RUN apt update && apt install -y \
  python3 \
  python3-pip \
  && rm -rf /var/lib/apt/lists/*

# 安装 VS Code 扩展
RUN code --no-sandbox --user-data-dir /roo/.vscode \
  --install-extension ms-python.python
```

## 🔒 安全考虑

### 访问控制

- GitHub Token 需要适当的仓库权限
- Webhook 签名验证防止恶意请求
- 容器间网络隔离

### 资源限制

- Worker 容器 30 分钟超时
- 最大 5 个并发 Worker
- 自动资源清理机制

### 敏感信息保护

- 环境变量存储敏感配置
- 不在日志中记录令牌信息
- 使用 Docker secrets 进行生产部署

## 🚨 故障排除

### 常见问题

#### Worker 无法启动

```bash
# 检查 Docker 状态
docker ps -a | grep roomote

# 检查环境变量
echo $GH_TOKEN

# 检查网络连接
docker network ls | grep roomote
```

#### 数据库连接失败

```bash
# 检查数据库状态
docker compose ps db

# 测试数据库连接
docker compose exec db psql -U postgres -d cloud_agents -c "SELECT 1;"
```

#### Redis 连接问题

```bash
# 检查 Redis 状态
docker compose ps redis

# 测试 Redis 连接
docker compose exec redis redis-cli ping
```

### 性能优化

#### 队列性能

- 调整 `POLL_INTERVAL_MS` 以优化响应速度
- 增加 `MAX_WORKERS` 处理更多并发任务
- 配置 Redis 持久化策略

#### 容器优化

- 使用多阶段构建减少镜像大小
- 配置健康检查和重启策略
- 优化资源限制设置

## 📚 相关文档

- [BullMQ 官方文档](https://docs.bullmq.io/)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [GitHub API 文档](https://docs.github.com/en/rest)
- [Slack API 文档](https://api.slack.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

## 🤝 贡献指南

1. Fork 仓库
2. 创建功能分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -m 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。详见 [LICENSE](../../LICENSE) 文件。
