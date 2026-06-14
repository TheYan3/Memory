import { type Theme } from './state';

const THEME_CLASSES: Record<Theme, string> = {
  'code-vibes':  'theme-code-vibes',
  'gaming':      'theme-gaming',
  'da-projects': 'theme-da-projects',
  'foods':       'theme-foods',
};

/** Removes all theme classes from body and applies the one for the given theme. */
export function setTheme(theme: Theme): void {
  const { classList } = document.body;
  Object.values(THEME_CLASSES).forEach(cls => classList.remove(cls));
  classList.add(THEME_CLASSES[theme]);
}
