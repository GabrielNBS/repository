'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { Observer } from 'gsap/Observer';

// Registro global dos plugins usados neste módulo. O registro acontece fora
// dos componentes para não se repetir em cada renderização do React.
gsap.registerPlugin(useGSAP, Observer);

export function useProjectsAgendaMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Entrada inicial do cabeçalho, cards e arquivo. O seletor é escopado
      // pelo root passado ao useGSAP para não atingir outras seções.
      const elements = gsap.utils.toArray<HTMLElement>(
        '[data-motion~="agenda-enter"]',
        root.current
      );
      if (!elements.length) return;

      // `from` aplica o estado invisível imediatamente e retorna os elementos
      // ao estado definido pelo CSS quando a animação termina.
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

      // Cada card tem seu próprio Observer para que o hover não interfira nos
      // demais cards. contextSafe mantém os tweens criados pelos callbacks
      // dentro do ciclo de cleanup do useGSAP.
      const observers = cards.map((card) =>
        Observer.create({
          target: card,
          type: 'pointer',

          // Sobe o card com uma curva elástica ao entrar o ponteiro.
          onHover: safeContext(() => {
            gsap.to(card, {
              y: -16,
              duration: 1,
              ease: 'elastic.out(1, 0.3)',
              overwrite: 'auto'
            });
          }),

          // Retorna o card à posição natural ao sair o ponteiro.
          onHoverEnd: safeContext(() => {
            gsap.to(card, {
              y: 0,
              duration: 1,
              ease: 'elastic.out(1, 0.3)',
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
