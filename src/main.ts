import '../scss/main.scss'
import { homeScreen, settingsScreen, themeVisualPath, breadcrumbText } from './template'
import { state, type Theme, type Player, type BoardSize } from './state'
import { setTheme } from './theme'
import { initGame, onCardClick } from './game'

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

/** Renders settings and transitions to the settings screen. */
function navigateToSettings(): void {
  renderSettings();
  showScreen('settings');
}

/** Initialises the game and transitions to the game screen. */
function navigateToGame(): void {
  initGame();
  showScreen('game');
}

/** Updates preview image and breadcrumb to reflect current state. */
function updateSettingsPreview(): void {
  const img   = document.getElementById('settings-preview-img') as HTMLImageElement | null;
  const crumb = document.getElementById('settings-breadcrumb');
  if (img)   img.src        = themeVisualPath(state.selectedTheme);
  if (crumb) crumb.textContent = breadcrumbText(state);
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
}

/** Applies theme and starts the game when the start button is clicked. */
function handleSettingsClick(event: Event): void {
  if (!(event.target as HTMLElement).closest('#start-button')) return;
  setTheme(state.selectedTheme);
  navigateToGame();
}

/** Routes all click events inside #game to the appropriate handler. */
function handleGameClick(event: Event): void {
  const t = event.target as HTMLElement;
  if (t.closest('#exit-btn'))   { openExitModal(); return; }
  if (t.closest('#modal-back')) { closeExitModal(); return; }
  if (t.closest('#modal-exit')) { closeExitModal(); showScreen('home'); return; }
  if (t.closest('.card'))        onCardClick(event);
}

// Init
renderHome();

// Event Listeners
document.getElementById('home')?.addEventListener('click', handleHomeClick);
document.getElementById('settings')?.addEventListener('change', handleSettingsChange);
document.getElementById('settings')?.addEventListener('click', handleSettingsClick);
document.getElementById('game')?.addEventListener('click', handleGameClick);
document.addEventListener('game:over', () => showScreen('gameover'));