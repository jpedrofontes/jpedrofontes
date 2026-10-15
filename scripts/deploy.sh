#!/usr/bin/env bash
set -euo pipefail

TAG="${1:?usage: deploy.sh vX.Y.Z}"
[[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "A stable vX.Y.Z tag is required" >&2; exit 1; }

REPO="$(cd "$(dirname "$0")/.." && pwd)"
RUNTIME="${JPEDROFONTES_RUNTIME_DIR:-/home/admin/docker/jpedrofontes/internal/production}"
IMAGE_REPO="${JPEDROFONTES_IMAGE_REPO:-jpedrofontes}"
cd "$REPO"
mkdir -p "$RUNTIME"
exec 9>"$RUNTIME/deploy.lock"
flock -n 9 || { echo "Another production deployment is running" >&2; exit 1; }

REVISION="$(git rev-parse --verify "refs/tags/$TAG^{commit}")"
BUILD_DIR="$(mktemp -d /tmp/jpedrofontes-release.XXXXXX)"
trap 'rm -rf "$BUILD_DIR"' EXIT
git archive "refs/tags/$TAG" | tar -x -C "$BUILD_DIR"
export JPEDROFONTES_IMAGE="$IMAGE_REPO:$TAG"

docker build --label "org.opencontainers.image.revision=$REVISION" \
  --label "org.opencontainers.image.version=$TAG" \
  -t "$JPEDROFONTES_IMAGE" "$BUILD_DIR"

if [[ "${JPEDROFONTES_BUILD_ONLY:-0}" == "1" ]]; then
  echo "Built $TAG ($REVISION); production was not changed"
  exit 0
fi

PREVIOUS_IMAGE="$(docker inspect jpedrofontes --format '{{.Image}}' 2>/dev/null || true)"
if [[ -n "$PREVIOUS_IMAGE" ]]; then
  docker tag "$PREVIOUS_IMAGE" "$IMAGE_REPO:rollback"
fi
COMPOSE=(docker compose --project-name jpedrofontes -f "$BUILD_DIR/scripts/compose.production.yml")
if ! "${COMPOSE[@]}" up -d --no-build --pull never --wait --wait-timeout 120 jpedrofontes || \
   ! curl --fail --silent --show-error --max-time 15 http://127.0.0.1:10006/ >/dev/null; then
  if [[ -n "$PREVIOUS_IMAGE" ]]; then
    export JPEDROFONTES_IMAGE="$IMAGE_REPO:rollback"
    "${COMPOSE[@]}" up -d --no-build --pull never --wait --wait-timeout 120 jpedrofontes
    echo "Deployment failed; previous image restored" >&2
  else
    echo "Deployment failed; no previous image is available" >&2
  fi
  exit 1
fi

docker tag "$JPEDROFONTES_IMAGE" "$IMAGE_REPO:latest"
echo "Deployed $TAG ($REVISION)"