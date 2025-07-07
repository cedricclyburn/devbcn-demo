# ⚽ El Clásico Vote App

A modern, real-time voting web application featuring FC Barcelona vs Real Madrid in a stunning split-screen interface. Vote for your favorite team and watch the jerseys fly off the screen with beautiful animations!

## ✨ Features

- **Split-Screen Design**: Authentic team colors and branding for both FC Barcelona and Real Madrid
- **Real-time Voting**: Live vote counts updated instantly across all connected clients
- **Animated Jerseys**: Beautiful fly-off animations when voting
- **WebSocket Integration**: Real-time updates without page refresh
- **Modern Tech Stack**: FastAPI backend + React frontend + TailwindCSS
- **Multiple Deployment Options**: Container, local deployment, or development mode

## 🚀 Quick Start

### Option 2: Development Mode
```bash
# Start development server
./run-local.sh
```

### Option 1: Container
```bash
# Build and run with Docker/Podman
docker build -t soccer-vote-app .
docker run -p 8000:8000 soccer-vote-app
# OR
podman build -t soccer-vote-app .
podman run -p 8000:8000 soccer-vote-app
```

## 🏗️ Project Structure

```
devbcn-demo/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application file
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main React component
│   │   └── main.tsx       # Entry point
│   ├── package.json       # Node.js dependencies
│   └── vite.config.ts     # Vite configuration
├── static/                 # Static assets
│   └── assets/            # Team jerseys and images
├── deploy/                 # Local deployment package
├── Containerfile          # Multi-stage container build
├── run-local.sh          # Development startup script
├── deploy-local.sh       # Deployment package creator
└── README.md             # This file
```

## 🔧 API Endpoints

- `GET /` - Serve the React application
- `GET /votes` - Get current vote counts
- `POST /vote` - Cast a vote (body: `{"team": "barcelona|real_madrid"}`)
- `GET /reset` - Reset vote counts to zero
- `WebSocket /ws` - Real-time vote updates

## 🌐 WebSocket Events

The app uses WebSocket for real-time updates:

```json
{
  "type": "vote_update",
  "votes": {
    "barcelona": 42,
    "real_madrid": 38
  }
}
```

## 🛠️ Development

### Frontend Development
- Built with **React 18** and **TypeScript**
- Styled with **TailwindCSS** for modern UI
- **Vite** for fast development and building
- **Framer Motion** for smooth animations

### Backend Development
- **FastAPI** for high-performance REST API
- **WebSocket** support for real-time features
- **Pydantic** for data validation
- **uvicorn** ASGI server

## 🔄 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |

## 📝 License

This project is open source and available under the [MIT License](LICENSE).