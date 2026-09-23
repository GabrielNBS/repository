'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useTransitionCascadeMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const pieces = gsap.utils.toArray<HTMLElement>('[data-transition-piece]', section);
      const balls = gsap.utils.toArray<HTMLElement>('[data-transition-ball]', section);
      const fragments = gsap.utils.toArray<HTMLElement>('[data-transition-fragment]', section);
      const supports = gsap.utils.toArray<HTMLElement>('[data-transition-support]', section);
      const route = section.querySelector<SVGPathElement>('[data-transition-route]');
      const atmosphere = section.querySelector<HTMLElement>('[data-transition-atmosphere]');

      if (
        !pieces.length ||
        !balls.length ||
        !fragments.length ||
        !supports.length ||
        !route ||
        !atmosphere
      ) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 801px)',
          motion: '(prefers-reduced-motion: no-preference)'
        },
        (mediaContext) => {
          const { desktop, motion } = mediaContext.conditions ?? {};
          if (!motion) return;

          const routeLength = route.getTotalLength();
          const depth = (target: Element) =>
            Number((target as HTMLElement).dataset.transitionDepth ?? 0.5);
          const travel = desktop ? 210 : 116;
          const lateral = desktop ? 48 : 25;

          gsap.set(route, {
            strokeDasharray: `${routeLength} ${routeLength}`,
            strokeDashoffset: routeLength
          });
          gsap.set(pieces, { force3D: true, transformOrigin: '50% 50%' });

          // Uma única timeline governa a cena inteira: primeiro as bolas
          // chegam, depois a maior parece se abrir e liberar os recortes. Na
          // segunda metade, cada profundidade passa a responder em velocidade
          // própria para o parallax ficar evidente sem perder a composição.
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              id: 'hero-manifesto-cascade',
              trigger: section,
              start: 'top 96%',
              end: 'bottom 4%',
              scrub: 1.05,
              invalidateOnRefresh: true,
              refreshPriority: 1
            }
          });

          timeline
            .addLabel('gather', 0)
            .fromTo(
              atmosphere,
              { autoAlpha: 0.34, scale: 0.95, yPercent: 9 },
              { autoAlpha: 0.82, scale: 1.1, yPercent: -14, duration: 1.7 },
              'gather'
            )
            .to(route, { strokeDashoffset: 0, duration: 1.28 }, 'gather')
            .from(
              balls,
              {
                autoAlpha: 0,
                duration: 0.38,
                ease: 'power3.out',
                rotation: (index) => (index % 2 === 0 ? -22 : 19),
                scale: 0.5,
                stagger: 0.075,
                y: (index) => -128 - index * 34
              },
              'gather'
            )
            .addLabel('unfold', 0.28)
            .from(
              fragments,
              {
                autoAlpha: 0,
                duration: 0.5,
                ease: 'back.out(1.45)',
                rotation: (index) => (index % 2 === 0 ? -36 : 34),
                scale: 0.12,
                stagger: { amount: 0.28, from: 'start' },
                x: (index) => (index % 2 === 0 ? 92 : -84),
                y: (index) => -142 - index * 10
              },
              'unfold'
            )
            .from(
              supports,
              {
                autoAlpha: 0,
                duration: 0.34,
                ease: 'power2.out',
                rotation: (index) => (index % 2 === 0 ? -24 : 26),
                scale: 0.35,
                stagger: 0.055,
                y: -76
              },
              'unfold+=0.16'
            )
            .addLabel('separate', 0.7)
            .to(
              balls,
              {
                duration: 1,
                rotation: (index) => (index % 2 === 0 ? '+=24' : '-=22'),
                scale: (_, target) => 0.95 + depth(target) * 0.12,
                x: (index, target) => (index % 2 === 0 ? -1 : 1) * lateral * depth(target),
                y: (_, target) => travel * depth(target),
                z: (_, target) => 95 * depth(target)
              },
              'separate'
            )
            .to(
              fragments,
              {
                duration: 1,
                rotation: (index) => (index % 2 === 0 ? '+=18' : '-=16'),
                scale: (_, target) => 0.96 + depth(target) * 0.1,
                x: (index, target) =>
                  (index % 2 === 0 ? -1 : 1) * lateral * 1.35 * depth(target),
                y: (_, target) => travel * 1.12 * depth(target),
                z: (_, target) => 120 * depth(target)
              },
              'separate'
            )
            .to(
              supports,
              {
                duration: 1,
                rotation: (index) => (index % 2 === 0 ? '+=28' : '-=25'),
                x: (index, target) =>
                  (index % 2 === 0 ? 1 : -1) * lateral * 1.55 * depth(target),
                y: (_, target) => travel * 1.25 * depth(target),
                z: (_, target) => 145 * depth(target)
              },
              'separate'
            )
            .to(
              route,
              {
                duration: 1,
                scaleY: 1.07,
                transformOrigin: '50% 50%',
                x: desktop ? -22 : -10,
                y: desktop ? 92 : 48
              },
              'separate'
            );

          return () => timeline.kill();
        }
      );

      return () => media.revert();
    },
    { scope: root }
  );
}
