#!/bin/bash
set -e

IMAGE_NAME="quay.io/cclyburn/devbcn-demo:latest"

echo "Cleaning up any existing images and containers..."

# Remove any existing image with this name
podman rmi $IMAGE_NAME 2>/dev/null || true

# Stop and remove any containers using this image
podman ps -a --filter ancestor=$IMAGE_NAME --format "{{.ID}}" | xargs -r podman stop 2>/dev/null || true
podman ps -a --filter ancestor=$IMAGE_NAME --format "{{.ID}}" | xargs -r podman rm 2>/dev/null || true

echo "Building frontend locally to avoid esbuild issues..."
cd frontend
npm ci --no-audit --no-fund
npm run build
cd ..

echo "Building for linux/amd64..."
podman build --platform linux/amd64 -t $IMAGE_NAME .

echo "Pushing image to registry: $IMAGE_NAME"
podman push $IMAGE_NAME

echo "Build and push complete: $IMAGE_NAME" 