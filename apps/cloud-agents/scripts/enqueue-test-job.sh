#!/bin/bash

BASE_URL="http://localhost:3001"
JOBS_ENDPOINT="$BASE_URL/api/jobs"

curl -X POST "$JOBS_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "github.issue.fix",
    "payload": {
      "repo": "RooCodeInc/Roo-Code",
      "issue": 123,
      "title": "Fix authentication bug in login flow",
      "body": "Users are experiencing issues logging in with OAuth providers. The token refresh mechanism seems to be failing intermittently, causing users to be logged out unexpectedly.\n\nSteps to reproduce:\n1. Login with GitHub OAuth\n2. Wait for token to expire\n3. Try to make an authenticated request\n4. User gets logged out instead of token being refreshed",
      "labels": ["bug", "authentication", "oauth"]
    }
  }' \
  -w "\nStatus: %{http_code}\n\n"
