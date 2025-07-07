#!/bin/bash

# Build script for Mac/ARM64 deployment
echo "Building Soccer Vote App for Mac/ARM64..."

# Step 1: Build frontend locally
echo "Building frontend locally..."
cd frontend
npm run build
cd ..

# Step 2: Build container using the Mac-optimized Containerfile
echo "Building container for ARM64..."
podman build -f Containerfile -t quay.io/cclyburn/devbcn-demo:latest .

echo "Build complete! Run with:"
echo "podman run -p 8000:8000 quay.io/cclyburn/devbcn-demo:latest"

echo ""
echo "For deployment, push to your registry:"
echo "podman push quay.io/cclyburn/devbcn-demo:latest"

echo ""
echo "Note: This build is optimized for Mac/ARM64 architecture and tagged for quay.io/cclyburn/devbcn-demo:latest" 

podman run -p 8000:8000 quay.io/cclyburn/devbcn-demo:latest