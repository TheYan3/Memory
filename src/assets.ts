import { type Theme } from './state';

/** Asset paths for a single theme. */
export interface ThemeAssets {
  motifs: string[];
}

// Code Vibes: non-sequential naming (starts with no number, skips (7))
const codeVibesMotifs: string[] = [
  '/assets/img/Theme_Code_Vibes/Card_Picture.svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (1).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (2).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (3).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (4).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (5).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (6).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (8).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (9).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (10).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (11).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (12).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (13).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (14).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (15).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (16).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (17).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (18).svg',
];

const gamingMotifs     = Array.from({length: 18}, (_, i) => `/assets/img/Theme_Gaming/Picture_Gaming (${i + 1}).svg`);
const daProjectsMotifs = Array.from({length: 18}, (_, i) => `/assets/img/Theme_DA/Back_DA (${i + 1}).svg`);
const foodsMotifs      = Array.from({length: 18}, (_, i) => `/assets/img/Theme_Food/Back_Food (${i + 1}).svg`);

/** Motif image paths for every theme, indexed by theme key. */
export const THEME_ASSETS: Record<Theme, ThemeAssets> = {
  'code-vibes':  { motifs: codeVibesMotifs },
  'gaming':      { motifs: gamingMotifs },
  'da-projects': { motifs: daProjectsMotifs },
  'foods':       { motifs: foodsMotifs },
};
