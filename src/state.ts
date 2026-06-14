export type Theme = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';
export type Player = 'blue' | 'orange';
export type BoardSize = 16 | 24 | 36;

export interface AppState {
  selectedTheme: Theme;
  startPlayer: Player;
  boardSize: BoardSize;
}

export const state: AppState = {
  selectedTheme: 'code-vibes',
  startPlayer: 'blue',
  boardSize: 16,
};
