'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { preloadEntryAssets } from '../../shell/entryAssets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHeroMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = root.current;

      if (!section) return;

      const select = gsap.utils.selector(section);
      const loader = section.querySelector<HTMLElement>('[data-motion="hero-loader"]');
      const loaderIndex = section.querySelector<HTMLElement>('[data-motion="hero-loader-index"]');
      const nameDrift = section.querySelector<HTMLElement>('[data-motion="hero-name-drift"]');
      const heroTitle = section.querySelector<HTMLElement>('[data-motion="hero-title"]');
      const nameSupport = select('[data-motion="hero-name-support"]');
      const metaDrift = section.querySelector<HTMLElement>('[data-motion="hero-meta-drift"]');
      const footerDrift = section.querySelector<HTMLElement>('[data-motion="hero-footer-drift"]');

      if (
        !loader ||
        !loaderIndex ||
        !nameDrift ||
        !heroTitle ||
        !metaDrift ||
        !footerDrift
      ) {
        return;
      }

      const loaderBalls = select('[data-motion="loader-ball"]');
      const media = gsap.matchMedia();
      let entryTimeline: gsap.core.Timeline | undefined;
      let designTimer: number | undefined;
      let cancelled = false;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // O conteúdo já existe no DOM, mas só é revelado visualmente depois que
      // fontes e materiais da composição estiverem prontos, evitando flashes.
      gsap.set([heroTitle, ...nameSupport], { autoAlpha: 0, y: 24 });
      gsap.set([metaDrift, footerDrift], { autoAlpha: 0 });

      // O movimento usa poses discretas em vez de interpolação contínua para
      // preservar a sensação de stop motion da colagem de papel.
      const ballsWave = gsap.timeline({ paused: true, repeat: -1 });
      const ballPoses = [
        { rotation: -5, scale: 1.05, y: -8 },
        { rotation: 6, scale: 1.08, y: -15 },
        { rotation: -4, scale: 1.05, y: -9 }
      ];

      ballsWave.set(loaderBalls, { rotation: 0, scale: 1, y: 0 });
      [0, 1, 2, 1].forEach((index) => {
        ballsWave
          .set(loaderBalls[index], ballPoses[index])
          .to({}, { duration: 0.14 })
          .set(loaderBalls[index], { rotation: 0, scale: 1, y: 0 })
          .to({}, { duration: 0.06 });
      });

      if (!reduceMotion) {
        ballsWave.play();
      }

      const designDelay = reduceMotion
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            designTimer = window.setTimeout(resolve, 3000);
          });

      void Promise.all([
        preloadEntryAssets(({ complete, total }) => {
          if (cancelled) return;
          const progress = Math.round((complete / total) * 100);
          loaderIndex.textContent = `${String(progress).padStart(3, '0')}%`;
        }),
        designDelay
      ]).then(() => {
        if (cancelled) return;

        loaderIndex.textContent = '100%';

        if (reduceMotion) {
          gsap.set([heroTitle, ...nameSupport, metaDrift, footerDrift], { autoAlpha: 1, y: 0 });
          gsap.set(loader, { display: 'none' });
          ScrollTrigger.refresh();
          return;
        }

        entryTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        entryTimeline
          .addLabel('release', 0)
          .to(
            loaderBalls,
            { autoAlpha: 0, duration: 0.32, scale: 0.72, stagger: { each: 0.05 }, y: 8 },
            'release'
          )
          .to(loader, { autoAlpha: 0, duration: 0.26 }, 'release+=0.5')
          .to(heroTitle, { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power4.out' }, 'release+=0.48')
          .to(
            nameSupport,
            { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.06, ease: 'power4.out' },
            'release+=0.62'
          )
          .to(metaDrift, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power4.out' }, 'release+=0.72')
          .to(footerDrift, { autoAlpha: 1, duration: 0.42, ease: 'power4.out' }, 'release+=0.78')
          .set(loader, { display: 'none' })
          .add(() => ballsWave.kill(), 'release+=0.32')
          .add(() => ScrollTrigger.refresh());
      });

      media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
        const heroParallax = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'hero-parallax',
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });

        heroParallax
          .to(nameDrift, { yPercent: -15, autoAlpha: 0.28, duration: 0.72 }, 0)
          .to(metaDrift, { y: -28, autoAlpha: 0, duration: 0.36 }, 0.04)
          .to(footerDrift, { y: 24, autoAlpha: 0, duration: 0.36 }, 0.12);

        return () => heroParallax.kill();
      });

      return () => {
        cancelled = true;
        if (designTimer !== undefined) window.clearTimeout(designTimer);
        entryTimeline?.kill();
        ballsWave.kill();
        media.revert();
      };
    },
    { scope: root }
  );
}
