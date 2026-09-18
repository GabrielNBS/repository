'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ProjectTeaserAsset } from './data/projects';
import styles from './ProjectTeaser.module.css';

type ProjectTeaserProps = {
  teaser?: ProjectTeaserAsset;
  className?: string;
  priority?: boolean;
  label?: string;
  sizes?: string;
};

export default function ProjectTeaser({
  teaser,
  className = '',
  priority = false,
  label = 'Carregando teaser',
  sizes = '100vw'
}: ProjectTeaserProps) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!teaser || priority) return;

    const element = root.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '720px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [priority, teaser]);

  useEffect(() => {
    if (!shouldLoad || !video.current) return;
    video.current.load();
  }, [shouldLoad]);

  if (!teaser) return null;

  return (
    <div
      ref={root}
      className={`${styles.root} ${className}`}
      aria-hidden="true"
    >
      <Image
        className={styles.poster}
        src={teaser.poster}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
      />
      {shouldLoad && (
        <video
          ref={video}
          className={`${styles.video} ${isReady ? styles.videoReady : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={() => {
            setIsReady(true);
            setIsBuffering(false);
            setHasError(false);
            void video.current?.play().catch(() => undefined);
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onError={() => {
            setHasError(true);
            setIsReady(false);
            setIsBuffering(false);
          }}
        >
          <source src={teaser.webm} type="video/webm" />
          <source src={teaser.mp4} type="video/mp4" />
        </video>
      )}
      <span className={styles.scrim} />
      {(!isReady || isBuffering) && !hasError && (
        <span className={styles.loading}>
          <i className={styles.spinner} />
          {isBuffering ? 'Retomando teaser' : label}
        </span>
      )}
      {hasError && <span className={styles.error}>Prévia indisponível</span>}
    </div>
  );
}
