#!/bin/bash

echo "⚽ Starting El Clásico Vote App..."

# Check if frontend is built
if [ ! -d "frontend/dist" ]; then
    echo "📦 Building frontend..."
    cd frontend
    npm install
    npm run build
    cd ..
fi

# Check if backend dependencies are installed
if [ ! -d "backend/__pycache__" ]; then
    echo "🐍 Installing backend dependencies..."
    cd backend
    pip install -r requirements.txt
    cd ..
fi

echo "🚀 Starting server..."
echo "📱 Open your browser to: http://localhost:8000"
echo "🔌 API docs available at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"

cd backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload 