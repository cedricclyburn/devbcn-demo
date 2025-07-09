# Soccer Vote App

A simple real-time voting application for Barcelona vs Real Madrid built with React and FastAPI.

## Features

- Real-time voting between Barcelona and Real Madrid
- Live score updates via WebSocket
- Text-to-speech narration with English and Spanish slang
- Background music toggle
- Simple in-memory vote storage
- Multi-architecture container support

## Quick Start

### Using Docker

```bash
# Build the multi-arch image
docker build -t soccer-vote-app .

# Run the container
docker run -p 8000:8000 soccer-vote-app
```

### Using Podman

```bash
# Build the multi-arch image
podman build -t soccer-vote-app .

# Run the container
podman run -p 8000:8000 soccer-vote-app
```

### Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /votes` - Get current vote counts
- `POST /vote` - Cast a vote (body: `{"team": "barcelona"}` or `{"team": "real_madrid"}`)
- `GET /reset` - Reset all votes to zero
- `GET /ws` - WebSocket endpoint for real-time updates

## Architecture

- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI with WebSocket support
- **Storage**: In-memory Python dictionary
- **Container**: Multi-architecture Docker image

## Deployment

The app includes Kubernetes deployment manifests in the `k8s/` directory for various environments.
