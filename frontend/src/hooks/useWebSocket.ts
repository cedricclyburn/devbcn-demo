import { useState, useEffect, useCallback } from 'react';
import { VoteData, WebSocketMessage } from '../types';

export const useWebSocket = (_url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [voteData, setVoteData] = useState<VoteData>({
    votes: { barcelona: 0, real_madrid: 0 }
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectWebSocket = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const wsUrl = `${protocol}//${host}/ws`;
      
      const websocket = new WebSocket(wsUrl);

      websocket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      websocket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          if (message.type === 'vote_update') {
            setVoteData({ votes: message.votes });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        // Reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      setWs(websocket);
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendVote = useCallback(async (team: string) => {
    try {
      const response = await fetch('/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team }),
      });

      if (!response.ok) {
        throw new Error('Failed to send vote');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending vote:', error);
      throw error;
    }
  }, []);

  return {
    voteData,
    isConnected,
    sendVote,
  };
}; 