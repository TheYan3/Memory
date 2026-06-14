import { type Theme } from './state';

export interface ThemeAssets {
  back: string;
  motifs: string[];
}

// Code Vibes – 18 motifs available (Figma export naming: Card_Picture.svg + Card_Picture (1–17).svg)
const codeVibesMotifs: string[] = [
  '/assets/img/Theme_Code_Vibes/Card_Picture.svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (1).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (2).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (3).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (4).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (5).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (6).svg',
  '/assets/img/Theme_Code_Vibes/Card_Picture (7).svg',
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
];

// Gaming – 15 motifs available; entries 16–18 are placeholders pending Figma export
const gamingMotifs: string[] = [
  '/assets/img/Theme_Gaming/Picture_Gaming (1).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (2).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (3).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (4).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (5).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (6).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (7).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (8).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (9).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (10).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (11).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (12).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (13).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (14).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (15).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (16).svg', // TODO: placeholder – export from Figma
  '/assets/img/Theme_Gaming/Picture_Gaming (17).svg', // TODO: placeholder – export from Figma
  '/assets/img/Theme_Gaming/Picture_Gaming (18).svg', // TODO: placeholder – export from Figma
];

// DA Projects – all 18 entries are placeholders pending Figma export
const daProjectsMotifs: string[] = Array.from({ length: 18 },
  (_, i) => `/assets/img/da-projects/${String(i + 1).padStart(2, '0')}.svg`,
);

// Foods – all 18 entries are placeholders pending Figma export
const foodsMotifs: string[] = Array.from({ length: 18 },
  (_, i) => `/assets/img/foods/${String(i + 1).padStart(2, '0')}.svg`,
);

export const THEME_ASSETS: Record<Theme, ThemeAssets> = {
  'code-vibes': {
    back: '/assets/img/Theme_Code_Vibes/Face_green.svg',
    motifs: codeVibesMotifs,
  },
  'gaming': {
    back: '/assets/img/Theme_Gaming/Face.svg',
    motifs: gamingMotifs,
  },
  'da-projects': {
    back: '/assets/img/da-projects/back.svg', // TODO: placeholder – export from Figma
    motifs: daProjectsMotifs,
  },
  'foods': {
    back: '/assets/img/foods/back.svg', // TODO: placeholder – export from Figma
    motifs: foodsMotifs,
  },
};
