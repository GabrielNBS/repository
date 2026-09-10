'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { createHeadingSplitAnimation } from '../shared/motion/headingSplitMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Mantém o split de títulos independente do ScrollSplitCard.
 * Assim, a seção de decisões segue o fluxo normal e não herda nenhum pin.
 */
function createDetailHeadingSplits(root: HTMLElement) {
  const headings = gsap.utils.toArray<HTMLElement>('h1, h2', root);
  const cleanups = headings.map((heading) => createHeadingSplitAnimation(heading));

  return () => cleanups.forEach((cleanup) => cleanup());
}

export function useDetailMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;

      // Cada rota começa no topo para que a leitura do case seja previsível.
      const previousScrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return () => {
          window.history.scrollRestoration = previousScrollRestoration;
        };
      }

      // Entrada do conteúdo do hero: apenas transform e opacity para não
      // provocar reflow enquanto o layout editorial é montado.
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.from('[data-detail-intro] > *, [data-detail-visual]', {
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        y: 35
      });

      const revertHeadings = createDetailHeadingSplits(page);

      // O único parallax GSAP fora do componente oficial é o da imagem do
      // hero. O ScrollSplitCard cuida do próprio scroll-driven interaction.
      const visualParallax = gsap.to('[data-detail-visual] [data-project-visual]', {
        ease: 'none',
        scrollTrigger: {
          end: 'bottom top',
          scrub: 1,
          start: 'top top',
          trigger: '[data-detail-hero]'
        },
        yPercent: -5
      });

      // Imagens e fontes podem alterar a altura do card. Um único refresh por
      // frame mantém os cálculos do componente estáveis sem sobrecarregar o
      // thread principal.
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
        window.history.scrollRestoration = previousScrollRestoration;
        images.forEach((image) => image.removeEventListener('load', refresh));
        visualParallax.kill();
        intro.kill();
        revertHeadings();
      };
    },
    { scope: root }
  );
}
