export interface VoteData {
  votes: {
    barcelona: number;
    real_madrid: number;
  };
}

export interface WebSocketMessage {
  type: 'vote_update';
  votes: {
    barcelona: number;
    real_madrid: number;
  };
}

export type Team = 'barcelona' | 'real_madrid';

export interface TeamInfo {
  id: Team;
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  jerseyImage: string;
  gradientClass: string;
} 