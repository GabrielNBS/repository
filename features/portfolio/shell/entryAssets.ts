type EntryProgress = {
  complete: number;
  total: number;
};

type EntryPreloadResult = EntryProgress & {
  timedOut: boolean;
};

const ENTRY_TIMEOUT_MS = 6000;

function waitForImage(image: HTMLImageElement) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      image.removeEventListener('load', decodeAndFinish);
      image.removeEventListener('error', finish);
      resolve();
    };
    const decodeAndFinish = () => {
      void image
        .decode?.()
        .catch(() => undefined)
        .finally(finish);
    };

    if (image.complete) {
      decodeAndFinish();
      return;
    }

    image.addEventListener('load', decodeAndFinish, { once: true });
    image.addEventListener('error', finish, { once: true });
  });
}

/**
 * Aguarda apenas imagens críticas que já pertencem ao markup do hero.
 * Assim o browser reutiliza as URLs responsivas do next/image e nenhuma mídia
 * abaixo da dobra é baixada só para alimentar o progresso do loader.
 */
export function preloadEntryAssets(
  root: ParentNode,
  onProgress: (progress: EntryProgress) => void
) {
  const images = Array.from(root.querySelectorAll<HTMLImageElement>('img[data-entry-asset]'));
  const total = images.length + (document.fonts ? 1 : 0);
  let complete = 0;
  let settled = false;

  const report = () => onProgress({ complete, total });
  const markComplete = () => {
    complete += 1;
    report();
  };

  report();

  const tasks = [
    ...images.map((image) => waitForImage(image).finally(markComplete)),
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
