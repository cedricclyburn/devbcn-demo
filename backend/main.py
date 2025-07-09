from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import asyncio
from typing import List, Dict, Any

app = FastAPI(title="Soccer Vote App", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory storage
votes: Dict[str, int] = {
    "barcelona": 0,
    "real_madrid": 0
}

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        # Send current vote counts to the new connection
        await websocket.send_text(json.dumps({
            "type": "vote_update",
            "votes": votes
        }))

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Remove broken connections
                self.active_connections.remove(connection)

manager = ConnectionManager()

class Vote(BaseModel):
    team: str

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Keep connection alive
            await asyncio.sleep(0.1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.post("/vote")
async def cast_vote(vote: Vote):
    if vote.team not in ["barcelona", "real_madrid"]:
        raise HTTPException(status_code=400, detail="Invalid team")
    
    votes[vote.team] += 1
    
    # Broadcast vote update to all connected clients
    await manager.broadcast(json.dumps({
        "type": "vote_update",
        "votes": votes
    }))
    
    return {"message": f"Vote cast for {vote.team}", "votes": votes}

@app.get("/votes")
async def get_votes():
    return {"votes": votes}

@app.get("/reset")
async def reset_votes():
    votes["barcelona"] = 0
    votes["real_madrid"] = 0
    
    # Broadcast reset to all connected clients
    await manager.broadcast(json.dumps({
        "type": "vote_update",
        "votes": votes
    }))
    
    return {"message": "Votes reset", "votes": votes}

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the React app and assets
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="app")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 