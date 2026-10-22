#!/usr/bin/env bash
set -euo pipefail

TAG="${1:?usage: deploy.sh vX.Y.Z}"
[[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "A stable vX.Y.Z tag is required" >&2; exit 1; }

# The runner user has no Docker access. Build and deploy run in a root-owned wrapper
# on the server (/usr/local/sbin/deploy-jpedrofontes) that only accepts a release tag.
# It deploys /etc/gh-deploy/jpedrofontes.compose.yml, a copy of scripts/compose.production.yml
# that must be updated on the server whenever this file changes.
exec sudo -n /usr/local/sbin/deploy-jpedrofontes "$TAG"
