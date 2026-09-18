'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  aboutPortraitPoster,
  getAboutPortraitFrames,
  type AboutPortraitMode
} from './aboutPortraitFrames';
import { useAboutPortraitMotion } from './aboutPortraitMotion';

const HYBRID_MOTION_QUERY =
  '(min-width: 801px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const imageSizes = '(max-width: 480px) calc(100vw - 2.5rem), (max-width: 800px) 22rem, 34vw';
const posterBlurDataUrl =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAK9Qr0AAD//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xAB2AAEBAQEAAAAAAAAAAAAAAAAGBQcDAQEBAQEAAAAAAAAAAAAAAAABBAADEAACAQMDAwIHAQAAAAAAAAACAQMEEQUSBgAhBxMUwnSxgXEiYTY1EQACAQIGAwADAQAAAAAAAAABAgMAESEEsTGBcSISQWETUcH/wAARCAAUABADARIAAhIAAxIA/9oADAMBAAIRAxEAPwB9uHKmNTOKq3BGNwCaSTTCBNkkTVxTsbSSb625kndTPLNblyMMU1RHFS1NRHBE2vBpjkL8xEWmJatRO4u/R35xjyySxmdpD6j2AQYeQ/N/8ojUKvOtVDwW2F/73XORix6rSds1dbTZKUFlclWU5VlJFeor56wZJg6TFGUscbjE0Qa4hZRCXQeBOze4MtJvAKGpmkkpqmJzsGIeH1EBQj6gEKQiZBdSEFtTdy68lzsz/vyyKxBL3YDxuLjA25qp4FlGFgVBYcY2qzIwocvm5HAYLGQpYXIaxJIvt8qSF2DEXOIOld99ducJDu3NyR1OSFGqmo8flgYCUh62I3pmWlMmkmTaXS/EG/v6fMfDy+3mDH1G1A2HdBXE701M7SbaoqPOqUJqo2Km0+Qomh1DFdjphFq/6f35R7Yf6/0k+UXCckqB1rRNsOxrWiwJ50pj+81//9k=';

export default function AboutPortraitSequence() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<AboutPortraitMode>('static');
  const [loadedFrames, setLoadedFrames] = useState<ReadonlySet<string>>(() => new Set());

  useEffect(() => {
    const hybridMedia = window.matchMedia(HYBRID_MOTION_QUERY);
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
    const syncInteractionMode = () => {
      if (reducedMotionMedia.matches) {
        setMode('static');
        return;
      }

      setMode(hybridMedia.matches ? 'hybrid' : 'scroll');
    };

    syncInteractionMode();
    hybridMedia.addEventListener('change', syncInteractionMode);
    reducedMotionMedia.addEventListener('change', syncInteractionMode);

    return () => {
      hybridMedia.removeEventListener('change', syncInteractionMode);
      reducedMotionMedia.removeEventListener('change', syncInteractionMode);
    };
  }, []);

  const markFrameLoaded = useCallback((id: string) => {
    setLoadedFrames((current) => {
      if (current.has(id)) return current;

      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const renderedFrames = useMemo(() => getAboutPortraitFrames(mode), [mode]);
  const overlayFrames = renderedFrames.slice(1);
  const sequenceReady = mode !== 'static' && overlayFrames.every(({ id }) => loadedFrames.has(id));

  useAboutPortraitMotion(root, { frameCount: renderedFrames.length, mode, ready: sequenceReady });

  return (
    <figure
      ref={root}
      className="border-ink/15 bg-paper relative isolate aspect-[561/701] w-full overflow-hidden rounded-t-[45%] rounded-b-3xl border shadow-[0_1.4rem_3.5rem_rgb(37_34_31_/_0.14)] max-[800px]:w-[min(100%,22rem)]"
      data-interaction-mode={mode}
      data-motion="about-portrait"
    >
      <Image
        src={aboutPortraitPoster.src}
        alt="Retrato editorial em recorte e colagem de Gabriel Nascimento"
        className="pointer-events-none absolute inset-0 z-0 size-full object-cover object-center select-none"
        data-about-poster
        draggable={false}
        fill
        loading="eager"
        placeholder="blur"
        blurDataURL={posterBlurDataUrl}
        quality={75}
        sizes={imageSizes}
      />

      {overlayFrames.map(({ id, src }, overlayIndex) => (
        <Image
          key={id}
          src={src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none invisible absolute inset-0 z-1 size-full object-cover object-center opacity-0 select-none"
          data-about-frame
          data-frame-id={id}
          data-frame-index={overlayIndex + 1}
          draggable={false}
          fill
          loading="lazy"
          onLoad={() => markFrameLoaded(id)}
          quality={75}
          sizes={imageSizes}
        />
      ))}

      <figcaption className="border-ink/15 bg-paper/92 text-ink text-label-sm absolute right-3 bottom-3 left-3 z-10 flex items-center justify-between gap-3 rounded-xl border px-3 py-2 font-extrabold tracking-[0.09em] uppercase shadow-[0_0.45rem_1.2rem_rgb(37_34_31_/_0.12)] backdrop-blur-sm max-[480px]:right-2.5 max-[480px]:bottom-2.5 max-[480px]:left-2.5 max-[480px]:gap-2 max-[480px]:px-2.5">
        <span>Gabriel Nascimento</span>
        <span className="shrink-0 text-right">São Paulo / BR</span>
      </figcaption>
    </figure>
  );
}
