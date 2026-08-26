'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import {
  createAllHeadingsSplitAnimation,
  createHeadingSplitAnimation,
  useHeadingSplitMotion
} from './headingSplitMotion';

export { createAllHeadingsSplitAnimation, createHeadingSplitAnimation, useHeadingSplitMotion };

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const blurReveal = {
  hidden: { autoAlpha: 0, filter: 'blur(14px)', y: 36 },
  visible: { autoAlpha: 1, duration: 0.9, ease: 'power3.out', filter: 'blur(0px)', y: 0 }
};

function createBlurReveals() {
  const elements = gsap.utils.toArray<HTMLElement>('[data-blur-reveal]');
  if (!elements.length) return;

  gsap.set(elements, blurReveal.hidden);
  ScrollTrigger.batch(elements, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { ...blurReveal.visible, stagger: 0.1 })
  });
}

function createScrollTextReveals() {
  const splits = gsap.utils
    .toArray<HTMLElement>('[data-scroll-text-reveal]')
    .map((element) => SplitText.create(element, { aria: 'auto', type: 'chars' }));

  const animations = splits.map((split) => {
    const pinTarget =
      split.elements[0].closest<HTMLElement>('[data-scroll-text-reveal-stage]') ??
      split.elements[0];

    gsap.set(split.chars, { filter: 'blur(0.55px)', opacity: 0.16 });

    return gsap
      .timeline({
        scrollTrigger: {
          anticipatePin: 1,
          end: () => `+=${Math.max(window.innerHeight * 1.8, split.chars.length * 15)}`,
          invalidateOnRefresh: true,
          pin: pinTarget,
          pinSpacing: true,
          refreshPriority: 2,
          scrub: 0.65,
          start: 'top top',
          trigger: pinTarget
        }
      })
      .to(split.chars, {
        duration: 1,
        ease: 'none',
        filter: 'blur(0px)',
        opacity: 1,
        stagger: { each: 0.018, from: 'start' }
      });
  });

  return () => {
    animations.forEach((animation) => animation.kill());
    splits.forEach((split) => split.revert());
  };
}

function createProjectParallax() {
  const media = gsap.utils.toArray<HTMLElement>('[data-project-visual]');
  const mediaQueries = gsap.matchMedia();

  mediaQueries.add('(min-width: 801px)', () => {
    media.forEach((visual) => {
      const card = visual.closest('[data-project-card]');
      if (!card) return;

      gsap.to(visual, {
        ease: 'none',
        scrollTrigger: { end: 'bottom top', scrub: 1, trigger: card },
        yPercent: -6
      });
    });
  });

  return () => mediaQueries.revert();
}

function createProjectsToAboutReveal(root: RefObject<HTMLElement | null>) {
  const projectsSection = root.current?.querySelector<HTMLElement>('[data-projects-section]');
  const aboutSection = root.current?.querySelector<HTMLElement>('[data-about-section]');
  const aboutItems = gsap.utils.toArray<HTMLElement>('[data-transition-item]', root.current);
  const transition = root.current?.querySelector<HTMLElement>('[data-projects-about-transition]');
  const pixels = gsap.utils.toArray<HTMLElement>('[data-projects-about-pixel]', root.current);

  if (!projectsSection || !aboutSection || !aboutItems.length || !transition || !pixels.length) {
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
    .to(
      projectsSection,
      {
        filter: 'blur(5px)',
        scale: 0.985,
        transformOrigin: 'center top',
        yPercent: -5,
        ease: 'none',
        duration: 1
      },
      0
    )
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
      if (heroWords.length) {
        gsap.set(heroWords, { autoAlpha: 0, yPercent: 115 });
      }

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

      createBlurReveals();
      const revertScrollTextReveals = createScrollTextReveals();
      const revertParallax = createProjectParallax();
      const revertProjectsToAbout = createProjectsToAboutReveal(root);
      const revertHeadings = createAllHeadingsSplitAnimation(root.current);

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
        revertParallax();
        revertProjectsToAbout();
        revertScrollTextReveals();
        revertHeadings();
      };
    },
    { scope: root }
  );
}

function createDetailFramesStoryPin(root: RefObject<HTMLElement | null>) {
  const stage = root.current?.querySelector<HTMLElement>('[data-story-stage]');
  if (!stage) return () => {};

  const mm = gsap.matchMedia();

  mm.add('(min-width: 801px)', () => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-frame-card]', stage);
    const behindSection = stage.querySelector<HTMLElement>('[data-behind-section]');
    const behindItems = stage.querySelectorAll<HTMLElement>('[data-behind-item]');

    if (!cards.length || !behindSection) return;

    gsap.set(behindSection, { autoAlpha: 0, yPercent: 40 });
    if (behindItems.length) {
      gsap.set(behindItems, { autoAlpha: 0, y: 24 });
    }

    const targetSize = Math.min(
      265,
      (typeof window !== 'undefined' ? window.innerWidth : 1200) * 0.22
    );

    const tl = gsap.timeline({
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

    // 1. Fase de Morphismo e Agrupamento dos Cards à Esquerda (Centralizados verticalmente)
    tl.addLabel('morph-cards', 0)
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
      );

    // 2. Fase de Entrada da Seção "Por trás da tela" (Centralizada verticalmente ao subir)
    tl.addLabel('reveal-behind', 0.85).to(
      behindSection,
      {
        autoAlpha: 1,
        yPercent: -50,
        ease: 'power2.out',
        duration: 1.1
      },
      'reveal-behind'
    );

    // 3. Fase de Entrada Escalonada dos Itens de Detalhe
    if (behindItems.length) {
      tl.addLabel('reveal-details', 1.25).to(
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

    // 4. Retenção / Pausa de Leitura antes do Unpin
    tl.addLabel('hold-pin', 2.1).to({}, { duration: 0.4 }, 'hold-pin');
  });

  return () => mm.revert();
}

export function useDetailMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (typeof window !== 'undefined') {
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh();
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.from(
        '[data-detail-intro] > *, [data-detail-visual]',
        { autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, y: 35 }
      );

      createBlurReveals();
      const revertStoryPin = createDetailFramesStoryPin(root);
      const revertHeadings = createAllHeadingsSplitAnimation(root.current);

      gsap.to('[data-detail-visual] [data-project-visual]', {
        ease: 'none',
        scrollTrigger: {
          end: 'bottom top',
          scrub: 1,
          start: 'top top',
          trigger: '[data-detail-hero]'
        },
        yPercent: -5
      });

      return () => {
        intro.kill();
        revertHeadings();
        revertStoryPin();
      };
    },
    { scope: root }
  );
}
