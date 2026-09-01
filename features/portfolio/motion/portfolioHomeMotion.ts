'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { createBlurReveals } from '../shared/motion/blurRevealMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function createScrollTextReveals(root: RefObject<HTMLElement | null>) {
  const elements = gsap.utils.toArray<HTMLElement>('[data-scroll-text-reveal]', root.current);
  if (!elements.length) return () => {};

  const splits = elements.map((element) =>
    SplitText.create(element, { aria: 'auto', type: 'chars' })
  );

  const animations = splits.map((split) => {
    gsap.set(split.chars, { autoAlpha: 0, filter: 'blur(0.55px)', y: 24 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        invalidateOnRefresh: true,
        refreshPriority: 2,
        start: 'top 82%',
        end: 'bottom 18%',
        toggleActions: 'restart reverse restart reverse',
        trigger: split.elements[0]
      }
    });

    timeline.to(split.chars, {
      autoAlpha: 1,
      duration: 0.75,
      ease: 'power3.out',
      filter: 'blur(0px)',
      stagger: { each: 0.018, from: 'start' },
      y: 0
    });

    return timeline;
  });

  return () => {
    animations.forEach((animation) => animation.kill());
    splits.forEach((split) => split.revert());
  };
}

function createProjectsToAboutReveal(root: RefObject<HTMLElement | null>) {
  const aboutSection = root.current?.querySelector<HTMLElement>('[data-about-section]');
  const aboutItems = gsap.utils.toArray<HTMLElement>('[data-transition-item]', root.current);
  const transition = root.current?.querySelector<HTMLElement>('[data-projects-about-transition]');
  const pixels = gsap.utils.toArray<HTMLElement>('[data-projects-about-pixel]', root.current);

  if (!aboutSection || !aboutItems.length || !transition || !pixels.length) {
    return () => {};
  }

  gsap.set(aboutItems, {
    autoAlpha: 0,
    filter: 'blur(12px)',
    rotateX: 10,
    scale: 0.94,
    transformOrigin: 'center bottom',
    y: 100
  });
  gsap.set(transition, { autoAlpha: 0 });
  gsap.set(pixels, { autoAlpha: 0, scale: 0.7, transformOrigin: 'center' });

  const getDelay = (index: number) => Number(pixels[index]?.dataset.transitionDelay ?? 0);
  const getReverseDelay = (index: number) => 0.47 - getDelay(index);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: 'top 92%',
      end: 'top top',
      scrub: 0.9,
      invalidateOnRefresh: true
    }
  });

  timeline
    .to(transition, { autoAlpha: 1, duration: 0.01 }, 0)
    .to(pixels, { autoAlpha: 1, duration: 0.08, ease: 'none', scale: 1, stagger: getDelay }, 0.02)
    .to(
      aboutItems,
      {
        autoAlpha: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        scale: 1,
        stagger: 0.12,
        y: 0,
        ease: 'power4.out',
        duration: 0.7
      },
      0.54
    )
    .to(
      pixels,
      { autoAlpha: 0, duration: 0.08, ease: 'none', scale: 0.35, stagger: getReverseDelay },
      0.68
    )
    .to(transition, { autoAlpha: 0, duration: 0.01 }, 1.24);

  return () => timeline.kill();
}

export function usePortfolioMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const nav = root.current?.querySelector<HTMLElement>('[data-nav]');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        gsap.set('[data-hero-word]', { autoAlpha: 1, yPercent: 0 });
        return;
      }

      const heroWords = gsap.utils.toArray<HTMLElement>('[data-hero-word]');
      if (heroWords.length) gsap.set(heroWords, { autoAlpha: 0, yPercent: 115 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (heroWords.length) {
        intro.to(heroWords, { autoAlpha: 1, duration: 1.1, stagger: 0.09, yPercent: 0 });
      }
      intro
        .from(
          '[data-hero-eyebrow], [data-hero-intro], [data-scroll-cue]',
          { autoAlpha: 0, duration: 0.7, stagger: 0.08, y: 24 },
          heroWords.length ? '-=0.55' : '0'
        )
        .from(
          '[data-hero-orbit]',
          { autoAlpha: 0, duration: 1.3, ease: 'elastic.out(1, 0.7)', scale: 0.5 },
          '-=0.8'
        );

      const revertBlurReveals = createBlurReveals(root.current);
      const revertScrollTextReveals = createScrollTextReveals(root);
      const revertProjectsToAbout = createProjectsToAboutReveal(root);

      gsap.to('[data-hero-orbit]', {
        ease: 'none',
        rotate: 18,
        scrollTrigger: { end: 'bottom top', scrub: 1.2, start: 'top top', trigger: '[data-hero]' },
        y: -140
      });

      ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => nav?.setAttribute('data-scrolled', 'true'),
        onLeaveBack: () => nav?.removeAttribute('data-scrolled')
      });

      return () => {
        intro.kill();
        nav?.removeAttribute('data-scrolled');
        revertBlurReveals();
        revertProjectsToAbout();
        revertScrollTextReveals();
      };
    },
    { scope: root }
  );
}
