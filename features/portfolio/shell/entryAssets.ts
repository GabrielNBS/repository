type EntryProgress = {
  complete: number;
  total: number;
};

type EntryPreloadResult = EntryProgress & {
  timedOut: boolean;
};

const imageAssets = [
  '/images/hero/front-end-collage-paper-bg.png',
  '/images/hero/front-end-editorial.png',
  '/images/about/gabriel-editorial-portrait.png',
  '/images/about/gabriel-editorial-portrait-v2.png',
  '/images/about/gabriel-editorial-collage-integrated.png',
  '/images/about/gabriel-editorial-collage-bw.png',
  '/images/about/front-end-editorial.png',
  '/images/about/front-end-collage-wordmark.png',
  '/images/about/front-end-collage-paper-bg.png',
  '/images/about/frames/about-collage-transition-00.png',
  '/images/about/frames/about-collage-transition-01.png',
  '/images/about/frames/about-collage-transition-02.png',
  '/images/about/frames/about-collage-transition-03.png',
  '/images/about/frames/about-collage-look-low-00.png',
  '/images/about/frames/about-collage-look-low-01.png',
  '/images/about/frames/about-collage-look-low-02.png',
  '/images/about/frames/about-collage-look-low-03.png',
  '/videos/projects/regula-poster.webp',
  '/videos/projects/e-food-poster.webp',
  '/videos/projects/e-play-poster.webp',
  '/videos/projects/to-do-poster.webp',
  '/videos/projects/spider-verse-poster.webp',
  '/videos/projects/clone-disney-poster.webp',
  '/videos/projects/hoje-ta-doce-poster.webp'
] as const;

// A abertura aquece apenas os metadados dos vídeos. Baixar todos os arquivos
// completos antes da primeira interação deixaria a experiência pesada sem
// melhorar a primeira pintura; cada teaser continua a carregar seu conteúdo
// quando entra na narrativa.
const motionAssets = [
  '/videos/projects/regula.webm',
  '/videos/projects/e-food.webm',
  '/videos/projects/e-play.webm',
  '/videos/projects/to-do.webm',
  '/videos/projects/spider-verse.webm',
  '/videos/projects/clone-disney.webm',
  '/videos/projects/hoje-ta-doce.webm',
  '/videos/skills/typescript.mp4',
  '/videos/skills/react-next.mp4',
  '/videos/skills/design-system.mp4',
  '/videos/skills/performance.mp4',
  '/videos/skills/ai-frontend.mp4',
  '/videos/skills/accessibility.mp4'
] as const;

const ENTRY_TIMEOUT_MS = 9000;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    const settle = () => resolve();

    image.onload = () => {
      // decode evita que a máscara de entrada revele uma imagem ainda em
      // processamento no thread de pintura. Navegadores antigos seguem pelo
      // mesmo caminho ao resolver o load.
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
 * Prepara os materiais que dão continuidade à abertura: fotografia, colagem,
 * pôsteres e a informação inicial dos vídeos. A proteção por tempo impede que
 * uma conexão degradada transforme a entrada em uma tela de bloqueio.
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
