'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHeroMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!root.current) return;
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(root.current);
        const intro = gsap.timeline({ defaults: { duration: 0.85, ease: 'power3.out' } });

        intro
          .addLabel('type', 0.12)
          .addLabel('study', 0.35)
          .addLabel('details', 0.65)
          .from(
            select('[data-motion="hero-meta"], [data-motion="hero-eyebrow"]'),
            { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.6 },
            0
          )
          .from(
            select('[data-motion="hero-line"]'),
            {
              yPercent: 115,
              rotation: 2,
              transformOrigin: 'left bottom',
              stagger: 0.13,
              duration: 1.1
            },
            'type'
          )
          .from(
            select('[data-motion="hero-study"]'),
            { autoAlpha: 0, y: 30, scale: 0.94, duration: 1.1 },
            'study'
          )
          .from(
            select('[data-motion="hero-sheet"]'),
            { rotation: 0, stagger: 0.12, duration: 1.2 },
            'study'
          )
          .from(select('[data-motion="hero-disc"]'), { scale: 0.65, duration: 1.1 }, 'study')
          .from(
            select('[data-motion="hero-selection"]'),
            { autoAlpha: 0, x: 14, y: 12, duration: 0.65 },
            'details+=0.15'
          )
          .from(
            select('[data-motion="hero-intro"], [data-motion="hero-action"]'),
            { autoAlpha: 0, y: 16, stagger: 0.1 },
            'details'
          )
          .from(select('[data-motion="hero-rule"]'), { scaleX: 0, duration: 1.1 }, 'details')
          .from(select('[data-motion="hero-footer"]'), { autoAlpha: 0, y: 8 }, 'details+=0.2');
      });

      // Separate wrappers keep scroll and entrance transforms independent.
      // matchMedia also reverts when the motion preference changes at runtime.
      media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to(root.current!.querySelector('[data-motion="hero-study-drift"]'), {
          y: -45,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      });

      return () => media.revert();
    },
    { scope: root }
  );
}
