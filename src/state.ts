/** Available game themes. */
export type Theme = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';

/** The two player colours. */
export type Player = 'blue' | 'orange';

/** Supported board sizes (number of cards). */
export type BoardSize = 16 | 24 | 36;

/** Data for a single card on the board. */
export interface CardData {
  pairId: number;
  motifSrc: string;
}

/** Global application state shared across all modules. */
export interface AppState {
  selectedTheme: Theme;
  startPlayer: Player | null;
  boardSize: BoardSize | null;
  currentPlayer: Player;
  scores: { blue: number; orange: number };
}

/** Singleton state object mutated in place throughout the session. */
export const state: AppState = {
  selectedTheme: 'code-vibes',
  startPlayer: null,
  boardSize: null,
  currentPlayer: 'blue',
  scores: { blue: 0, orange: 0 },
};
