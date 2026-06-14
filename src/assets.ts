import { type Theme } from './state';

export interface ThemeAssets {
  back: string;
  motifs: string[];
}

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

// 17 motifs available; Picture_Gaming (18).svg pending Figma export – 6×6 board unsupported for this theme
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
  '/assets/img/Theme_Gaming/Picture_Gaming (16).svg',
  '/assets/img/Theme_Gaming/Picture_Gaming (17).svg',
];

const daProjectsMotifs: string[] = [
  '/assets/img/Theme_DA/Back_DA (1).svg',
  '/assets/img/Theme_DA/Back_DA (2).svg',
  '/assets/img/Theme_DA/Back_DA (3).svg',
  '/assets/img/Theme_DA/Back_DA (4).svg',
  '/assets/img/Theme_DA/Back_DA (5).svg',
  '/assets/img/Theme_DA/Back_DA (6).svg',
  '/assets/img/Theme_DA/Back_DA (7).svg',
  '/assets/img/Theme_DA/Back_DA (8).svg',
  '/assets/img/Theme_DA/Back_DA (9).svg',
  '/assets/img/Theme_DA/Back_DA (10).svg',
  '/assets/img/Theme_DA/Back_DA (11).svg',
  '/assets/img/Theme_DA/Back_DA (12).svg',
  '/assets/img/Theme_DA/Back_DA (13).svg',
  '/assets/img/Theme_DA/Back_DA (14).svg',
  '/assets/img/Theme_DA/Back_DA (15).svg',
  '/assets/img/Theme_DA/Back_DA (16).svg',
  '/assets/img/Theme_DA/Back_DA (17).svg',
  '/assets/img/Theme_DA/Back_DA (18).svg',
];

const foodsMotifs: string[] = [
  '/assets/img/Theme_Food/Back_Food (1).svg',
  '/assets/img/Theme_Food/Back_Food (2).svg',
  '/assets/img/Theme_Food/Back_Food (3).svg',
  '/assets/img/Theme_Food/Back_Food (4).svg',
  '/assets/img/Theme_Food/Back_Food (5).svg',
  '/assets/img/Theme_Food/Back_Food (6).svg',
  '/assets/img/Theme_Food/Back_Food (7).svg',
  '/assets/img/Theme_Food/Back_Food (8).svg',
  '/assets/img/Theme_Food/Back_Food (9).svg',
  '/assets/img/Theme_Food/Back_Food (10).svg',
  '/assets/img/Theme_Food/Back_Food (11).svg',
  '/assets/img/Theme_Food/Back_Food (12).svg',
  '/assets/img/Theme_Food/Back_Food (13).svg',
  '/assets/img/Theme_Food/Back_Food (14).svg',
  '/assets/img/Theme_Food/Back_Food (15).svg',
  '/assets/img/Theme_Food/Back_Food (16).svg',
  '/assets/img/Theme_Food/Back_Food (17).svg',
  '/assets/img/Theme_Food/Back_Food (18).svg',
];

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
    back: '/assets/img/Theme_DA/Face.svg',
    motifs: daProjectsMotifs,
  },
  'foods': {
    back: '/assets/img/Theme_Food/Face.svg',
    motifs: foodsMotifs,
  },
};
