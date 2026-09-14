#!/usr/bin/env bash
set -euo pipefail

commit_sha="${1:?commit SHA is required}"
registry="ccr.ccs.tencentyun.com"
namespace="rgaa-aini"
api_image="$registry/$namespace/rgaa-aini-api:sha-$commit_sha"
web_image="$registry/$namespace/rgaa-aini-web:sha-$commit_sha"
package_file="/opt/aini/packages/$commit_sha.tar.gz"
release_dir="/opt/aini/releases/$commit_sha"

test -f "$package_file"
mkdir -p "$release_dir"
tar -xzf "$package_file" -C "$release_dir"
cd "$release_dir"

docker build --pull=false --file deploy/Dockerfile.api --tag "$api_image" .
docker build --pull=false --file deploy/Dockerfile.web --tag "$web_image" .
docker push "$api_image"
docker push "$web_image"

printf 'API_IMAGE=%s\nWEB_IMAGE=%s\n' "$api_image" "$web_image" > /opt/aini/.env.production
cp deploy/docker-compose.prod.yml /opt/aini/docker-compose.prod.yml
cd /opt/aini
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --remove-orphans

for attempt in {1..12}; do
  if curl --fail --silent --show-error http://127.0.0.1:18080/health \
    && curl --fail --silent --show-error http://127.0.0.1:18081/api/health; then
    exit 0
  fi
  sleep 5
done

docker compose --env-file .env.production -f docker-compose.prod.yml logs --tail=100
exit 1
