type EntryProgress = {
  complete: number;
  total: number;
};

type EntryPreloadResult = EntryProgress & {
  timedOut: boolean;
};

// Apenas materiais essenciais de entrada imediata (Hero e início da narrativa).
// Mídias subsequentes são carregadas sob demanda conforme entram na viewport.
const imageAssets = [
  '/images/hero/front-end-collage-paper-bg.png',
  '/images/hero/front-end-editorial.png',
  '/images/hero/loader-ball-cream.png',
  '/images/hero/loader-ball-lilac.png',
  '/images/hero/loader-ball-peach.png',
  '/images/about/gabriel-editorial-portrait.png',
  '/videos/projects/regula-poster.webp',
  '/videos/projects/e-food-poster.webp'
] as const;

const motionAssets = [
  '/videos/projects/regula.webm',
  '/videos/projects/e-food.webm'
] as const;

const ENTRY_TIMEOUT_MS = 9000;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    const settle = () => resolve();

    image.onload = () => {
      void image.decode?.().catch(() => undefined).finally(settle);
    };
    image.onerror = settle;
    image.src = src;

    if (image.complete) {
      void image.decode?.().catch(() => undefined).finally(settle);
    }
  });
}

function preloadVideoMetadata(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement('video');
    const settle = () => {
      video.removeAttribute('src');
      video.load();
      resolve();
    };

    video.muted = true;
    video.preload = 'metadata';
    video.onloadedmetadata = settle;
    video.onerror = settle;
    video.src = src;
    video.load();
  });
}

/**
 * Prepara os materiais prioritários de entrada. A proteção por tempo impede que
 * uma conexão instável trave o carregamento indefinidamente.
 */
export function preloadEntryAssets(onProgress: (progress: EntryProgress) => void) {
  const preloaders = [
    ...imageAssets.map((src) => () => preloadImage(src)),
    ...motionAssets.map((src) => () => preloadVideoMetadata(src))
  ];
  const total = preloaders.length + (document.fonts ? 1 : 0);
  let complete = 0;
  let settled = false;

  const report = () => onProgress({ complete, total });
  const markComplete = () => {
    complete += 1;
    report();
  };

  report();

  const tasks = [
    ...preloaders.map((preload) => Promise.resolve(preload()).finally(markComplete)),
    ...(document.fonts ? [document.fonts.ready.catch(() => undefined).finally(markComplete)] : [])
  ];

  return new Promise<EntryPreloadResult>((resolve) => {
    const finish = (timedOut: boolean) => {
      if (settled) return;
      settled = true;
      resolve({ complete, timedOut, total });
    };

    const timeout = window.setTimeout(() => finish(true), ENTRY_TIMEOUT_MS);

    void Promise.allSettled(tasks).then(() => {
      window.clearTimeout(timeout);
      finish(false);
    });
  });
}
