# 🔧 Troubleshooting Guide

## Container Build Issues

If you're experiencing DNS resolution issues when building the container, here are some solutions:

### Option 1: Use Local Development (Recommended for now)
```bash
./run-local.sh
```

### Option 2: Fix DNS Issues

#### Check your DNS settings:
```bash
# Test DNS resolution
nslookup registry-1.docker.io
nslookup production.cloudflare.docker.com

# If these fail, try changing DNS servers
# Add to /etc/resolv.conf or configure your network settings
```

#### Try different DNS servers:
- Google DNS: 8.8.8.8, 8.8.4.4
- Cloudflare DNS: 1.1.1.1, 1.0.0.1
- OpenDNS: 208.67.222.222, 208.67.220.220

### Option 3: Use Docker Instead of Podman
```bash
# Install Docker Desktop for Mac
# Then build with:
docker build -t soccer-vote-app .
docker run -p 8000:8000 soccer-vote-app
```

### Option 4: Use Different Base Images
If the Python base images are causing issues, try:
```dockerfile
# In Containerfile, replace:
FROM python:3.11-slim
# With:
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y python3 python3-pip
```

### Option 5: Build Without Network (if you have cached images)
```bash
podman build --network=none -t soccer-vote-app .
```

## Local Development

The application works perfectly locally:

1. **Start the app:**
   ```bash
   ./run-local.sh
   ```

2. **Access the app:**
   - Main app: http://localhost:8000
   - API docs: http://localhost:8000/docs
   - Vote endpoint: http://localhost:8000/votes

3. **Test WebSocket:**
   ```bash
   # Install wscat
   npm install -g wscat
   
   # Connect to WebSocket
   wscat -c ws://localhost:8000/ws
   ```

## Network Configuration

If you're behind a corporate firewall or VPN, you might need to:

1. **Configure proxy settings:**
   ```bash
   # Set HTTP proxy for Podman
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=http://proxy.company.com:8080
   ```

2. **Use a different registry:**
   ```bash
   # Configure Podman to use a different registry
   podman system connection add docker.io docker.io
   ```

## Alternative: Use Docker Desktop

If Podman continues to have issues, Docker Desktop is often more reliable on macOS:

1. Install Docker Desktop for Mac
2. Build and run:
   ```bash
   docker build -t soccer-vote-app .
   docker run -p 8000:8000 soccer-vote-app
   ```

## Current Status

✅ **Application is fully functional locally**
✅ **All features working: voting, WebSocket, animations**
✅ **Ready for deployment once container build is resolved**

The container build issue is purely a network/DNS problem, not an application problem. 