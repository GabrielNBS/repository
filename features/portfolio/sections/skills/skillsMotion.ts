'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import styles from './SkillsSection.module.css';

type SkillsMotionRefs = {
  section: RefObject<HTMLElement | null>;
  shell: RefObject<HTMLDivElement | null>;
  track: RefObject<HTMLDivElement | null>;
  viewport: RefObject<HTMLDivElement | null>;
  cards: RefObject<Array<HTMLElement | null>>;
  nav: RefObject<Array<HTMLButtonElement | null>>;
  nearViewport: boolean;
};

// ScrollTrigger sincroniza o deslocamento horizontal com o scroll da página.
gsap.registerPlugin(ScrollTrigger);

export function useSkillsMotion({
  section,
  shell,
  track,
  viewport,
  cards: cardsRef,
  nav: navRef,
  nearViewport
}: SkillsMotionRefs) {
  const navigateToIndexRef = useRef<(index: number) => void>(() => undefined);
  const [layoutMode, setLayoutMode] = useState('');

  useEffect(() => {
    const compact = window.matchMedia('(max-width: 800px), (pointer: coarse)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMode = () => setLayoutMode(`${compact.matches}:${reduced.matches}`);
    updateMode();
    compact.addEventListener('change', updateMode);
    reduced.addEventListener('change', updateMode);
    return () => {
      compact.removeEventListener('change', updateMode);
      reduced.removeEventListener('change', updateMode);
    };
  }, []);

  const ready = Boolean(layoutMode) && (!layoutMode.startsWith('true:') || nearViewport);

  useGSAP(
    () => {
      // Wait for media detection so setup does not run twice on hydration.
      // Desktop pins still initialize immediately to preserve scroll geometry.
      if (!ready) return;
      const sectionElement = section.current;
      const shellElement = shell.current;
      const trackElement = track.current;
      const viewportElement = viewport.current;
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const navItems = navRef.current.filter(Boolean) as HTMLButtonElement[];

      if (
        !sectionElement ||
        !shellElement ||
        !trackElement ||
        !viewportElement ||
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
      let firstCardHoldDistance = 0;
      let dragging = false;
      let sectionInView = false;
      const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const compactQuery = window.matchMedia('(max-width: 800px), (pointer: coarse)');
      const switchThreshold = 0.6;
      const firstCardReadingBreath = 0.34;
      const lastCardBreath = 0.14;

      // A altura do portal depende do conteúdo completo, nunca dos tweens do copy.
      let portalWidth = -1;
      const measurePortal = () => {
        const width = viewportElement.clientWidth;
        if (width === portalWidth) return;
        portalWidth = width;
        const stage = viewportElement.parentElement;
        if (!stage) return;
        const stageStyles = getComputedStyle(stage);
        const bleed = parseFloat(stageStyles.paddingTop) + parseFloat(stageStyles.paddingBottom);
        const height = Math.max(
          ...cards.map((card) => {
            const visual = card.querySelector<HTMLElement>(`.${styles.cardVisual}`);
            const title = card.querySelector<HTMLElement>(`.${styles.cardTitle}`);
            const description = card.querySelector<HTMLElement>(`.${styles.cardDescription}`);
            if (!visual || !title || !description) return card.offsetHeight;
            const copyHeight =
              title.offsetHeight +
              description.offsetHeight +
              parseFloat(getComputedStyle(description).marginTop) +
              48;
            return visual.offsetHeight + copyHeight;
          })
        );
        sectionElement.style.setProperty('--skills-portal-height', `${height + bleed}px`);
      };
      measurePortal();
      const portalObserver = new ResizeObserver(measurePortal);
      portalObserver.observe(viewportElement);
      const clearPortal = () => {
        portalObserver.disconnect();
        sectionElement.style.removeProperty('--skills-portal-height');
      };

      // Mantém a mídia do card ativo sincronizada com a navegação e com a
      // preferência de movimento reduzido do usuário.
      const syncVideoMotion = () => {
        videos.forEach((video, index) => {
          const isActive = index === activeIndex;

          if (reduceMotionQuery.matches || document.documentElement.dataset.videosPaused === 'true' || !sectionInView || !isActive) {
            video.pause();
            // O frame de preview preserva o esboço nos cards fora de destaque.
            if (!isActive && video.readyState > 0 && video.currentTime !== 1) {
              video.currentTime = 1;
            }
            return;
          }

          if (!video.getAttribute('src') && video.dataset.src) {
            video.src = video.dataset.src;
          }
          void video.play().catch(() => undefined);
        });
      };

      const markVideoReady = (event: Event) => {
        const video = event.currentTarget as HTMLVideoElement;
        video.dataset.ready = 'true';
      };
      const restoreVideoPoster = (event: Event) => {
        const video = event.currentTarget as HTMLVideoElement;
        delete video.dataset.ready;
      };
      videos.forEach((video) => {
        video.addEventListener('loadeddata', syncVideoMotion);
        video.addEventListener('playing', markVideoReady);
        video.addEventListener('error', restoreVideoPoster);
      });
      const clearVideos = () => {
        document.removeEventListener('portfolio-video-resume', syncVideoMotion);
        videos.forEach((video) => {
          video.removeEventListener('loadeddata', syncVideoMotion);
          video.removeEventListener('playing', markVideoReady);
          video.removeEventListener('error', restoreVideoPoster);
          video.pause();
        });
      };
      document.addEventListener('portfolio-video-resume', syncVideoMotion);

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          sectionInView = entry.isIntersecting;
          syncVideoMotion();
        },
        { threshold: 0.15 }
      );
      visibilityObserver.observe(sectionElement);

      // Reserva distância de scroll e tempo de leitura no primeiro e último card.
      const measure = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(trackElement).gap) || 0;
        step = cardWidth + gap;
        const viewportInset = parseFloat(getComputedStyle(viewportElement).paddingLeft) || 0;
        maxTranslate = Math.max(
          0,
          trackElement.scrollWidth + viewportInset - viewportElement.clientWidth
        );
        firstCardHoldDistance = window.innerHeight * firstCardReadingBreath;
        pinDistance = maxTranslate + firstCardHoldDistance + window.innerHeight * lastCardBreath;
        sectionElement.style.setProperty('--skills-scroll-distance', `${pinDistance}px`);
      };

      const progressToPosition = (progress: number) =>
        Math.max(0, progress * pinDistance - firstCardHoldDistance);

      // Alterna o conteúdo expandido do card, o estado acessível da navegação
      // e a reprodução dos vídeos. A altura é o único valor de layout animado
      // porque o copy precisa revelar seu conteúdo real.
      const setActive = (nextIndex: number, animate = true) => {
        const nextActiveIndex = Math.max(0, Math.min(cards.length - 1, nextIndex));
        const indexChanged = nextActiveIndex !== activeIndex;
        activeIndex = nextActiveIndex;
        if (!indexChanged) return;

        const shouldAnimate = animate && !reduceMotionQuery.matches && !compactQuery.matches;
        const duration = shouldAnimate ? 0.48 : 0;
        const ease = 'power3.out';

        cards.forEach((card, index) => {
          const copy = card.querySelector<HTMLElement>(`.${styles.cardCopy}`);
          const description = card.querySelector<HTMLElement>(`.${styles.cardDescription}`);
          if (!copy || !description) return;

          const isActive = index === activeIndex;
          card.classList.toggle(styles.cardActive, isActive);
          navItems[index]?.classList.toggle(styles.navActive, isActive);

          if (compactQuery.matches) {
            gsap.killTweensOf([copy, description]);
            gsap.set(copy, { clearProps: 'height' });
            gsap.set(description, { clearProps: 'opacity,transform' });
            gsap.set(card, { clearProps: '--card-divider-progress' });
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
            duration: shouldAnimate ? 0.42 : 0,
            ease,
            overwrite: true
          });

          if (reduceMotionQuery.matches) {
            gsap.set(card, { clearProps: '--card-divider-progress' });
            return;
          }

          gsap.to(card, {
            '--card-divider-progress': isActive ? 1 : 0,
            delay: isActive ? 0.08 : 0,
            duration: shouldAnimate ? 0.38 : 0,
            ease,
            overwrite: 'auto'
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

        const activeVideo = videos[activeIndex];
        if (activeVideo?.readyState > 0) activeVideo.currentTime = 0;
        syncVideoMotion();
      };

      const getClosestCardIndex = () => {
        const viewportBounds = viewportElement.getBoundingClientRect();
        const viewportCenter = viewportBounds.left + viewportBounds.width / 2;

        return cards.reduce((closestIndex, card, index) => {
          const bounds = card.getBoundingClientRect();
          const closestBounds = cards[closestIndex].getBoundingClientRect();
          const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);
          const closestDistance = Math.abs(
            closestBounds.left + closestBounds.width / 2 - viewportCenter
          );

          return distance < closestDistance ? index : closestIndex;
        }, 0);
      };

      // No mobile/tablet, o track usa o scroll horizontal nativo. O card mais
      // próximo do foco visual abre seu copy e assume a mídia ativa, enquanto
      // o foco de teclado/toque também pode selecionar um card diretamente.
      if (compactQuery.matches) {
        const onCompactScroll = () => {
          const nextIndex = getClosestCardIndex();
          if (nextIndex !== activeIndex) setActive(nextIndex, !reduceMotionQuery.matches);
        };

        const onCardFocus = (event: FocusEvent) => {
          if (!(event.target instanceof Element)) return;
          const focusedCard = event.target.closest<HTMLElement>(`.${styles.card}`);
          const nextIndex = focusedCard ? cards.indexOf(focusedCard) : -1;
          if (nextIndex < 0) return;

          setActive(nextIndex, !reduceMotionQuery.matches);

          const targetLeft = Math.max(
            0,
            cards[nextIndex].offsetLeft -
              (viewportElement.clientWidth - cards[nextIndex].offsetWidth) / 2
          );
          viewportElement.scrollTo({
            left: targetLeft,
            behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
          });
        };

        const scrollToCompactIndex = (index: number) => {
          const nextIndex = Math.max(0, Math.min(cards.length - 1, index));
          const targetLeft = Math.max(
            0,
            cards[nextIndex].offsetLeft -
              (viewportElement.clientWidth - cards[nextIndex].offsetWidth) / 2
          );
          viewportElement.scrollTo({
            left: targetLeft,
            behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
          });
          setActive(nextIndex);
        };
        navigateToIndexRef.current = scrollToCompactIndex;
        setActive(0, false);
        onCompactScroll();
        viewportElement.addEventListener('scroll', onCompactScroll, { passive: true });
        trackElement.addEventListener('focusin', onCardFocus);

        return () => {
          clearPortal();
          navigateToIndexRef.current = () => undefined;
          viewportElement.removeEventListener('scroll', onCompactScroll);
          trackElement.removeEventListener('focusin', onCardFocus);
          visibilityObserver.disconnect();
          clearVideos();
        };
      }

      // No modo reduzido em desktop, a seção mantém todas as habilidades no
      // fluxo normal e não cria um carrossel pinado nem listeners de drag.
      if (reduceMotionQuery.matches) {
        setActive(0, false);
        navigateToIndexRef.current = (index) => {
          cards[index]?.focus({ preventScroll: true });
          cards[index]?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        };
        visibilityObserver.disconnect();
        return () => {
          navigateToIndexRef.current = () => undefined;
          clearPortal();
          clearVideos();
        };
      }

      // Converte o drag horizontal em índice de card dentro dos limites.
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

      // Os botões e o drag navegam pela mesma distância vertical do scroll.
      const scrollToIndex = (index: number) => {
        const nextIndex = Math.max(0, Math.min(cards.length - 1, index));
        const start = scrollTrigger.start;
        const progress = nextIndex / (cards.length - 1);
        const target = start + (nextIndex === 0 ? 0 : firstCardHoldDistance + progress * maxTranslate);
        window.scrollTo({ top: target, behavior: 'smooth' });
      };

      measure();
      viewportElement.scrollTo({ left: 0, behavior: 'instant' });
      const scrollTrigger = ScrollTrigger.create({
        id: 'skills-horizontal-track',
        trigger: sectionElement,
        start: 'top top',
        end: () => `+=${pinDistance}`,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onRefresh: (self) => {
          setPosition(Math.min(maxTranslate, progressToPosition(self.progress)), true);
        },
        onUpdate: (self) => {
          if (!dragging) {
            setPosition(Math.min(maxTranslate, progressToPosition(self.progress)));
          }
        }
      });

      // Recalcula medidas após resize e restaura o modo correto de track para
      // desktop/mobile antes de pedir um refresh global ao ScrollTrigger.
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      const syncLayout = () => {
        dragging = false;
        shellElement.classList.remove(styles.isDragging);
        measure();
        if (compactQuery.matches) {
          gsap.set(trackElement, { clearProps: 'transform' });
          cards.forEach((card) => gsap.set(card, { clearProps: '--card-divider-progress' }));
          setActive(activeIndex, false);
        } else {
          cards.forEach((card, index) =>
            gsap.set(card, { '--card-divider-progress': index === activeIndex ? 1 : 0 })
          );
          setPosition(Math.min(maxTranslate, progressToPosition(scrollTrigger.progress)), true);
        }
        ScrollTrigger.refresh();
      };
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncLayout, 200);
      };

      // Drag horizontal opcional no desktop. O clique nos botões de navegação
      // é ignorado para que cada interação mantenha uma única responsabilidade.
      const onPointerDown = (event: PointerEvent) => {
        if (compactQuery.matches || event.button !== 0) return;
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
      const onDesktopCardFocus = (event: FocusEvent) => {
        const index = cards.indexOf(event.target as HTMLElement);
        if (index < 0) return;
        const progress = index / (cards.length - 1);
        const target = scrollTrigger.start + (index === 0 ? 0 : firstCardHoldDistance + progress * maxTranslate);
        window.scrollTo({ top: target, behavior: 'instant' });
        setPosition(progress * maxTranslate, true);
      };
      trackElement.addEventListener('focusin', onDesktopCardFocus);
      shellElement.addEventListener('pointerdown', onPointerDown);
      shellElement.addEventListener('pointermove', onPointerMove);
      shellElement.addEventListener('pointerup', onPointerUp);
      shellElement.addEventListener('pointercancel', onPointerUp);
      window.addEventListener('resize', onResize);
      reduceMotionQuery.addEventListener('change', syncVideoMotion);

      ScrollTrigger.refresh();
      setPosition(Math.min(maxTranslate, progressToPosition(scrollTrigger.progress)), true);

      return () => {
        clearPortal();
        navigateToIndexRef.current = () => undefined;
        trackElement.removeEventListener('focusin', onDesktopCardFocus);
        shellElement.removeEventListener('pointerdown', onPointerDown);
        shellElement.removeEventListener('pointermove', onPointerMove);
        shellElement.removeEventListener('pointerup', onPointerUp);
        shellElement.removeEventListener('pointercancel', onPointerUp);
        window.removeEventListener('resize', onResize);
        clearTimeout(resizeTimer);
        reduceMotionQuery.removeEventListener('change', syncVideoMotion);
        scrollTrigger.kill();
        sectionElement.style.removeProperty('--skills-scroll-distance');
        visibilityObserver.disconnect();
        clearVideos();
      };
    },
    { scope: section, dependencies: [layoutMode, ready], revertOnUpdate: true }
  );

  return useCallback((index: number) => {
    navigateToIndexRef.current(index);
  }, []);
}
