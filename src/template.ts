import { type AppState, type Theme, type CardData } from './state';

// ── Home ────────────────────────────────────────────────────────────────────

/** Placeholder until controller.svg is exported from Figma. */
function svgController(): string {
  return `<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="192" height="100" rx="36" stroke="white" stroke-width="6"/>
    <path d="M56 60v20M46 70h20" stroke="white" stroke-width="6" stroke-linecap="round"/>
    <circle cx="140" cy="62" r="7" fill="white"/>
    <circle cx="158" cy="70" r="7" fill="white"/>
    <circle cx="140" cy="78" r="7" fill="white"/>
    <circle cx="122" cy="70" r="7" fill="white"/>
    <rect x="82" y="34" width="16" height="12" rx="4" fill="white"/>
    <rect x="102" y="34" width="16" height="12" rx="4" fill="white"/>
  </svg>`;
}

function svgPlayIcon(): string {
  return `<svg class="home__button__icon" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="20" height="14" rx="4" stroke="currentColor" stroke-width="2"/>
    <path d="M7 5v6M4 8h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="19" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
  </svg>`;
}

/** Returns the inner HTML for the #home screen. */
export function homeScreen(): string {
  return `
    <div class="home__watermark" aria-hidden="true">${svgController()}</div>
    <div class="home__content">
      <p class="home__eyebrow">It's play time.</p>
      <h1 class="home__headline">Ready to play?</h1>
      <button class="home__button" id="play-button">
        ${svgPlayIcon()} Play →
      </button>
    </div>
  `;
}

// ── Settings ─────────────────────────────────────────────────────────────────

const VISUALS: Record<Theme, string> = {
  'code-vibes':  '/assets/img/Theme_Code_Vibes/Theme_Visual_Code_Vibe.svg',
  'gaming':      '/assets/img/Theme_Gaming/Theme_Visual_Gaming.svg',
  'da-projects': '/assets/img/Theme_DA/Theme_Visual_DA_Projects.svg',
  'foods':       '/assets/img/Theme_Food/Theme_Visual_Food.svg',
};

/** Returns the asset path for the given theme's preview visual. */
export function themeVisualPath(theme: Theme): string {
  return VISUALS[theme];
}

function iconPalette(): string {
  return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="8" r="2" fill="#F4D738"/><circle cx="13" cy="8" r="2" fill="#4DD5BC"/><circle cx="10" cy="13" r="2" fill="#D21D6E"/></svg>`;
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
      <span class="settings__option-text" data-text="${label}">${label}</span>
      <span class="settings__arrow" aria-hidden="true"></span>
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

function settingsHeader(): string {
  return `
    <div class="settings__header">
      <h1 class="settings__title">Settings</h1>
      <div class="settings__accent"></div>
    </div>`;
}

function settingsLeft(s: AppState): string {
  return `
    <aside class="settings__left">
      ${settingsGroup(iconPalette(), 'Game themes', themeOptions(s))}
      ${settingsGroup(iconPlayer(), 'Choose player', playerOptions(s))}
      ${settingsGroup(iconGrid(), 'Board size', boardOptions(s))}
    </aside>`;
}

const THEME_NAMES: Record<Theme, string> = {
  'code-vibes': 'Code vibes', 'gaming': 'Gaming',
  'da-projects': 'DA Projects', 'foods': 'Foods',
};

/** Returns the selection-summary items (theme / player / board size) with separators. */
export function settingsSummary(s: AppState): string {
  const player = s.startPlayer.charAt(0).toUpperCase() + s.startPlayer.slice(1);
  const sep = '<span class="settings__summary-sep" aria-hidden="true"></span>';
  const items = [THEME_NAMES[s.selectedTheme], player, `${s.boardSize} cards`];
  return items.map(t => `<span class="settings__summary-item">${t}</span>`).join(sep);
}

function svgStart(): string {
  return `<svg class="settings__start-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 8.5l5 3-5 3z" fill="currentColor"/></svg>`;
}

function settingsRight(s: AppState): string {
  return `
    <div class="settings__right">
      <img id="settings-preview-img" class="settings__preview-img"
           src="${themeVisualPath(s.selectedTheme)}" alt="${s.selectedTheme} theme preview">
      <div class="settings__actionbar">
        <div id="settings-summary" class="settings__summary">${settingsSummary(s)}</div>
        <button class="settings__start-btn" id="start-button">${svgStart()} Start</button>
      </div>
    </div>`;
}

/** Returns the inner HTML for the #settings screen. */
export function settingsScreen(s: AppState): string {
  return `
    <div class="settings__inner">
      ${settingsHeader()}
      <div class="settings__body">
        ${settingsLeft(s)}
        ${settingsRight(s)}
      </div>
    </div>`;
}

// ── Game ──────────────────────────────────────────────────────────────────────

function scoreBadges(): string {
  return `
    <span class="game__badge game__badge--blue">Blue</span>
    <span id="score-blue" class="game__score">0</span>
    <span class="game__badge game__badge--orange">Orange</span>
    <span id="score-orange" class="game__score">0</span>`;
}

function currentPlayerBadge(s: AppState): string {
  const p = s.currentPlayer;
  const label = p.charAt(0).toUpperCase() + p.slice(1);
  return `<span id="current-player" class="game__badge game__badge--${p}">${label}</span>`;
}

function svgExit(): string {
  return `<svg class="game__exit-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M9 10h8m0 0-2.5-2.5M17 10l-2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function gameHeader(s: AppState): string {
  return `
    <header class="game__header">
      <div class="game__scores">${scoreBadges()}</div>
      <div class="game__current">Current player: ${currentPlayerBadge(s)}</div>
      <button class="game__exit-btn" id="exit-btn">${svgExit()} Exit game</button>
    </header>`;
}

