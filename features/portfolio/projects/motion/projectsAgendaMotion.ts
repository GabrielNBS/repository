'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(useGSAP, Observer);

export function useProjectsAgendaMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const elements = gsap.utils.toArray<HTMLElement>(
        '[data-motion~="agenda-enter"]',
        root.current
      );
      if (!elements.length) return;

      gsap.from(elements, {
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.075,
        y: 22
      });
    },
    { scope: root }
  );
}

export function useProjectElastic(root: RefObject<HTMLElement | null>) {
  useGSAP(
    (_, contextSafe) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!root.current) return;

      const safeContext = contextSafe!;

      const cards = Array.from(
        root.current.querySelectorAll<HTMLElement>('[data-motion~="project-elastic"]')
      );

      const observers = cards.map((card) =>
        Observer.create({
          target: card,
          type: 'pointer',

          onHover: safeContext(() => {
            gsap.to(card, {
              y: -16,
              duration: 1,
              ease: 'elastic.out(1, 0.3)',
              overwrite: 'auto'
            });
          }),

          onHoverEnd: safeContext(() => {
            gsap.to(card, {
              y: 0,
              duration: 1,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          })
        })
      );

      return () => {
        observers.forEach((observer) => observer.kill());
        gsap.killTweensOf(cards);
      };
    },
    { scope: root }
  );
}
