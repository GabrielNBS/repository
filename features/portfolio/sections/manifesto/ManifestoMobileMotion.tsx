'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP);

export default function ManifestoMobileMotion({ root }: { root: RefObject<HTMLElement | null> }) {
  useGSAP(() => {
    const section = root.current;
    if (!section) return;
    const media = gsap.matchMedia();
      media.add(
        {
          mobile: '(max-width: 800px)',
          motion: '(prefers-reduced-motion: no-preference)'
        },
        (mediaContext) => {
          const { mobile, motion } = mediaContext.conditions ?? {};
          const carousel = section.querySelector<HTMLElement>('[data-manifesto-beats]');

          if (!mobile || !motion || !carousel) return;

          const mobileBeats = gsap.utils.toArray<HTMLElement>('[data-manifesto-beat]', carousel);
          if (mobileBeats.length !== 3) return;

          let activeBeat = -1;
          let carouselVisible = false;
          let animationFrame = 0;
          let entryTimeline: gsap.core.Timeline | undefined;
          let keywordFloat: gsap.core.Tween | undefined;
          let dotsWave: gsap.core.Timeline | undefined;

          const getBeatTargets = (beat: HTMLElement) => {
            const keyword = beat.querySelector<HTMLElement>('[data-manifesto-card-keyword]');
            const title = beat.querySelector<HTMLElement>('[data-manifesto-card-title]');
            const copy = beat.querySelector<HTMLElement>('[data-manifesto-card-copy]');
            const dots = gsap.utils.toArray<HTMLElement>('[data-manifesto-card-dots] span', beat);

            if (!keyword || !title || !copy || dots.length !== 3) return null;

            return { keyword, title, copy, dots };
          };

          // No modo com movimento, cada card aguarda fora de cena. Assim a
          // animação começa pelo estado escondido — nunca pelo conteúdo já
          // desenhado que volta para trás em um salto visível.
          const prepareBeat = (beat: HTMLElement) => {
            const targets = getBeatTargets(beat);
            if (!targets) return;

            const { keyword, title, copy, dots } = targets;
            gsap.killTweensOf([keyword, title, copy, ...dots]);
            gsap.set(keyword, { autoAlpha: 0, y: -22, scale: 0.74 });
            gsap.set(title, { autoAlpha: 0, y: 30 });
            gsap.set(copy, { autoAlpha: 0, y: 18 });
            gsap.set(dots, { autoAlpha: 0, y: 0, scale: 0.6 });
          };

          mobileBeats.forEach(prepareBeat);

          const setActiveBeat = (nextBeat: number) => {
            activeBeat = nextBeat;
            mobileBeats.forEach((beat, index) => {
              beat.dataset.active = String(index === nextBeat);
              beat.removeAttribute('aria-hidden');
            });
          };

          const pauseAmbientMotion = () => {
            keywordFloat?.pause();
            dotsWave?.pause();
          };

          const getCenteredBeat = () => {
            const carouselBounds = carousel.getBoundingClientRect();
            const carouselCenter = carouselBounds.left + carouselBounds.width / 2;

            return mobileBeats.reduce((closestIndex, beat, index) => {
              const beatBounds = beat.getBoundingClientRect();
              const beatCenter = beatBounds.left + beatBounds.width / 2;
              const closestBounds = mobileBeats[closestIndex].getBoundingClientRect();
              const closestCenter = closestBounds.left + closestBounds.width / 2;

              return Math.abs(beatCenter - carouselCenter) < Math.abs(closestCenter - carouselCenter)
                ? index
                : closestIndex;
            }, 0);
          };

          const startAmbientMotion = (nextBeat: number) => {
            const targets = getBeatTargets(mobileBeats[nextBeat]);
            if (!targets) return;
            const { keyword, dots } = targets;

            keywordFloat = gsap.to(keyword, {
              y: -7,
              duration: 1.15,
              delay: 0.52,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1
            });

            // Cada ponto sobe e retorna com um pequeno atraso em relação ao
            // anterior: uma onda contínua de carregamento, não um pulso único.
            dotsWave = gsap
              .timeline({ delay: 0.72, repeat: -1, repeatDelay: 0.18 })
              .to(dots, { y: -5, scale: 1.16, duration: 0.18, ease: 'sine.out', stagger: 0.1 })
              .to(
                dots,
                { y: 0, scale: 1, duration: 0.25, ease: 'sine.in', stagger: 0.1 },
                0.18
              );
          };

          const activateBeat = (nextBeat: number) => {
            const beat = mobileBeats[nextBeat];
            const targets = getBeatTargets(beat);
            if (!targets) return;
            const { keyword, title, copy, dots } = targets;

            entryTimeline?.kill();
            keywordFloat?.kill();
            dotsWave?.kill();
            mobileBeats.forEach((candidate, index) => {
              if (index !== nextBeat) prepareBeat(candidate);
            });
            prepareBeat(beat);
            entryTimeline = gsap
              .timeline({ defaults: { overwrite: 'auto' } })
              .to(keyword, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.46,
                ease: 'back.out(1.55)'
              })
              .to(
                title,
                { autoAlpha: 1, y: 0, duration: 0.48, ease: 'power3.out' },
                '-=0.16'
              )
              .to(
                copy,
                { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' },
                '-=0.25'
              )
              .to(
                dots,
                { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(1.8)', stagger: 0.06 },
                '-=0.22'
              );

            startAmbientMotion(nextBeat);
          };

          const syncActiveBeat = (force = false) => {
            if (!carouselVisible) {
              pauseAmbientMotion();
              return;
            }

            const nextBeat = getCenteredBeat();
            if (force || nextBeat !== activeBeat) {
              setActiveBeat(nextBeat);
              activateBeat(nextBeat);
              return;
            }

            keywordFloat?.play();
            dotsWave?.play();
          };

          const requestSync = () => {
            if (animationFrame) return;
            animationFrame = window.requestAnimationFrame(() => {
              animationFrame = 0;
              syncActiveBeat();
            });
          };

          const observer = new IntersectionObserver(
            ([entry]) => {
              const wasVisible = carouselVisible;
              carouselVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
              syncActiveBeat(carouselVisible && !wasVisible);
            },
            { threshold: [0, 0.45, 0.8] }
          );

          observer.observe(carousel);
          carousel.addEventListener('scroll', requestSync, { passive: true });
          window.addEventListener('resize', requestSync, { passive: true });

          const initialBounds = carousel.getBoundingClientRect();
          carouselVisible = initialBounds.top < window.innerHeight && initialBounds.bottom > 0;
          syncActiveBeat(carouselVisible);

          return () => {
            observer.disconnect();
            carousel.removeEventListener('scroll', requestSync);
            window.removeEventListener('resize', requestSync);
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            entryTimeline?.kill();
            keywordFloat?.kill();
            dotsWave?.kill();
            mobileBeats.forEach((beat) => {
              const targets = getBeatTargets(beat);
              if (!targets) return;
              gsap.set([targets.keyword, targets.title, targets.copy, ...targets.dots], {
                clearProps: 'transform,opacity,visibility'
              });
            });
            mobileBeats.forEach((beat) => beat.removeAttribute('aria-hidden'));
          };
        }
      );


    return () => media.revert();
  }, { scope: root });
  return null;
}
