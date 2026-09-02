'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { createBlurReveals } from '../shared/motion/blurRevealMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function createDetailFramesStoryPin(root: RefObject<HTMLElement | null>) {
  const stage = root.current?.querySelector<HTMLElement>('[data-motion="story-stage"]');
  if (!stage) return () => {};

  const media = gsap.matchMedia();

  media.add('(min-width: 801px)', () => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-motion="frame-card"]', stage);
    const behindSection = stage.querySelector<HTMLElement>('[data-motion="behind-section"]');
    const behindItems = stage.querySelectorAll<HTMLElement>('[data-motion="behind-item"]');

    if (cards.length < 3 || !behindSection) return;

    gsap.set(behindSection, { autoAlpha: 0, yPercent: 40 });
    if (behindItems.length) gsap.set(behindItems, { autoAlpha: 0, y: 24 });

    const targetSize = Math.min(265, window.innerWidth * 0.22);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top+=60',
        end: '+=1500',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        refreshPriority: 2
      }
    });

    timeline
      .addLabel('morph-cards', 0)
      .to(
        cards[0],
        {
          xPercent: 0,
          yPercent: 16,
          scaleX: () => targetSize / (cards[0].offsetWidth || 1),
          scaleY: () => targetSize / (cards[0].offsetHeight || 1),
          rotation: -6,
          boxShadow: '0 24px 50px rgba(37,34,31,0.16)',
          zIndex: 10,
          ease: 'power2.inOut',
          duration: 1
        },
        'morph-cards'
      )
      .to(
        cards[1],
        {
          xPercent: -98,
          yPercent: -10,
          scaleX: () => targetSize / (cards[1].offsetWidth || 1),
          scaleY: () => targetSize / (cards[1].offsetHeight || 1),
          rotation: 5,
          boxShadow: '0 28px 55px rgba(37,34,31,0.18)',
          zIndex: 20,
          ease: 'power2.inOut',
          duration: 1
        },
        'morph-cards+=0.08'
      )
      .to(
        cards[2],
        {
          xPercent: -52,
          yPercent: -46,
          scaleX: () => targetSize / (cards[2].offsetWidth || 1),
          scaleY: () => targetSize / (cards[2].offsetHeight || 1),
          rotation: -2,
          boxShadow: '0 34px 65px rgba(37,34,31,0.22)',
          zIndex: 30,
          ease: 'power2.inOut',
          duration: 1
        },
        'morph-cards+=0.16'
      )
      .addLabel('reveal-behind', 0.85)
      .to(
        behindSection,
        { autoAlpha: 1, yPercent: -50, ease: 'power2.out', duration: 1.1 },
        'reveal-behind'
      )
      .addLabel('reveal-details', 1.25);

    if (behindItems.length) {
      timeline.to(
        behindItems,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          ease: 'power2.out',
          duration: 0.75
        },
        'reveal-details'
      );
    }

    timeline.addLabel('hold-pin', 2.1).to({}, { duration: 0.4 }, 'hold-pin');

    return () => timeline.kill();
  });

  return () => media.revert();
}

export function useDetailMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      const introTargets = gsap.utils.toArray<HTMLElement>(
        '[data-motion="detail-intro"] > *, [data-motion="detail-visual"]',
        root.current
      );
      intro.from(introTargets, {
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        y: 35
      });

      const revertBlurReveals = createBlurReveals(root.current);
      const revertStoryPin = createDetailFramesStoryPin(root);

      const detailVisual = root.current?.querySelector<HTMLElement>(
        '[data-motion="detail-visual"]'
      );
      const projectVisual = detailVisual?.querySelector<HTMLElement>(
        '[data-component="project-visual"]'
      );
      const detailHero = root.current?.querySelector<HTMLElement>('[data-motion="detail-hero"]');

      if (projectVisual && detailHero) {
        gsap.to(projectVisual, {
          ease: 'none',
          scrollTrigger: {
            end: 'bottom top',
            scrub: 1,
            start: 'top top',
            trigger: detailHero
          },
          yPercent: -5
        });
      }

      return () => {
        intro.kill();
        revertBlurReveals();
        revertStoryPin();
      };
    },
    { scope: root }
  );
}
