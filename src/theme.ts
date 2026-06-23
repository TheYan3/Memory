import { type Theme } from './state';

/** Applies the given theme class to body, removing any previously active theme. */
export function setTheme(theme: Theme): void {
  document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
  document.body.classList.add(`theme-${theme}`);
}
