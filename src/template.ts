import { type AppState, type Theme } from './state';

// ── Home ────────────────────────────────────────────────────────────────────

/** Returns the inner HTML for the #home screen. */
export function homeScreen(): string {
  return `
    <div class="home__watermark" aria-hidden="true">
      <!-- TODO: replace with <img src="/assets/img/controller.svg" alt=""> once exported from Figma -->
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="20" width="192" height="100" rx="36" stroke="white" stroke-width="6"/>
        <path d="M56 60v20M46 70h20" stroke="white" stroke-width="6" stroke-linecap="round"/>
        <circle cx="140" cy="62" r="7" fill="white"/>
        <circle cx="158" cy="70" r="7" fill="white"/>
        <circle cx="140" cy="78" r="7" fill="white"/>
        <circle cx="122" cy="70" r="7" fill="white"/>
        <rect x="82" y="34" width="16" height="12" rx="4" fill="white"/>
        <rect x="102" y="34" width="16" height="12" rx="4" fill="white"/>
      </svg>
    </div>
    <div class="home__content">
      <p class="home__eyebrow">It's play time.</p>
      <h1 class="home__headline">Ready to play?</h1>
      <button class="home__button" id="play-button">
        <svg class="home__button__icon" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1" y="1" width="20" height="14" rx="4" stroke="currentColor" stroke-width="2"/>
          <path d="M7 5v6M4 8h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="16" cy="6" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="19" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
        </svg>
        Play →
      </button>
    </div>
  `;
}

// ── Settings ─────────────────────────────────────────────────────────────────

const VISUALS: Record<Theme, string> = {
  'code-vibes':  '/assets/img/Visuals/Theme_Visual_Code_Vibe.svg',
  'gaming':      '/assets/img/Visuals/Theme_Visual_Gaming.svg',
  'da-projects': '/assets/img/Visuals/Theme_Visual_DA_Projects.svg',
  'foods':       '/assets/img/Visuals/Theme_Visual_Food.svg',
};

/** Returns the asset path for the given theme's preview visual. */
export function themeVisualPath(theme: Theme): string {
  return VISUALS[theme];
}

/** Returns the breadcrumb string reflecting current state. */
export function breadcrumbText(s: AppState): string {
  const themeNames: Record<Theme, string> = {
    'code-vibes': 'Code vibes', 'gaming': 'Gaming',
    'da-projects': 'DA Projects', 'foods': 'Foods',
  };
  const player = s.startPlayer.charAt(0).toUpperCase() + s.startPlayer.slice(1);
  return `${themeNames[s.selectedTheme]} / ${player} / ${s.boardSize} cards`;
}

function iconPalette(): string {
  return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="8" r="2" fill="#F4D738"/><circle cx="13" cy="8" r="2" fill="#34D3B0"/><circle cx="10" cy="13" r="2" fill="#D81E73"/></svg>`;
}

function iconPlayer(): string {
  return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
}

function iconGrid(): string {
  return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`;
}

function radioOption(name: string, value: string, label: string, checked: boolean): string {
  return `
    <label class="settings__option">
      <input type="radio" name="${name}" value="${value}"${checked ? ' checked' : ''}>
      <span class="settings__radio-dot"></span>
      <span class="settings__option-text">${label}</span>
      <span class="settings__arrow" aria-hidden="true">›</span>
    </label>`;
}

function settingsGroup(icon: string, title: string, options: string): string {
  return `
    <div class="settings__group">
      <div class="settings__group-header">
        <span class="settings__group-icon">${icon}</span>
        <span class="settings__group-title">${title}</span>
      </div>
      <div class="settings__options">${options}</div>
    </div>`;
}

function themeOptions(s: AppState): string {
  const t = s.selectedTheme;
  return [
    radioOption('theme', 'code-vibes',   'Code vibes theme',  t === 'code-vibes'),
    radioOption('theme', 'gaming',        'Gaming theme',      t === 'gaming'),
    radioOption('theme', 'da-projects',   'DA Projects theme', t === 'da-projects'),
    radioOption('theme', 'foods',         'Foods theme',       t === 'foods'),
  ].join('');
}

function playerOptions(s: AppState): string {
  const p = s.startPlayer;
  return [
    radioOption('player', 'blue',   'Blue',   p === 'blue'),
    radioOption('player', 'orange', 'Orange', p === 'orange'),
  ].join('');
}

function boardOptions(s: AppState): string {
  const b = s.boardSize;
  return [
    radioOption('board-size', '16', '16 cards', b === 16),
    radioOption('board-size', '24', '24 cards', b === 24),
    radioOption('board-size', '36', '36 cards', b === 36),
  ].join('');
}

function previewBar(s: AppState): string {
  const player = s.startPlayer.charAt(0).toUpperCase() + s.startPlayer.slice(1);
  return `
    <div class="settings__preview-bar">
      <div class="settings__preview-scores">
        <span class="settings__preview-badge settings__preview-badge--blue">Blue 0</span>
        <span class="settings__preview-badge settings__preview-badge--orange">Orange 0</span>
      </div>
      <span class="settings__preview-current">
        Current player:
        <span class="settings__preview-badge settings__preview-badge--${s.startPlayer}">${player}</span>
      </span>
      <button class="settings__preview-exit" disabled>Exit game</button>
    </div>`;
}

/** Returns the inner HTML for the #settings screen. */
export function settingsScreen(s: AppState): string {
  return `
    <div class="settings__header">
      <h1 class="settings__title">Settings</h1>
      <div class="settings__accent"></div>
    </div>
    <div class="settings__body">
      <aside class="settings__left">
        ${settingsGroup(iconPalette(), 'Game themes', themeOptions(s))}
        ${settingsGroup(iconPlayer(), 'Choose player', playerOptions(s))}
        ${settingsGroup(iconGrid(), 'Board size', boardOptions(s))}
      </aside>
      <div class="settings__right">
        ${previewBar(s)}
        <img id="settings-preview-img" class="settings__preview-img"
             src="${themeVisualPath(s.selectedTheme)}"
             alt="${s.selectedTheme} theme preview">
      </div>
    </div>
    <footer class="settings__footer">
      <p id="settings-breadcrumb" class="settings__breadcrumb">${breadcrumbText(s)}</p>
      <button class="settings__start-btn" id="start-button">Start →</button>
    </footer>`;
}
