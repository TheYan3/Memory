import { state, type CardData } from './state';
import { THEME_ASSETS } from './assets';
import { gameScreen } from './template';

const FLIP_BACK_DELAY_MS = 800;

let flipped: HTMLButtonElement[] = [];
let locked = false;
let matchedPairs = 0;
let totalPairs = 0;

/** Returns a new copy of arr shuffled with Fisher-Yates. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Builds a shuffled array of paired cards from the first count/2 motifs. */
function buildDeck(motifs: string[], count: number): CardData[] {
  const pairs = motifs.slice(0, count / 2).flatMap((src, i) => [
    { pairId: i, motifSrc: src },
    { pairId: i, motifSrc: src },
  ]);
  return shuffle(pairs);
}

/** Resets all game-session vars and clears scores + current player in state. */
function resetGameState(): void {
  flipped       = [];
  locked        = false;
  matchedPairs  = 0;
  totalPairs    = state.boardSize! / 2;
  state.currentPlayer = state.startPlayer!;
  state.scores        = { blue: 0, orange: 0 };
}

/** Renders the game HTML into #game and resets all game-session state. */
export function initGame(): void {
  const assets = THEME_ASSETS[state.selectedTheme];
  const deck   = buildDeck(assets.motifs, state.boardSize!);
  resetGameState();
  const el = document.getElementById('game');
  if (el) el.innerHTML = gameScreen(state, deck);
}

/** Refreshes score badges and current-player badge in the DOM. */
export function updateGameUI(): void {
  const scoreBlue   = document.getElementById('score-blue');
  const scoreOrange = document.getElementById('score-orange');
  const badge       = document.getElementById('current-player');
  if (scoreBlue)   scoreBlue.textContent   = String(state.scores.blue);
  if (scoreOrange) scoreOrange.textContent = String(state.scores.orange);
  if (badge) {
    badge.classList.toggle('game__player-icon--blue',   state.currentPlayer === 'blue');
    badge.classList.toggle('game__player-icon--orange', state.currentPlayer === 'orange');
    (badge as HTMLElement).dataset.player = state.currentPlayer;
  }
}

/** Toggles the active player between blue and orange. */
function switchPlayer(): void {
  state.currentPlayer = state.currentPlayer === 'blue' ? 'orange' : 'blue';
}

/** Marks both flipped cards matched, credits the active player, checks for game over. */
function onMatch(): void {
  const [a, b] = flipped;
  a.classList.add('is-matched');
  b.classList.add('is-matched');
  state.scores[state.currentPlayer] += 1;
  matchedPairs += 1;
  flipped = [];
  updateGameUI();
  if (matchedPairs === totalPairs) {
    document.dispatchEvent(new CustomEvent('game:over'));
  }
}

/** Waits 800 ms, then un-flips both cards and switches the active player. */
function onMismatch(): void {
  locked = true;
  const [a, b] = flipped;
  setTimeout(() => {
    a.classList.remove('is-flipped');
    b.classList.remove('is-flipped');
    flipped = [];
    switchPlayer();
    updateGameUI();
    locked = false;
  }, FLIP_BACK_DELAY_MS);
}

/** Compares the two face-up cards and dispatches to onMatch or onMismatch. */
function evaluateFlipped(): void {
  const [a, b] = flipped;
  if (a.dataset.pairId === b.dataset.pairId) onMatch(); else onMismatch();
}

/** Handles a card click: flips the card and triggers evaluation after the second flip. */
export function onCardClick(event: Event): void {
  const card = (event.target as HTMLElement).closest('.card') as HTMLButtonElement | null;
  if (!card || locked || card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;
  card.classList.add('is-flipped');
  flipped.push(card);
  if (flipped.length === 2) evaluateFlipped();
}
