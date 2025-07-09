interface NarrationToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const NarrationToggle = ({ isEnabled, onToggle }: NarrationToggleProps) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-white text-sm font-medium">Narration</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent ${
          isEnabled ? 'bg-green-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-400' : 'bg-gray-400'}`}></div>
        <span className="text-white text-xs opacity-75">
          {isEnabled ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  );
}; 