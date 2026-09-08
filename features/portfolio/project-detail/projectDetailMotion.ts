'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useDetailMotion(root: RefObject<HTMLElement | null>, routeKey: string) {
  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;
      const media = gsap.matchMedia();
      const select = gsap.utils.selector(page);

      media.add(
        {
          desktop: '(min-width: 1101px) and (min-height: 700px)',
          motion: '(prefers-reduced-motion: no-preference)'
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;
          const intro = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } });
          intro
            .from(
              select('[data-motion="detail-title"]'),
              { autoAlpha: 0, y: 28, duration: 1.1 },
              0.1
            )
            .from(
              select('[data-motion="detail-intro"]'),
              { autoAlpha: 0, y: 16, stagger: 0.12 },
              0.25
            );

          // Create the only pin before downstream triggers so their measurements
          // include its spacing. The image's reserved dimensions prevent shifts.
          const cover = page.querySelector<HTMLElement>('[data-motion="detail-cover"]');
          const stage = page.querySelector<HTMLElement>('[data-motion="detail-cover-stage"]');
          const mat = page.querySelector<HTMLElement>('[data-motion="detail-cover-mat"]');
          const image = page.querySelector<HTMLElement>('[data-motion="detail-cover-image"]');
          if (conditions.desktop && cover && stage && mat && image) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: cover,
                  pin: stage,
                  start: 'top top',
                  end: '+=70%',
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true
                }
              })
              .fromTo(
                mat,
                { clipPath: 'inset(9% 16% 9% 16%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 },
                0
              )
              .fromTo(image, { scale: 1.04 }, { scale: 1, ease: 'none', duration: 1 }, 0);
          }

          const chapterLinks = select('[data-motion="detail-chapter-link"]') as HTMLElement[];
          const chapters = select('[data-motion="detail-chapter"]') as HTMLElement[];
          const setChapter = (index: number) => {
            chapterLinks.forEach((link, linkIndex) => {
              if (linkIndex === index) link.setAttribute('aria-current', 'step');
              else link.removeAttribute('aria-current');
            });
          };
          chapters.forEach((chapter, index) => {
            ScrollTrigger.create({
              trigger: chapter,
              start: 'top 55%',
              end: 'bottom 55%',
              onEnter: () => setChapter(index),
              onEnterBack: () => setChapter(index)
            });
            gsap.from(chapter.querySelector('[data-motion="detail-chapter-progress"]'), {
              scaleX: 0,
              ease: 'none',
              scrollTrigger: { trigger: chapter, start: 'top 75%', end: 'bottom 65%', scrub: 0.8 }
            });
          });

          const scenes = select('[data-motion="detail-gallery-scene"]') as HTMLElement[];
          scenes.forEach((scene) => {
            const desktop = scene.querySelector('[data-motion="detail-desktop"]');
            const mobile = scene.querySelector('[data-motion="detail-mobile"]');
            const sequence = gsap.timeline({
              defaults: { duration: 1, ease: 'power3.out' },
              scrollTrigger: { trigger: scene, start: 'top 85%', once: true }
            });
            if (desktop) sequence.from(desktop, { autoAlpha: 0, y: 35 }, 0);
            if (mobile) sequence.from(mobile, { autoAlpha: 0, y: 45 }, 0.15);
          });

          (select('[data-motion="detail-reveal"]') as HTMLElement[]).forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: 22,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 92%', once: true }
            });
          });

          gsap.to(select('[data-motion="detail-progress"]'), {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: page, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
          });

          return () => chapterLinks.forEach((link) => link.removeAttribute('aria-current'));
        }
      );

      // Late images and fonts can change gallery heights. One queued refresh
      // coalesces load events; no global scroll restoration is overridden.
      let refreshFrame = 0;
      let disposed = false;
      const refresh = () => {
        if (disposed) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      const images = Array.from(page.querySelectorAll('img'));
      images.forEach((image) => image.addEventListener('load', refresh));
      document.fonts.ready.then(refresh);
      refresh();
      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        images.forEach((image) => image.removeEventListener('load', refresh));
        media.revert();
      };
    },
    { scope: root, dependencies: [routeKey], revertOnUpdate: true }
  );
}
