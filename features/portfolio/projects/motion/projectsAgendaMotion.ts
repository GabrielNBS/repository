'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP);

export function useProjectsAgendaMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('[data-agenda-enter]', {
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
