import { useState, useEffect, useRef } from 'react';
import { VoteData } from '../types';

interface NarrationProps {
  voteData: VoteData;
  isEnabled: boolean;
}

// Get OpenAI API endpoint from environment variable or use default
const getOpenAIEndpoint = () => {
  return import.meta.env.VITE_OPENAI_API_URL || 'http://localhost:8008/v1/chat/completions';
};

const generateOpenAINarration = async (barcelonaVotes: number, realMadridVotes: number): Promise<string> => {
  try {
    const response = await fetch(getOpenAIEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a lively sports commentator for a Barcelona vs Real Madrid voting app. ALWAYS respond in ENGLISH as the primary language. You can include 1-2 Spanish slang phrases for flavor, but the main narration must be in English. Keep it under 100 words and make it fun and engaging. Example: "Barça is leading 15-8! ¡Qué pasada! The Blaugrana are dominating with 65% of the votes!"'
          },
          {
            role: 'user',
            content: `Generate a lively narration in ENGLISH for the current score: Barcelona ${barcelonaVotes} - Real Madrid ${realMadridVotes}. You can include 1-2 Spanish slang phrases, but the main text must be in English.`
          }
        ],
        max_tokens: 150,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate narration at this time.';
  } catch (error) {
    console.warn('OpenAI API not available:', error);
    throw error;
  }
};

export const Narration = ({ voteData, isEnabled }: NarrationProps) => {
  const [narrationText, setNarrationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const lastUpdateRef = useRef<number>(0);
  const updateInterval = 15000; // 15 seconds

  useEffect(() => {
    if (isEnabled) {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateRef.current;
      
      // Only update narration every 15 seconds
      if (timeSinceLastUpdate >= updateInterval) {
        const generateNarration = async () => {
          setIsLoading(true);
          try {
            const text = await generateOpenAINarration(voteData.votes.barcelona, voteData.votes.real_madrid);
            setNarrationText(text);
            lastUpdateRef.current = now;
          } catch (error) {
            console.error('Error generating narration:', error);
            setNarrationText('Unable to generate narration at this time.');
          } finally {
            setIsLoading(false);
          }
        };

        generateNarration();
      }
    } else {
      setIsLoading(false);
    }
  }, [voteData, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-center px-8 py-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'
            }`}></div>
            <p className="text-white text-lg font-medium">
              {isLoading ? 'Generating narration...' : narrationText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 