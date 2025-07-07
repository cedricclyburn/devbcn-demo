#!/bin/bash

# Build script for x86_64 production deployment (simple approach)
echo "Building Soccer Vote App for x86_64 (simple approach)..."

# Step 1: Build frontend locally to avoid cross-compilation issues
echo "Building frontend locally..."
cd frontend
npm run build
cd ..

# Step 2: Build container using the Containerfile
echo "Building container..."
podman build -f Containerfile.x86 -t soccer-vote-app:x86 .

echo "Build complete! Run with:"
echo "podman run -p 8000:8000 soccer-vote-app:x86"

echo ""
echo "For OpenShift deployment, tag and push to your registry:"
echo "podman tag soccer-vote-app:x86 your-registry/soccer-vote-app:latest"
echo "podman push your-registry/soccer-vote-app:latest" 