import React from 'react';
import { TeamInfo } from '../types';

interface TeamSideProps {
  team: TeamInfo;
  votes: number;
  totalVotes: number;
  onVote: (team: string) => void;
  isAnimating: boolean;
}

export const TeamSide: React.FC<TeamSideProps> = ({
  team,
  votes,
  totalVotes,
  onVote,
  isAnimating
}) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  
  const handleClick = () => {
    if (!isAnimating) {
      onVote(team.id);
    }
  };

  return (
    <div 
      className={`flex-1 team-side ${team.gradientClass} relative cursor-pointer`}
      onClick={handleClick}
    >
      {/* Stadium lights effect */}
      <div className="stadium-lights"></div>
      
      {/* Team name with percentage and tally badge */}
      <div
        className="team-name left-1/2 -translate-x-1/2 text-5xl lg:text-7xl flex items-center gap-4"
        style={{ bottom: '20%' }}
      >
        {team.displayName}
        <span className="inline-flex items-center bg-white/30 text-white font-bold text-lg rounded-full px-4 py-2 shadow-lg ml-2">
          {votes} <span className="ml-2 text-base font-normal">({percentage}%)</span>
        </span>
      </div>

      {/* Jersey container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`jersey-container ${isAnimating ? (team.id === 'barcelona' ? 'animate-fly-out-left' : 'animate-fly-out-right') : ''}`}>
          <img 
            src={team.jerseyImage}
            alt={`${team.displayName} Jersey`}
            className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
            onError={(e) => {
              // Fallback to a colored placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'w-64 h-64 lg:w-80 lg:h-80 rounded-lg flex items-center justify-center text-white font-bold text-2xl';
              placeholder.style.backgroundColor = team.colors.primary;
              placeholder.textContent = team.displayName;
              target.parentNode?.insertBefore(placeholder, target);
            }}
          />
        </div>
      </div>



      {/* Voting animation overlay */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/20 flex items-center justify-center z-20">
          <div className="text-white text-4xl font-black animate-bounce-in">
            +1 VOTE!
          </div>
        </div>
      )}
    </div>
  );
}; 