function cardHtml(card: CardData): string {
  return `
    <button class="card" data-pair-id="${card.pairId}">
      <div class="card__inner">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">
          <img src="${card.motifSrc}" alt="">
        </div>
      </div>
    </button>`;
}

function exitModal(): string {
  return `
    <div class="modal is-hidden" id="exit-modal" role="dialog" aria-modal="true">
      <div class="modal__overlay"></div>
      <div class="modal__box">
        <p class="modal__question">Are you sure you want to quit the game?</p>
        <div class="modal__actions">
          <button class="modal__btn modal__btn--filled" id="modal-back">Back to game</button>
          <button class="modal__btn modal__btn--outline" id="modal-exit">Exit game</button>
        </div>
      </div>
    </div>`;
}

/** Returns the inner HTML for the #game screen. */
export function gameScreen(s: AppState, cards: CardData[]): string {
  const cols = s.boardSize === 36 ? 6 : 4;
  const rows = s.boardSize === 16 ? 4 : 6;
  return `
    ${gameHeader(s)}
    <div class="game__board">
      <div class="game__grid" style="--cols: ${cols}; --rows: ${rows}">
        ${cards.map(cardHtml).join('')}
      </div>
    </div>
    ${exitModal()}`;
}

// ── Gameover & Endscreen ─────────────────────────────────────────────────────

function svgConfetti(): string {
  const r = (x: number, y: number, w: number, h: number, f: string, a: number) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${f}" transform="rotate(${a},${x + w / 2},${y + h / 2})"/>`;
  const c = (cx: number, cy: number, f: string) => `<circle cx="${cx}" cy="${cy}" r="5" fill="${f}"/>`;
  return `<svg viewBox="0 0 440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${r(20, 8, 12, 12, '#F4D738', 15)}${r(60, 4, 10, 10, '#4DD5BC', -10)}${r(110, 14, 14, 8, '#D21D6E', 25)}
    ${r(160, 6, 10, 14, '#1E7594', -20)}${r(210, 10, 12, 10, '#F3832D', 10)}${r(260, 4, 8, 12, '#F4D738', -15)}
    ${r(310, 12, 14, 8, '#4DD5BC', 30)}${r(360, 6, 10, 10, '#D21D6E', -5)}
    ${c(40, 46, '#F4D738')}${c(140, 50, '#1E7594')}${c(240, 44, '#D21D6E')}${c(340, 48, '#F3832D')}
  </svg>`;
}

function svgPawn(): string {
  return `<svg viewBox="0 0 60 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="30" cy="16" r="12"/>
    <rect x="20" y="28" width="20" height="12" rx="4"/>
    <rect x="14" y="40" width="32" height="8" rx="3"/>
    <rect x="8" y="48" width="44" height="16" rx="6"/>
  </svg>`;
}

function svgScales(): string {
  return `<svg viewBox="0 0 80 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="40" y1="8" x2="40" y2="60"/>
    <rect x="18" y="60" width="44" height="8" rx="4" fill="currentColor" stroke="none"/>
    <line x1="10" y1="18" x2="70" y2="18"/>
    <line x1="18" y1="18" x2="10" y2="38"/>
    <line x1="62" y1="18" x2="70" y2="38"/>
    <rect x="2" y="38" width="22" height="6" rx="3" fill="currentColor" stroke="none"/>
    <rect x="56" y="38" width="22" height="6" rx="3" fill="currentColor" stroke="none"/>
  </svg>`;
}

/** Returns inner HTML for the #gameover screen. */
export function gameoverScreen(s: AppState): string {
  return `
    <div class="gameover__content">
      <h1 class="gameover__headline">Game over</h1>
      <p class="gameover__label">Final score</p>
      <div class="gameover__scores">
        <span class="game__badge game__badge--blue">Blue</span>
        <span class="gameover__score">${s.scores.blue}</span>
        <span class="game__badge game__badge--orange">Orange</span>
        <span class="gameover__score">${s.scores.orange}</span>
      </div>
    </div>`;
}

/** Returns inner HTML for #endscreen when there is a winner. */
export function winnerScreen(s: AppState): string {
  const p = s.scores.blue > s.scores.orange ? 'blue' : 'orange';
  const label = p === 'blue' ? 'BLUE' : 'ORANGE';
  return `
    <div class="endscreen__confetti" aria-hidden="true">${svgConfetti()}</div>
    <div class="endscreen__content">
      <p class="endscreen__label">The winner is</p>
      <p class="endscreen__winner endscreen__winner--${p}">${label} PLAYER</p>
      <div class="endscreen__icon endscreen__icon--${p}">${svgPawn()}</div>
      <button class="endscreen__btn" id="back-to-start">Back to start</button>
    </div>`;
}

/** Returns inner HTML for #endscreen when the game ends in a draw. */
export function drawScreen(): string {
  return `
    <div class="endscreen__content">
      <p class="endscreen__draw-label">It's a</p>
      <h1 class="endscreen__draw">DRAW</h1>
      <div class="endscreen__icon">${svgScales()}</div>
      <button class="endscreen__btn" id="back-to-start">Back to start</button>
    </div>`;
}
