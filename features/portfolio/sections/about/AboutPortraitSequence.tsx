'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  aboutPortraitPoster,
  getAboutPortraitFrames,
  type AboutPortraitMode
} from './aboutPortraitFrames';
import { useAboutPortraitMotion } from './aboutPortraitMotion';
import styles from './AboutPortraitSequence.module.css';

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
      className={styles.figure}
      data-interaction-mode={mode}
      data-motion="about-portrait"
    >
      <Image
        src={aboutPortraitPoster.src}
        alt="Retrato editorial em recorte e colagem de Gabriel Nascimento"
        className={styles.poster}
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
          className={styles.frame}
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

      <figcaption className={styles.caption}>
        <span>Gabriel Nascimento</span>
        <span className={styles.location}>São Paulo / BR</span>
      </figcaption>
    </figure>
  );
}
