#!/bin/bash

echo "🚀 Creating local deployment package..."

# Create deployment directory
mkdir -p deploy
rm -rf deploy/*

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Copy frontend build
echo "📁 Copying frontend build..."
cp -r frontend/dist deploy/

# Copy backend
echo "🐍 Copying backend..."
cp -r backend deploy/

# Copy static assets
echo "🎨 Copying static assets..."
cp -r static deploy/

# Copy requirements
echo "📋 Copying requirements..."
cp backend/requirements.txt deploy/

# Create startup script
echo "⚙️ Creating startup script..."
cat > deploy/start.sh << 'EOF'
#!/bin/bash
echo "⚽ Starting El Clásico Vote App..."
echo "📱 Open your browser to: http://localhost:8000"
echo "🔌 API docs available at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"

cd backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
EOF

chmod +x deploy/start.sh

# Create README for deployment
echo "📖 Creating deployment README..."
cat > deploy/README.md << 'EOF'
# El Clásico Vote App - Local Deployment

## Quick Start

1. **Install Python dependencies:**
   ```bash
   pip3 install -r requirements.txt
   ```

2. **Start the application:**
   ```bash
   ./start.sh
   ```

3. **Open your browser:**
   - Main app: http://localhost:8000
   - API docs: http://localhost:8000/docs

## Features

- ⚽ Split-screen voting interface
- 🔄 Real-time WebSocket updates
- 🎨 Animated jersey effects
- 📊 Live vote counters
- 🎯 Team-themed design

## API Endpoints

- `GET /` - Main application
- `GET /votes` - Get vote counts
- `POST /vote` - Cast a vote
- `GET /reset` - Reset votes
- `WebSocket /ws` - Real-time updates

## Troubleshooting

If you get import errors, make sure you have Python 3.8+ installed:
```bash
python3 --version
```

For WebSocket testing:
```bash
npm install -g wscat
wscat -c ws://localhost:8000/ws
```
EOF

echo "✅ Deployment package created in 'deploy/' directory"
echo ""
echo "To deploy:"
echo "1. cd deploy"
echo "2. pip3 install -r requirements.txt"
echo "3. ./start.sh" 