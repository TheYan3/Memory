import { type Theme } from './state';

/** Asset paths for a single theme. */
export interface ThemeAssets {
  motifs: string[];
}

// Code Vibes: non-sequential naming (starts with no number, skips (7))
const codeVibesMotifs: string[] = [
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture.svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (1).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (2).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (3).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (4).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (5).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (6).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (8).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (9).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (10).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (11).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (12).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (13).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (14).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (15).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (16).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (17).svg',
  '/Memory/assets/img/Theme_Code_Vibes/Card_Picture (18).svg',
];

const gamingMotifs     = Array.from({length: 18}, (_, i) => `/Memory/assets/img/Theme_Gaming/Picture_Gaming (${i + 1}).svg`);
const daProjectsMotifs = Array.from({length: 18}, (_, i) => `/Memory/assets/img/Theme_DA/Back_DA (${i + 1}).svg`);
const foodsMotifs      = Array.from({length: 18}, (_, i) => `/Memory/assets/img/Theme_Food/Back_Food (${i + 1}).svg`);

/** Motif image paths for every theme, indexed by theme key. */
export const THEME_ASSETS: Record<Theme, ThemeAssets> = {
  'code-vibes':  { motifs: codeVibesMotifs },
  'gaming':      { motifs: gamingMotifs },
  'da-projects': { motifs: daProjectsMotifs },
  'foods':       { motifs: foodsMotifs },
};
