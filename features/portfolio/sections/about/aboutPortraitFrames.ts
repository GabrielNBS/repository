export type AboutPortraitMode = 'static' | 'scroll' | 'hybrid';

export interface AboutPortraitFrame {
  id: string;
  src: string;
}

export const ABOUT_PORTRAIT_COLUMNS = 4;

export const aboutPortraitPoster: AboutPortraitFrame = {
  id: 'upper-0',
  src: '/images/about/frames/about-collage-transition-00.png'
};

export const aboutPortraitHybridFrames: readonly AboutPortraitFrame[] = [
  aboutPortraitPoster,
  { id: 'upper-1', src: '/images/about/frames/about-collage-transition-01.png' },
  { id: 'upper-2', src: '/images/about/frames/about-collage-transition-02.png' },
  { id: 'upper-3', src: '/images/about/frames/about-collage-transition-03.png' },
  { id: 'lower-0', src: '/images/about/frames/about-collage-look-low-00.png' },
  { id: 'lower-1', src: '/images/about/frames/about-collage-look-low-01.png' },
  { id: 'lower-2', src: '/images/about/frames/about-collage-look-low-02.png' },
  { id: 'lower-3', src: '/images/about/frames/about-collage-look-low-03.png' }
];

export const aboutPortraitScrollFrames: readonly AboutPortraitFrame[] = [
  aboutPortraitPoster,
  aboutPortraitHybridFrames[2],
  aboutPortraitHybridFrames[5],
  aboutPortraitHybridFrames[7]
];

export function getAboutPortraitFrames(mode: AboutPortraitMode) {
  if (mode === 'hybrid') return aboutPortraitHybridFrames;
  if (mode === 'scroll') return aboutPortraitScrollFrames;
  return [aboutPortraitPoster];
}
