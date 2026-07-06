export type PetalSize = 'small' | 'medium' | 'large';

export interface PetalConfig {
  top: string;
  left?: string;
  right?: string;
  size: PetalSize;
  opacity: number;
  rotate: number;
  /** direção do parallax no scroll: -1 (contrário) ou 1 (a favor) */
  direction: 1 | -1;
  path: string;
}

const PATH_A =
  'M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z';
const PATH_B =
  'M10,0 C18,6 24,14 22,23 C20,28 16,30 10,27 C4,30 0,28 -2,23 C-4,14 2,6 10,0 Z';
const PATH_C =
  'M10,0 C17,7 21,15 19,22 C17,27 13,29 10,26 C7,29 3,27 1,22 C-1,15 3,7 10,0 Z';

export const SIZE_PX: Record<PetalSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

export const SIZE_PARALLAX_SPEED: Record<PetalSize, number> = {
  small: 60,
  medium: 100,
  large: 160,
};

export const PETALS: readonly PetalConfig[] = [
  { top: '12%', left: '4%',  size: 'small',  opacity: 0.40, rotate: 0,   direction: 1,  path: PATH_A },
  { top: '25%', left: '8%',  size: 'medium', opacity: 0.30, rotate: 25,  direction: -1, path: PATH_B },
  { top: '45%', left: '3%',  size: 'medium', opacity: 0.45, rotate: -15, direction: 1,  path: PATH_A },
  { top: '78%', left: '12%', size: 'large',  opacity: 0.35, rotate: 50,  direction: 1,  path: PATH_B },
  { top: '88%', left: '5%',  size: 'small',  opacity: 0.40, rotate: 10,  direction: -1, path: PATH_A },
  { top: '15%', right: '25%',size: 'medium', opacity: 0.25, rotate: -40, direction: 1,  path: PATH_A },
  { top: '8%',  right: '10%',size: 'small',  opacity: 0.45, rotate: 15,  direction: -1, path: PATH_A },
  { top: '28%', right: '5%', size: 'large',  opacity: 0.20, rotate: 95,  direction: -1, path: PATH_B },
  { top: '48%', right: '18%',size: 'medium', opacity: 0.30, rotate: -20, direction: 1,  path: PATH_A },
  { top: '68%', right: '6%', size: 'large',  opacity: 0.35, rotate: 115, direction: 1,  path: PATH_C },
  { top: '85%', right: '20%',size: 'small',  opacity: 0.40, rotate: 35,  direction: -1, path: PATH_A },
  { top: '55%', left: '28%', size: 'medium', opacity: 0.25, rotate: -60, direction: 1,  path: PATH_A },
] as const;