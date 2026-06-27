import '../scss/main.scss'

import confetti from 'canvas-confetti'

import { homeScreen, settingsScreen, themeVisualPath, settingsSummary, gameoverScreen, winnerScreen, drawScreen } from './template'
import { state, type Theme, type Player, type BoardSize } from './state'
import { setTheme } from './theme'
import { initGame, onCardClick } from './game'

const CONFETTI_DURATION_MS  = 5000;
const GAMEOVER_SHOW_DELAY_MS = 3200;

const CONFETTI_OPTS = {
  particleCount: 8,
  spread:        80,
  origin:        { y: 0.5 },
  gravity:       0.8,
  scalar:        1.4,
  startVelocity: 55,
  ticks:         400,
} as const;

let confettiStop: (() => void) | null = null;

/** Fires a realistic confetti burst from both sides for CONFETTI_DURATION_MS. */
function fireConfetti(): void {
  const accent = getComputedStyle(document.body).getPropertyValue('--theme-accent').trim() || '#4DD5BC';
  const colors = [accent, '#F4D738', '#F3832D', '#D21D6E', '#4DD5BC', '#1E7594'];
  const end = Date.now() + CONFETTI_DURATION_MS;

  function frame(): void {
    confetti({ ...CONFETTI_OPTS, angle: 60,  origin: { x: 0, y: 0.5 }, colors });
    confetti({ ...CONFETTI_OPTS, angle: 120, origin: { x: 1, y: 0.5 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  }

  confettiStop = () => confetti.reset();
  frame();
}

/** Hides all screens and reveals the one matching the given id. */
function showScreen(id: string): void {
  const screens = document.querySelectorAll<HTMLElement>('main > section');
  screens.forEach(s => s.classList.add('is-hidden'));
  document.getElementById(id)?.classList.remove('is-hidden');
}

/** Renders the home screen content into #home. */
function renderHome(): void {
  const el = document.getElementById('home');
  if (el) el.innerHTML = homeScreen();
}

/** Renders the settings screen content into #settings. */
function renderSettings(): void {
  const el = document.getElementById('settings');
  if (el) el.innerHTML = settingsScreen(state);
}

/** Renders the game-over summary into #gameover. */
function renderGameover(): void {
  const el = document.getElementById('gameover');
  if (el) el.innerHTML = gameoverScreen(state);
}

/** Renders winner or draw content into #endscreen. */
function renderEndscreen(): void {
  const el = document.getElementById('endscreen');
  if (!el) return;
  el.innerHTML = state.scores.blue === state.scores.orange ? drawScreen(state) : winnerScreen(state);
}

/** Renders and transitions to the settings screen. */
function navigateToSettings(): void {
  renderSettings();
  showScreen('settings');
}

/** Initialises the game and transitions to the game screen. */
function navigateToGame(): void {
  initGame();
  showScreen('game');
}

/** Renders endscreen content and shows it. */
function showEndscreen(): void {
  confettiStop?.();
  confettiStop = null;
  renderEndscreen();
  showScreen('endscreen');
  if (state.scores.blue !== state.scores.orange) fireConfetti();
}

/** Resets scores in preparation for a new session. */
function resetState(): void {
  state.scores = { blue: 0, orange: 0 };
}

/** Updates the preview image and the selection summary to reflect current state. */
function updateSettingsPreview(): void {
  const img     = document.getElementById('settings-preview-img') as HTMLImageElement | null;
  const summary = document.getElementById('settings-summary');
  if (img)     img.src           = themeVisualPath(state.selectedTheme);
  if (summary) summary.innerHTML = settingsSummary(state);
}

/** Opens the exit-game confirmation modal. */
function openExitModal(): void {
  document.getElementById('exit-modal')?.classList.remove('is-hidden');
}

/** Closes the exit-game confirmation modal. */
function closeExitModal(): void {
  document.getElementById('exit-modal')?.classList.add('is-hidden');
}

/** Navigates to settings when the play button is clicked. */
function handleHomeClick(event: Event): void {
  if ((event.target as HTMLElement).closest('#play-button')) navigateToSettings();
}

/** Updates state when a settings radio input changes. */
function handleSettingsChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.name === 'theme')      state.selectedTheme = input.value as Theme;
  if (input.name === 'player')     state.startPlayer   = input.value as Player;
  if (input.name === 'board-size') state.boardSize     = Number(input.value) as BoardSize;
  updateSettingsPreview();
  const btn = document.getElementById('start-button') as HTMLButtonElement | null;
  if (btn) btn.disabled = !(state.startPlayer && state.boardSize);
}

/** Applies theme and starts the game when the start button is clicked. */
function handleSettingsClick(event: Event): void {
  if (!(event.target as HTMLElement).closest('#start-button')) return;
  if (!state.startPlayer || !state.boardSize) return;
  setTheme(state.selectedTheme);
  navigateToGame();
}

/** Routes all click events inside #game to the appropriate handler. */
function handleGameClick(event: Event): void {
  const t = event.target as HTMLElement;
  if (t.closest('#exit-btn'))   { openExitModal(); return; }
  if (t.closest('#modal-back')) { closeExitModal(); return; }
  if (t.closest('#modal-exit')) { closeExitModal(); navigateToSettings(); return; }
  if (t.closest('.card'))        onCardClick(event);
}

/** Resets scores and returns to the settings menu. */
function handleEndscreenClick(event: Event): void {
  if (!(event.target as HTMLElement).closest('#back-to-start')) return;
  confettiStop?.();
  confettiStop = null;
  resetState();
  navigateToSettings();
}

// Init
setTheme(state.selectedTheme);
renderHome();

// Dev shortcut: #[theme]-winner-blue | #[theme]-winner-orange | #[theme]-draw | #[theme]-gameover
// theme = gaming | code-vibes | da-projects | foods (default: gaming)
if (import.meta.env.DEV && window.location.hash) {
  const h = window.location.hash.slice(1);
  const themes = ['gaming', 'code-vibes', 'da-projects', 'foods'] as const;
  const theme = (themes.find(t => h.startsWith(t)) ?? 'gaming') as Theme;
  const screen = h.replace(theme + '-', '');
  setTheme(theme);
  state.selectedTheme = theme;
  state.boardSize = 16;
  state.startPlayer = 'blue';
  state.currentPlayer = 'blue';
  if (screen === 'winner-blue')   { state.scores = { blue: 5, orange: 3 }; showEndscreen(); }
  if (screen === 'winner-orange') { state.scores = { blue: 3, orange: 5 }; showEndscreen(); }
  if (screen === 'draw')          { state.scores = { blue: 4, orange: 4 }; showEndscreen(); }
  if (screen === 'gameover')      { state.scores = { blue: 5, orange: 3 }; renderGameover(); showScreen('gameover'); }
  if (screen === 'home')          { showScreen('home'); }
}

function handleThemeHover(event: MouseEvent): void {
  const img = document.getElementById('settings-preview-img') as HTMLImageElement | null;
  if (!img) return;
  const label = (event.target as HTMLElement).closest<HTMLElement>('label.settings__option');
  const input = label?.querySelector<HTMLInputElement>('input[name="theme"]');
  img.src = input ? themeVisualPath(input.value as Theme) : themeVisualPath(state.selectedTheme);
}

// Event Listeners
document.getElementById('home')?.addEventListener('click', handleHomeClick);
const settingsEl = document.getElementById('settings');
settingsEl?.addEventListener('change', handleSettingsChange);
settingsEl?.addEventListener('click', handleSettingsClick);
settingsEl?.addEventListener('mouseover', handleThemeHover);
settingsEl?.addEventListener('mouseout',  handleThemeHover);
document.getElementById('game')?.addEventListener('click', handleGameClick);
document.getElementById('endscreen')?.addEventListener('click', handleEndscreenClick);
document.addEventListener('game:over', () => {
  renderGameover();
  showScreen('gameover');
  setTimeout(showEndscreen, GAMEOVER_SHOW_DELAY_MS);
});
