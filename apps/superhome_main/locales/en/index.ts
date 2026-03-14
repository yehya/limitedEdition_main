import { common } from './common';
import { home } from './home';

export const en = {
  common,
  home,
} as const;

export type TranslationKeys = typeof en;
