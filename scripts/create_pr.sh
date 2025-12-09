#!/usr/bin/env bash
# Script to create a GitHub Pull Request for release/v1.0 -> main using the REST API.
# Usage:
#   export GITHUB_TOKEN="your_token_here"
#   ./scripts/create_pr.sh
# The script reads PR body from `PR-body.md` in the repo root.

set -euo pipefail

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "ERROR: set GITHUB_TOKEN environment variable with a Personal Access Token (scope: repo)"
  exit 1
fi

REPO_OWNER="chipsentinel"
REPO_NAME="ClubGest"
HEAD_BRANCH="release/v1.0"
BASE_BRANCH="main"
TITLE="Release v1.0"
BODY_FILE="PR-body.md"

if [ ! -f "$BODY_FILE" ]; then
  echo "ERROR: $BODY_FILE not found. Make sure you're running this from the repository root."
  exit 1
fi

BODY_JSON=$(python3 - <<PY
import json
print(json.dumps(open('$BODY_FILE','r',encoding='utf-8').read()))
PY
)

API_URL="https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/pulls"

echo "Creating pull request $HEAD_BRANCH -> $BASE_BRANCH on $REPO_OWNER/$REPO_NAME..."

response=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "$API_URL" \
  -d "{\"title\":\"$TITLE\",\"head\":\"$HEAD_BRANCH\",\"base\":\"$BASE_BRANCH\",\"body\":$BODY_JSON}")

echo "$response" | python3 -m json.tool

echo "Done. If the PR was created successfully, check the output for the 'html_url' field."
