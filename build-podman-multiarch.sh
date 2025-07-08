#!/bin/bash
set -e

IMAGE_NAME="quay.io/cclyburn/devbcn-demo:latest"
AMD64_TAG="quay.io/cclyburn/devbcn-demo:amd64"
ARM64_TAG="quay.io/cclyburn/devbcn-demo:arm64"

echo "Cleaning up any existing images, manifests, and containers..."

# Remove any existing manifest with this name
podman manifest rm $IMAGE_NAME 2>/dev/null || true

# Remove any existing image with this name
podman rmi $IMAGE_NAME 2>/dev/null || true
podman rmi $AMD64_TAG 2>/dev/null || true
podman rmi $ARM64_TAG 2>/dev/null || true

# Stop and remove any containers using this image
podman ps -a --filter ancestor=$IMAGE_NAME --format "{{.ID}}" | xargs -r podman stop 2>/dev/null || true
podman ps -a --filter ancestor=$IMAGE_NAME --format "{{.ID}}" | xargs -r podman rm 2>/dev/null || true

echo "Building frontend locally to avoid esbuild issues..."
cd frontend
npm ci --no-audit --no-fund
npm run build
cd ..

echo "Building for linux/amd64..."
podman build --platform linux/amd64 -t $AMD64_TAG .

echo "Building for linux/arm64..."
podman build --platform linux/arm64 -t $ARM64_TAG .

echo "Creating manifest: $IMAGE_NAME"
podman manifest create $IMAGE_NAME

echo "Adding amd64 image to manifest..."
podman manifest add $IMAGE_NAME $AMD64_TAG

echo "Adding arm64 image to manifest..."
podman manifest add $IMAGE_NAME $ARM64_TAG

echo "Pushing manifest to registry: $IMAGE_NAME"
podman manifest push $IMAGE_NAME docker://$IMAGE_NAME

echo "Multi-arch build and push complete: $IMAGE_NAME" 