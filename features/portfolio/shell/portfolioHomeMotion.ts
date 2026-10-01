'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import {
  clearProjectReturnIntent,
  hasProjectReturnIntent,
  isCurrentDocumentReload
} from '../projects/projectReturnNavigation';
import { createBlurReveals } from '../shared/motion/blurRevealMotion';
import { SPLIT_TEXT_CHAR_INSET } from '../shared/motion/splitTextSafety';

// Plugins usados pela home. Registrar no módulo mantém o setup fora do ciclo
// de render e permite que todos os hooks abaixo compartilhem a mesma instância.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function createScrollTextReveals(root: RefObject<HTMLElement | null>) {
  // Cada elemento marcado é dividido em caracteres e recebe um trigger
  // independente, útil para textos que entram em momentos diferentes da home.
  const elements = gsap.utils.toArray<HTMLElement>(
    '[data-motion="scroll-text-reveal"]',
    root.current
  );
  if (!elements.length) return () => {};

  const splits = elements.map((element) =>
    SplitText.create(element, {
      aria: 'auto',
      charsClass: 'split-motion-char',
      type: 'chars'
    })
  );

  const animations = splits.map((split) => {
    gsap.set(split.chars, {
      autoAlpha: 0,
      ...SPLIT_TEXT_CHAR_INSET,
      filter: 'blur(0.55px)',
      y: 24
    });

    // A timeline fica vinculada ao intervalo em que o texto atravessa a
    // viewport. toggleActions define o comportamento ao entrar e sair nos
    // dois sentidos; não há scrub neste reveal discreto.
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

export function usePortfolioMotion(
  root: RefObject<HTMLElement | null>,
  initialProjectReturn = false
) {
  useGSAP(
    () => {
      // Tudo é resolvido dentro do root da home para evitar colisões com a
      // página de detalhe quando ambas compartilham seletores de movimento.
      const nav = root.current?.querySelector<HTMLElement>('[data-component="navigation"]');
      const page = root.current;

      if (!page) return;

      window.history.scrollRestoration = 'manual';

      const projectReturnRequested = initialProjectReturn || hasProjectReturnIntent();
      const isReload = !projectReturnRequested && isCurrentDocumentReload();
      const shouldRestoreProjects = projectReturnRequested;
      const hashId = window.location.hash.slice(1);
      const targetId = isReload ? '' : shouldRestoreProjects ? 'projetos' : hashId;
      const scrollTarget = targetId ? document.getElementById(targetId) : null;

      if (shouldRestoreProjects) {
        document.documentElement.dataset.homeScrollTarget = 'projects';
      } else {
        delete document.documentElement.dataset.homeScrollTarget;
      }

      // Recarregar a home sempre invalida a posição que o navegador tentou
      // restaurar. Também removemos o hash para que uma nova recarga não volte
      // silenciosamente para outra seção.
      if (isReload) {
        clearProjectReturnIntent();
        if (window.location.hash) {
          window.history.replaceState(
            window.history.state,
            '',
            `${window.location.pathname}${window.location.search}`
          );
        }
      }

      ScrollTrigger.clearScrollMemory();

      // No retorno de um detalhe, os hooks das seções filhas já montaram os
      // pins quando este layout effect do shell é executado. Alinhamos o alvo
      // imediatamente para que o primeiro paint da home já aconteça em
      // Projetos — passar antes pela posição zero causaria um flash da Hero.
      let anchorFrame = 0;
      if (scrollTarget) {
        const alignScrollTarget = () => {
          ScrollTrigger.refresh();
          window.scrollTo({
            top: Math.max(0, window.scrollY + scrollTarget.getBoundingClientRect().top),
            left: 0,
            behavior: 'instant'
          });
        };

        alignScrollTarget();
        anchorFrame = window.requestAnimationFrame(() => {
          anchorFrame = window.requestAnimationFrame(() => {
            // O segundo frame também absorve o scroll de hash que o roteador
            // pode aplicar depois do commit. A home só é revelada quando o
            // alvo já está definitivamente alinhado.
            alignScrollTarget();
            clearProjectReturnIntent();
            page.removeAttribute('data-project-return-pending');
            delete document.documentElement.dataset.homeScrollTarget;

            if (initialProjectReturn) {
              const cleanUrl = new URL(window.location.href);
              cleanUrl.searchParams.delete('from');
              window.history.replaceState(
                window.history.state,
                '',
                `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`
              );
            }
          });
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        clearProjectReturnIntent();
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        return () => {
          window.cancelAnimationFrame(anchorFrame);
          delete document.documentElement.dataset.homeScrollTarget;
        };
      }

      const revertBlurReveals = createBlurReveals(page);
      const revertScrollTextReveals = createScrollTextReveals(root);

      // Apenas alterna o estado visual da navegação; não cria uma animação
      // longa e por isso não precisa de timeline ou scrub.
      ScrollTrigger.create({
        trigger: page,
        start: 'top -80',
        onEnter: () => nav?.setAttribute('data-state', 'scrolled'),
        onLeaveBack: () => nav?.removeAttribute('data-state')
      });

      return () => {
        window.cancelAnimationFrame(anchorFrame);
        page.removeAttribute('data-project-return-pending');
        delete document.documentElement.dataset.homeScrollTarget;
        nav?.removeAttribute('data-state');
        revertBlurReveals();
        revertScrollTextReveals();
      };
    },
    { scope: root }
  );
}
