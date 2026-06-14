import '../scss/main.scss'
import { homeScreen, settingsScreen, themeVisualPath, breadcrumbText } from './template'
import { state, type Theme, type Player, type BoardSize } from './state'

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

/** Updates preview image and breadcrumb to reflect current state. */
function updateSettingsPreview(): void {
  const img = document.getElementById('settings-preview-img') as HTMLImageElement | null;
  const crumb = document.getElementById('settings-breadcrumb');
  if (img) img.src = themeVisualPath(state.selectedTheme);
  if (crumb) crumb.textContent = breadcrumbText(state);
}

/** Toggles the flipped state of the clicked card. */
function handleCardFlip(event: Event): void {
  const card = (event.target as HTMLElement).closest('.card') as HTMLElement | null;
  card?.classList.toggle('is-flipped');
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

/** Navigates to the game screen when the start button is clicked. */
function handleSettingsClick(event: Event): void {
  if ((event.target as HTMLElement).closest('#start-button')) showScreen('game');
}

// Init
renderHome();

// Event Listeners
document.getElementById('home')?.addEventListener('click', handleHomeClick);
document.getElementById('settings')?.addEventListener('change', handleSettingsChange);
document.getElementById('settings')?.addEventListener('click', handleSettingsClick);
document.getElementById('game')?.addEventListener('click', handleCardFlip);