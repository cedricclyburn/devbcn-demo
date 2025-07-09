import { useState } from 'react';
import { TeamSide } from './components/TeamSide';
import { Narration } from './components/Narration';
import { NarrationToggle } from './components/NarrationToggle';
import { AudioToggle } from './components/AudioToggle';
import { useWebSocket } from './hooks/useWebSocket';
import { TeamInfo } from './types';

const teams: TeamInfo[] = [
  {
    id: 'barcelona',
    name: 'barcelona',
    displayName: 'BARÇA',
    colors: {
      primary: '#A50E2C',
      secondary: '#004D98',
      accent: '#FFED02'
    },
    jerseyImage: '/static/assets/barcelona-jersey.svg',
    gradientClass: 'barcelona-gradient'
  },
  {
    id: 'real_madrid',
    name: 'real_madrid',
    displayName: 'REAL MADRID',
    colors: {
      primary: '#FEBE10',
      secondary: '#00529F',
      accent: '#FFFFFF'
    },
    jerseyImage: '/static/assets/real-madrid-jersey.svg',
    gradientClass: 'real-gradient'
  }
];

function App() {
  const { voteData, isConnected, sendVote } = useWebSocket('/ws');
  const [animatingTeam, setAnimatingTeam] = useState<string | null>(null);
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleVote = async (team: string) => {
    if (animatingTeam) return;
    
    try {
      setAnimatingTeam(team);
      await sendVote(team);
      
      setTimeout(() => {
        setAnimatingTeam(null);
      }, 1000);
    } catch (error) {
      console.error('Error voting:', error);
      setAnimatingTeam(null);
    }
  };

  const totalVotes = voteData.votes.barcelona + voteData.votes.real_madrid;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-sm">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="text-white">
            <h1 className="text-3xl font-black tracking-tight">EL CLÁSICO</h1>
            <p className="text-sm opacity-75">Choose your side</p>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">{isConnected ? 'LIVE' : 'DISCONNECTED'}</span>
            </div>
            <div className="text-sm">
              Total Votes: <span className="font-bold">{totalVotes}</span>
            </div>
            <NarrationToggle 
              isEnabled={narrationEnabled} 
              onToggle={() => setNarrationEnabled(!narrationEnabled)} 
            />
            <AudioToggle 
              isEnabled={audioEnabled} 
              onToggle={() => setAudioEnabled(!audioEnabled)} 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <TeamSide
          team={teams[0]}
          votes={voteData.votes.barcelona}
          totalVotes={totalVotes}
          onVote={handleVote}
          isAnimating={animatingTeam === 'barcelona'}
        />

        <div className="w-1 bg-white/20 shadow-2xl z-10"></div>

        <TeamSide
          team={teams[1]}
          votes={voteData.votes.real_madrid}
          totalVotes={totalVotes}
          onVote={handleVote}
          isAnimating={animatingTeam === 'real_madrid'}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-sm">
        <div className="flex justify-center items-center px-8 py-4">
          <p className="text-white text-sm opacity-75">
            Click on your favorite team to vote • Real-time results
          </p>
        </div>
      </div>
      
      <Narration voteData={voteData} isEnabled={narrationEnabled} />
    </div>
  );
}

export default App;