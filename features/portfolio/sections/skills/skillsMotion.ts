'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useRef, type RefObject } from 'react';
import styles from './SkillsSection.module.css';

type SkillsMotionRefs = {
  section: RefObject<HTMLElement | null>;
  shell: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLDivElement | null>;
  viewport: RefObject<HTMLDivElement | null>;
  cards: RefObject<Array<HTMLElement | null>>;
  nav: RefObject<Array<HTMLButtonElement | null>>;
};

// ScrollTrigger controla o deslocamento horizontal do track; os demais tweens
// continuam no core do GSAP e são criados dentro do useGSAP.
gsap.registerPlugin(ScrollTrigger);

export function useSkillsMotion({
  section,
  shell,
  track,
  viewport,
  cards: cardsRef,
  nav: navRef
}: SkillsMotionRefs) {
  const navigateToIndexRef = useRef<(index: number) => void>(() => undefined);

  useGSAP(
    () => {
      const sectionElement = section.current;
      const shellElement = shell.current;
      const trackElement = track.current;
      const viewportElement = viewport.current;
      const headingElement = sectionElement?.querySelector<HTMLElement>('#skills-title');
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const navItems = navRef.current.filter(Boolean) as HTMLButtonElement[];

      if (
        !sectionElement ||
        !shellElement ||
        !trackElement ||
        !viewportElement ||
        !headingElement ||
        cards.length < 2
      ) {
        return undefined;
      }

      // Os vídeos acompanham o card ativo, mas não participam do cálculo de
      // posição do track. Em reduced motion eles ficam pausados.
      const videos = Array.from(
        sectionElement.querySelectorAll<HTMLVideoElement>(`.${styles.cardVideo}`)
      );

      let step = 0;
      let activeIndex = -1;
      let dragStartX = 0;
      let dragStartPosition = 0;
      let position = 0;
      let maxTranslate = 0;
      let pinDistance = 0;
      let dragging = false;
      const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const lastCardBreath = 0.14;
      const switchThreshold = 0.6;

      // Mantém a mídia do card ativo sincronizada com a navegação e com a
      // preferência de movimento reduzido do usuário.
      const syncVideoMotion = () => {
        videos.forEach((video, index) => {
          const isActive = index === activeIndex;

          if (reduceMotionQuery.matches || !isActive) {
            video.pause();
            if (!isActive && video.readyState > 0) video.currentTime = 0;
            return;
          }

          void video.play().catch(() => undefined);
        });
      };

      // Todas as leituras de layout ficam concentradas aqui. `pinDistance`
      // transforma a largura excedente do track em distância vertical de
      // scroll e acrescenta um respiro para o último card.
      const measure = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(trackElement).gap) || 0;
        step = cardWidth + gap;
        maxTranslate = Math.max(0, trackElement.scrollWidth - viewportElement.clientWidth);
        pinDistance = maxTranslate + window.innerHeight * lastCardBreath;
        sectionElement.style.setProperty('--skills-scroll-distance', `${pinDistance}px`);
      };

      // Alterna o conteúdo expandido do card, o estado acessível da navegação
      // e a reprodução dos vídeos. A altura é o único valor de layout animado
      // porque o copy precisa revelar seu conteúdo real.
      const setActive = (nextIndex: number, animate = true) => {
        const nextActiveIndex = Math.max(0, Math.min(cards.length - 1, nextIndex));
        const indexChanged = nextActiveIndex !== activeIndex;
        activeIndex = nextActiveIndex;
        const isMobile = window.matchMedia('(max-width: 800px)').matches;

        if (!indexChanged && !isMobile) return;

        const duration = animate ? 0.48 : 0;
        const ease = 'power3.out';

        cards.forEach((card, index) => {
          const copy = card.querySelector<HTMLElement>(`.${styles.cardCopy}`);
          const description = card.querySelector<HTMLElement>(`.${styles.cardDescription}`);
          if (!copy || !description) return;

          const isActive = index === activeIndex;
          card.classList.toggle(styles.cardActive, isActive);
          navItems[index]?.classList.toggle(styles.navActive, isActive);

          if (isMobile) {
            gsap.set(copy, { clearProps: 'height' });
            gsap.set(description, { opacity: 1, y: 0 });
            return;
          }

          const collapsedHeight = `${Math.max(70, parseFloat(getComputedStyle(copy).fontSize) * 3.8)}px`;
          gsap.killTweensOf([copy, description]);
          gsap.to(copy, {
            height: isActive ? copy.scrollHeight : collapsedHeight,
            duration,
            ease,
            overwrite: true
          });
          gsap.to(description, {
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 8,
            delay: isActive ? 0.02 : 0,
            duration: animate ? 0.42 : 0,
            ease,
            overwrite: true
          });
        });

        navItems.forEach((item, index) => {
          gsap.to(item, {
            y: index < activeIndex ? -24 : index > activeIndex ? 24 : 0,
            duration,
            ease,
            overwrite: true
          });
          item.setAttribute('aria-current', index === activeIndex ? 'step' : 'false');
        });

        syncVideoMotion();
      };

      // Converte a posição horizontal em índice de card. O clamp impede que
      // drag, resize ou ScrollTrigger levem o track para fora dos limites.
      const setPosition = (nextPosition: number, immediate = false) => {
        position = Math.max(0, Math.min(maxTranslate, nextPosition));
        const trackProgress = maxTranslate ? position / maxTranslate : 0;
        const nextIndex = Math.max(
          0,
          Math.min(
            cards.length - 1,
            Math.floor(trackProgress * (cards.length - 1) + (1 - switchThreshold))
          )
        );
        const indexChanged = nextIndex !== activeIndex;

        gsap.set(trackElement, { x: -position });

        if (indexChanged || immediate) setActive(nextIndex, !immediate);
      };

      // Navegação manual: no mobile usa scroll nativo; no desktop converte o
      // índice em uma posição vertical dentro do trecho pinado.
      const scrollToIndex = (index: number) => {
        if (window.matchMedia('(max-width: 800px)').matches) {
          cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setActive(index, true);
          return;
        }

        const scrollTrigger = ScrollTrigger.getById('skills-horizontal-track');
        const start = scrollTrigger?.start ?? sectionElement.offsetTop;
        const end = scrollTrigger?.end ?? start + pinDistance;
        const target = start + (end - start) * (index / (cards.length - 1));
        window.scrollTo({ top: target, behavior: 'smooth' });
      };

      measure();

      // Trigger standalone porque o track é atualizado manualmente no onUpdate
      // e também pode ser controlado pelo drag do ponteiro.
      const scrollTrigger = ScrollTrigger.create({
        id: 'skills-horizontal-track',
        // O H2 é a âncora semântica da cena: o pin começa quando o título
        // chega ao centro, deixando o carrossel ligeiramente abaixo dele.
        trigger: headingElement,
        start: 'center center',
        end: () => `+=${pinDistance}`,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          measure();
          setPosition(Math.min(maxTranslate, self.progress * pinDistance), true);
        },
        onUpdate: (self) => {
          if (!dragging && !window.matchMedia('(max-width: 800px)').matches) {
            setPosition(Math.min(maxTranslate, self.progress * pinDistance));
          }
        }
      });

      // Recalcula medidas após resize e restaura o modo correto de track para
      // desktop/mobile antes de pedir um refresh global ao ScrollTrigger.
      const onResize = () => {
        measure();
        if (window.matchMedia('(max-width: 800px)').matches) {
          gsap.set(trackElement, { clearProps: 'transform' });
          setActive(activeIndex, false);
        } else {
          setPosition(Math.min(maxTranslate, scrollTrigger.progress * pinDistance), true);
        }
        ScrollTrigger.refresh();
      };

      // Drag horizontal opcional no desktop. O clique nos botões de navegação
      // é ignorado para que cada interação mantenha uma única responsabilidade.
      const onPointerDown = (event: PointerEvent) => {
        if (window.matchMedia('(max-width: 800px)').matches || event.button !== 0) return;
        if (event.target instanceof Element && event.target.closest(`.${styles.navButton}`)) return;
        dragging = true;
        dragStartX = event.clientX;
        dragStartPosition = position;
        shellElement.classList.add(styles.isDragging);
        shellElement.setPointerCapture(event.pointerId);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!dragging || !step) return;
        const nextPosition = dragStartPosition - (event.clientX - dragStartX);
        setPosition(nextPosition, true);
      };

      const onPointerUp = () => {
        if (!dragging) return;
        dragging = false;
        shellElement.classList.remove(styles.isDragging);
        const nearestIndex = maxTranslate
          ? Math.round((position / maxTranslate) * (cards.length - 1))
          : 0;
        scrollToIndex(nearestIndex);
      };

      navigateToIndexRef.current = scrollToIndex;
      shellElement.addEventListener('pointerdown', onPointerDown);
      shellElement.addEventListener('pointermove', onPointerMove);
      shellElement.addEventListener('pointerup', onPointerUp);
      shellElement.addEventListener('pointercancel', onPointerUp);
      window.addEventListener('resize', onResize);
      reduceMotionQuery.addEventListener('change', syncVideoMotion);

      setPosition(0, true);

      return () => {
        navigateToIndexRef.current = () => undefined;
        shellElement.removeEventListener('pointerdown', onPointerDown);
        shellElement.removeEventListener('pointermove', onPointerMove);
        shellElement.removeEventListener('pointerup', onPointerUp);
        shellElement.removeEventListener('pointercancel', onPointerUp);
        window.removeEventListener('resize', onResize);
        reduceMotionQuery.removeEventListener('change', syncVideoMotion);
        scrollTrigger.kill();
        sectionElement.style.removeProperty('--skills-scroll-distance');
      };
    },
    { scope: section, dependencies: [] }
  );

  return useCallback((index: number) => {
    navigateToIndexRef.current(index);
  }, []);
}
