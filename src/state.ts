export type Theme = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';
export type Player = 'blue' | 'orange';
export type BoardSize = 16 | 24 | 36;

export interface CardData {
  pairId: number;
  motifSrc: string;
}

export interface AppState {
  selectedTheme: Theme;
  startPlayer: Player;
  boardSize: BoardSize;
  currentPlayer: Player;
  scores: { blue: number; orange: number };
}

export const state: AppState = {
  selectedTheme: 'code-vibes',
  startPlayer: 'blue',
  boardSize: 16,
  currentPlayer: 'blue',
  scores: { blue: 0, orange: 0 },
};
