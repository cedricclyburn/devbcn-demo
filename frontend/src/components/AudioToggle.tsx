import { useRef } from 'react';

interface AudioToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const AudioToggle = ({ isEnabled, onToggle }: AudioToggleProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggle = () => {
    if (isEnabled) {
      // Stop audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      // Start audio
      if (!audioRef.current) {
        audioRef.current = new Audio('/static/assets/noise.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
      }
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    onToggle();
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-white text-sm font-medium">Audio</span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent ${
          isEnabled ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
        <span className="text-white text-xs opacity-75">
          {isEnabled ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  );
}; 