'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function scaleToMini(element: HTMLElement, frame: HTMLElement) {
  const bounds = element.getBoundingClientRect();
  const frameBounds = frame.getBoundingClientRect();
  return Math.min(frameBounds.width / bounds.width, frameBounds.height / bounds.height) * 0.96;
}

function centerOffset(element: HTMLElement) {
  const bounds = element.getBoundingClientRect();
  return {
    x: window.innerWidth / 2 - (bounds.left + bounds.width / 2),
    y: window.innerHeight / 2 - (bounds.top + bounds.height / 2)
  };
}

export function useHeroMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = root.current;

      if (!section) return;

      const select = gsap.utils.selector(section);
      const loader = section.querySelector<HTMLElement>('[data-motion="hero-loader"]');
      const loaderIndex = section.querySelector<HTMLElement>('[data-motion="hero-loader-index"]');
      const stage = section.querySelector<HTMLElement>('[data-motion="hero-stage"]');
      const cardStage = section.querySelector<HTMLElement>('[data-motion="hero-card-stage"]');
      const manifestoRoot = section.querySelector<HTMLElement>('[data-manifesto-embedded="true"]');
      const manifestoStage = section.querySelector<HTMLElement>('[data-manifesto-stage]');
      const nameDrift = section.querySelector<HTMLElement>('[data-motion="hero-name-drift"]');
      const cardDrift = section.querySelector<HTMLElement>('[data-motion="hero-card-drift"]');
      const metaDrift = section.querySelector<HTMLElement>('[data-motion="hero-meta-drift"]');
      const leftRoleDrift = section.querySelector<HTMLElement>(
        '[data-motion="hero-left-role-drift"]'
      );
      const rightRoleDrift = section.querySelector<HTMLElement>(
        '[data-motion="hero-right-role-drift"]'
      );
      const footerDrift = section.querySelector<HTMLElement>('[data-motion="hero-footer-drift"]');

      if (
        !loader ||
        !loaderIndex ||
        !stage ||
        !cardStage ||
        !manifestoRoot ||
        !manifestoStage ||
        !nameDrift ||
        !cardDrift ||
        !metaDrift ||
        !leftRoleDrift ||
        !rightRoleDrift ||
        !footerDrift
      ) {
        return;
      }

      const loaderLetters = select('[data-motion="loader-letter"]');
      const heroLetters = select('[data-motion="hero-letter"]');
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

        gsap.set([loaderLetters, heroLetters], {
          transformPerspective: 1200,
          transformOrigin: '50% 50% -20px'
        });
        gsap.set(heroLetters, { autoAlpha: 0, rotationX: -94, yPercent: 40 });
        gsap.set([metaDrift, cardDrift, leftRoleDrift, rightRoleDrift, footerDrift], {
          autoAlpha: 0
        });

        intro
          .fromTo(
            loaderLetters,
            {
              autoAlpha: 0,
              rotationX: -110,
              rotationY: (index) => (index % 2 ? -18 : 18),
              y: () => gsap.utils.random(-120, 120),
              x: () => gsap.utils.random(-80, 80)
            },
            {
              autoAlpha: 1,
              rotationX: 0,
              rotationY: 0,
              y: 0,
              x: 0,
              duration: 0.72,
              stagger: { each: 0.028, from: 'random' }
            }
          )
          .to(loaderIndex, { textContent: '100', duration: 0.55, snap: { textContent: 1 } }, 0.2)
          .to(
            loaderLetters,
            {
              rotationX: 96,
              rotationY: (index) => (index % 2 ? -34 : 34),
              y: (index) => (index % 2 ? -90 : 90),
              x: () => gsap.utils.random(-210, 210),
              autoAlpha: 0,
              duration: 0.62,
              stagger: { each: 0.022, from: 'center' }
            },
            '+=0.16'
          )
          .to(loader, { autoAlpha: 0, duration: 0.48, ease: 'power2.inOut' }, '<0.18')
          .to(
            heroLetters,
            {
              autoAlpha: 1,
              rotationX: 0,
              yPercent: 0,
              duration: 0.9,
              stagger: { each: 0.026, from: 'random' }
            },
            '<0.1'
          )
          .to(metaDrift, { autoAlpha: 1, y: 0, duration: 0.45 }, '<0.16')
          .to(cardDrift, { autoAlpha: 1, y: 0, duration: 0.64 }, '<0.08')
          .to(
            [leftRoleDrift, rightRoleDrift],
            { autoAlpha: 1, duration: 0.48, stagger: 0.08 },
            '<0.12'
          )
          .to(footerDrift, { autoAlpha: 1, duration: 0.42 }, '<0.1')
          .set(loader, { display: 'none' })
          .add(() => ScrollTrigger.refresh());
      });

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(loader, { display: 'none' });
      });

      media.add('(max-width: 800px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(manifestoRoot, {
          xPercent: -50,
          yPercent: -50,
          scale: () => scaleToMini(manifestoRoot, cardStage)
        });
      });

      media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(manifestoRoot, {
          xPercent: -50,
          yPercent: -50,
          scale: () => scaleToMini(manifestoRoot, cardStage)
        });

        const heroDistance = () => Math.round(window.innerHeight * 2.2);
        const manifestoDistance = () => Math.max(window.innerHeight * 3.35, 2500);

        const pinTrigger = ScrollTrigger.create({
          id: 'hero-portal-pin',
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(heroDistance() + manifestoDistance())}`,
          pin: section,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1
        });

        const heroTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'hero-portal-reveal',
            trigger: section.parentElement ?? section,
            start: 'top top',
            end: () => `+=${heroDistance()}`,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1
          }
        });

        heroTimeline
          .addLabel('drift', 0)
          .to(nameDrift, { yPercent: -32, scale: 0.78, autoAlpha: 0.16, duration: 0.36 }, 'drift')
          .to(metaDrift, { y: -28, autoAlpha: 0, duration: 0.18 }, 'drift+=0.04')
          .to(leftRoleDrift, { xPercent: -24, autoAlpha: 0, duration: 0.2 }, 'drift+=0.08')
          .to(rightRoleDrift, { xPercent: 24, autoAlpha: 0, duration: 0.2 }, 'drift+=0.08')
          .to(footerDrift, { y: 24, autoAlpha: 0, duration: 0.18 }, 'drift+=0.12')
          .to(cardDrift, { yPercent: -8, duration: 0.28 }, 'drift')
          .addLabel('expand', 0.38)
          .to(
            cardStage,
            {
              x: () => centerOffset(cardStage).x,
              y: () => centerOffset(cardStage).y,
              duration: 0.56
            },
            'expand'
          )
          .to(manifestoRoot, { scale: 1, duration: 0.56 }, 'expand')
          .to(manifestoStage, { borderRadius: 0, boxShadow: 'none', duration: 0.4 }, 'expand+=0.08')
          .to(stage, { backgroundColor: 'var(--color-paper)', duration: 0.26 }, 'expand+=0.22')
          .addLabel('handoff', 1.04)
          .to(nameDrift, { autoAlpha: 0, duration: 0.08 }, 'handoff')
          .to(stage, { backgroundColor: 'var(--color-paper)', duration: 0.08 }, 'handoff');

        return () => {
          heroTimeline.kill();
          pinTrigger.kill();
        };
      });

      return () => media.revert();
    },
    { scope: root }
  );
}
