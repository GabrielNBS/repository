'use client';

import AppIcon from '@/features/portfolio/shared/AppIcon';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './BackToTop.module.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const image = document.querySelector<HTMLImageElement>('[data-back-to-top-trigger]');
    if (!image) return;

    const observer = new IntersectionObserver(([entry]) => {
      const loaded = image.complete && image.naturalWidth > 0;
      // Keep it available after passing the image, including at the footer.
      setVisible(loaded && (entry.intersectionRatio >= 0.8 || entry.boundingClientRect.top < 0));
    }, { threshold: [0, 0.8] });
    const observeLoadedImage = () => {
      observer.unobserve(image);
      observer.observe(image);
    };
    image.addEventListener('load', observeLoadedImage);
    observer.observe(image);
    return () => {
      image.removeEventListener('load', observeLoadedImage);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <Link href="#hero-title" className={styles.button} aria-label="Voltar ao topo">
      <AppIcon name="arrowUp" />
    </Link>
  );
}
