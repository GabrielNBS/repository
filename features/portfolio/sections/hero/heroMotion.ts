'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import type { RefObject } from 'react';
import { hasProjectReturnIntent } from '../../projects/projectReturnNavigation';
import { preloadEntryAssets } from '../../shell/entryAssets';

gsap.registerPlugin(useGSAP, CustomEase);

const LETTER_SLOT = '6.75%';
const TITLE_DURATION = 0.75;
const TITLE_X_DELAY = 1.25;
const TITLE_Y_DELAY = 1.25;
const STICKER_DELAY = 0.7;
const STAGGER = 0.05;

const TITLE_CUBIC_EASE = CustomEase.create('thanks-title-cubic', '0.525, 0, 0, 1');
const TITLE_ELASTIC_EASE = CustomEase.create(
  'thanks-title-elastic',
  'M1 401C39.5 397.5 69.4641 324.999 82 282.5C111.411 182.791 119.276 -103.16 240 -28.9999C310 14.0002 343.5 1.00037 401 1.00037'
);

let restorePageScroll: (() => void) | undefined;

function setHeroLoadingLock(isLocked: boolean) {
  if (isLocked) {
    if (restorePageScroll) return;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width
    };

    document.documentElement.setAttribute('data-hero-loading', 'true');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    restorePageScroll = () => {
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      documentElement.removeAttribute('data-hero-loading');
      window.scrollTo(0, scrollY);
      restorePageScroll = undefined;
    };
    return;
  }

  restorePageScroll?.();
}

export function useHeroMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="title-row"]'));
      const titleContents = [
        ...Array.from(section.querySelectorAll<HTMLElement>('[data-motion="title-content"]')),
        ...Array.from(section.querySelectorAll<HTMLElement>('[data-motion="word-content"]'))
      ];
      const words = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="dynamic-word"]'));
      const wordContents = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="word-content"]'));
      const fakeLetters = Array.from(
        section.querySelectorAll<HTMLElement>('[data-motion="dynamic-word"] [data-motion="fake-letter"]')
      );
      const stickers = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="sticker"]'));
      const staticSlot = section.querySelector<HTMLElement>('[data-motion="static-slot"]');
      const staticSticker = section.querySelector<HTMLElement>('[data-motion="static-sticker"]');
      const titleLoopBox = section.querySelector<HTMLElement>('[data-motion="title-loop-box"]');
      const titleLoop = section.querySelector<HTMLElement>('[data-motion="title-loop"]');
      const revealTargets = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="hero-reveal"]'));
      const scrollCueLabel = section.querySelector<HTMLElement>('[data-motion="scroll-cue-label"]');
      const scrollCueMarker = section.querySelector<HTMLElement>('[data-motion="scroll-cue-marker"]');
      const loader = section.querySelector<HTMLElement>('[data-motion="hero-loader"]');
      const loaderIndex = section.querySelector<HTMLElement>('[data-motion="hero-loader-index"]');
      const loaderBalls = Array.from(section.querySelectorAll<HTMLElement>('[data-motion="loader-ball"]'));

      if (
        rows.length !== 3 ||
        titleContents.length !== words.length + 2 ||
        words.length === 0 ||
        wordContents.length !== words.length ||
        fakeLetters.length !== words.length ||
        stickers.length !== words.length ||
        !titleLoopBox ||
        !titleLoop ||
        !staticSlot ||
        !staticSticker ||
        !scrollCueLabel ||
        !scrollCueMarker ||
        revealTargets.length === 0 ||
        !loader ||
        !loaderIndex ||
        loaderBalls.length !== 3
      ) {
        return;
      }

      const setReducedMotionState = () => {
        setHeroLoadingLock(false);
        delete section.dataset.heroLoading;
        loader.dataset.loaderState = 'hidden';
        gsap.set(loader, { display: 'none', autoAlpha: 0 });
        gsap.set(rows, { yPercent: 0, autoAlpha: 1 });
        gsap.set(rows[0], { yPercent: -100, autoAlpha: 0 });
        gsap.set(titleLoopBox, { autoAlpha: 1 });
        gsap.set(words, { xPercent: 90, autoAlpha: 0 });
        gsap.set(words[0], { xPercent: 0, autoAlpha: 1 });
        gsap.set(titleContents, { scaleX: 1 });
        gsap.set(revealTargets, { autoAlpha: 1 });
        gsap.set(fakeLetters, { width: 0 });
        gsap.set(stickers, { autoAlpha: 0, rotation: 45, scale: 0 });
        gsap.set(staticSlot, { width: LETTER_SLOT });
        gsap.set(staticSticker, { autoAlpha: 1, rotation: 0, scale: 1 });
        gsap.set(fakeLetters[0], { width: LETTER_SLOT });
        gsap.set(stickers[0], { autoAlpha: 1, rotation: 0, scale: 1 });
      };

      const media = gsap.matchMedia();
      const shouldSkipEntry =
        hasProjectReturnIntent() ||
        document.documentElement.dataset.homeScrollTarget === 'projects' ||
        section.closest('[data-project-return-pending="true"]') !== null;

      if (!shouldSkipEntry) {
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }

      media.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reducedMotion: '(prefers-reduced-motion: reduce)'
        },
        (mediaContext) => {
          const { motion, reducedMotion } = mediaContext.conditions ?? {};

          if (reducedMotion) {
            gsap.set(scrollCueLabel, { autoAlpha: 1 });
            gsap.set(scrollCueMarker, { autoAlpha: 1, scale: 1, y: 22 });
            return;
          }

          if (!motion) return;

          const scrollCueLoop = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.38
          });

          scrollCueLoop
            .fromTo(
              scrollCueLabel,
              { autoAlpha: 0.58 },
              {
                autoAlpha: 1,
                duration: 0.7,
                ease: 'sine.inOut',
                repeat: 1,
                yoyo: true
              },
              0
            )
            .fromTo(
              scrollCueMarker,
              { autoAlpha: 0, rotation: -8, scale: 0.78, y: 0 },
              {
                autoAlpha: 1,
                duration: 0.38,
                ease: 'power2.out',
                rotation: 2,
                scale: 1,
                y: 12
              },
              0.08
            )
            .to(scrollCueMarker, {
              autoAlpha: 0,
              duration: 0.72,
              ease: 'power2.in',
              rotation: 12,
              scale: 0.82,
              y: 35
            });

          return () => scrollCueLoop.kill();
        }
      );

      // Em telas compactas a primeira dobra é conteúdo, não uma espera. A
      // coreografia completa permanece como assinatura do desktop.
      media.add('(prefers-reduced-motion: reduce), (max-width: 800px)', setReducedMotionState);
      media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
        if (shouldSkipEntry) {
          setReducedMotionState();
          return;
        }

        let entryTimeline: gsap.core.Timeline | undefined;
        let cancelled = false;

        // O overlay começa visível no primeiro paint. O conteúdo da hero fica
        // em sua pose inicial por CSS até que o loader o libere, evitando o
        // flash do layout final antes do GSAP assumir os elementos.
        setHeroLoadingLock(true);
        section.dataset.heroLoading = 'true';
        loader.dataset.loaderState = 'active';
        gsap.set(loader, { display: 'grid', autoAlpha: 1 });
        gsap.set(loaderIndex, { textContent: '000%' });

        // A entrada inicial expõe os dois primeiros blocos. A terceira linha
        // fica no trilho inferior, invisível, pronta para subir no loop.
        gsap.set(rows[0], { yPercent: 0, autoAlpha: 1 });
        gsap.set(rows[1], { yPercent: 0, autoAlpha: 1 });
        gsap.set(rows[2], { yPercent: 0, autoAlpha: 0 });
        gsap.set(titleLoopBox, { autoAlpha: 1 });
        gsap.set(words, { xPercent: 90, autoAlpha: 0 });
        gsap.set(words[0], { xPercent: 0, autoAlpha: 1 });
        gsap.set(titleContents, { scaleX: 1 });
        gsap.set(fakeLetters, { width: 0 });
        gsap.set(stickers, { autoAlpha: 0, rotation: 45, scale: 0 });
        // O início e o fim do loop compartilham o mesmo estado visível. Isso
        // evita que o repeat restaure o smiley oculto por um único frame.
        gsap.set(staticSlot, { width: LETTER_SLOT });
        gsap.set(staticSticker, { autoAlpha: 1, rotation: 0, scale: 1 });
        gsap.set(revealTargets, { autoAlpha: 0 });

        // A fonte e o font-size permanecem intactos. Quando uma frase longa
        // ultrapassa a caixa em viewports estreitos, ajustamos somente a
        // largura visual do conteúdo interno para que nenhum caractere seja
        // cortado pela máscara horizontal.
        const updateTitleFit = () => {
          const previousDynamicWidths = fakeLetters.map((letter) => getComputedStyle(letter).width);
          const previousStaticWidth = getComputedStyle(staticSlot).width;
          gsap.set(titleContents, { scaleX: 1 });
          gsap.set(fakeLetters, { width: LETTER_SLOT });
          gsap.set(staticSlot, { width: LETTER_SLOT });

          // A caixa mantém as máscaras laterais para esconder o trilho durante
          // as transições. O conteúdo, porém, deve caber na área entre elas.
          const availableWidth = Math.max(titleLoop.clientWidth, 1);
          const fitScales = titleContents.map((content) => {
            const contentWidth = content.getBoundingClientRect().width;
            const sticker = content.querySelector<HTMLElement>('[data-motion="sticker"], [data-motion="static-sticker"]');
            const slot = sticker?.parentElement;
            const stickerOverflow = sticker && slot
              ? Math.max(0, sticker.offsetWidth - slot.offsetWidth)
              : 0;
            const visualWidth = contentWidth + stickerOverflow;

            return visualWidth > availableWidth ? availableWidth / visualWidth : 1;
          });

          fakeLetters.forEach((letter, index) => {
            gsap.set(letter, { width: previousDynamicWidths[index] });
          });
          gsap.set(staticSlot, { width: previousStaticWidth });
          titleContents.forEach((content, index) => {
            gsap.set(content, { scaleX: fitScales[index] });
          });
        };

        updateTitleFit();
        window.addEventListener('resize', updateTitleFit);

        const loop = gsap.timeline({
          defaults: {
            duration: TITLE_DURATION,
            ease: TITLE_CUBIC_EASE
          },
          paused: true,
          repeat: -1,
          repeatDelay: 1
        });

        // 1) A primeira linha sai; a segunda sobe para a primeira; a terceira
        // sobe para a segunda. A box tem altura para as duas linhas visíveis,
        // e cada linha cruza a borda usando o mesmo easing vertical.
        loop.to(rows[0], {
          autoAlpha: 0,
          yPercent: -100,
          ease: TITLE_ELASTIC_EASE,
          delay: TITLE_Y_DELAY - TITLE_DURATION
        });
        loop.to(rows[1], {
          autoAlpha: 1,
          scale: 1,
          yPercent: -100,
          ease: TITLE_ELASTIC_EASE
        }, '<');
        loop.to(staticSticker, {
          rotation: 4,
          scale: 1.035,
          duration: 0.16,
          ease: 'sine.out'
        }, `<${STAGGER}`);
        loop.to(staticSticker, {
          rotation: -24,
          scale: 0.45,
          autoAlpha: 0,
          duration: 0.74,
          ease: 'power2.inOut'
        }, '>-0.02');
        loop.to(rows[2], {
          autoAlpha: 1,
          yPercent: -100,
          ease: TITLE_ELASTIC_EASE
        }, '<0.02');
        // O slot só fecha quando o smiley já está praticamente invisível.
        // Se ele colapsar junto com a saída, o centro do SVG muda enquanto
        // ainda está visível e isso produz um salto lateral.
        loop.to(staticSlot, {
          width: 0,
          duration: 0.52,
          ease: TITLE_CUBIC_EASE
        }, '<0.56');
        loop.fromTo(fakeLetters[0], {
          width: 0
        }, {
          width: LETTER_SLOT,
          ease: TITLE_ELASTIC_EASE
        }, `<${STICKER_DELAY - 0.05}`);
        loop.fromTo(stickers[0], {
          autoAlpha: 0,
          rotation: () => gsap.utils.random(-45, 45),
          scale: 0
        }, {
          autoAlpha: 1,
          rotation: 0,
          scale: 1,
          ease: TITLE_ELASTIC_EASE
        }, '<');
        // 2) A palavra horizontal troca enquanto o carrossel vertical segura
        // a composição. Os slots não colapsam entre palavras, como no original.
        for (let index = 0; index < words.length - 1; index += 1) {
          const current = words[index];
          const next = words[index + 1];
          // Alterna o sentido a cada troca. A primeira palavra sai pela
          // esquerda; a segunda sai pela direita; e assim por diante.
          const exitDirection = index % 2 === 0 ? -1 : 1;
          const enterDirection = exitDirection * -1;

          loop.to(current, {
            delay: TITLE_X_DELAY,
            xPercent: exitDirection * 90,
            autoAlpha: 0
          });
          loop.to(stickers[index], {
            autoAlpha: 0,
            rotation: exitDirection * 35,
            scale: 0,
            duration: 0.42,
            ease: 'expo.in'
          }, '<0.16');
          loop.fromTo(next, {
            xPercent: enterDirection * 90,
            autoAlpha: 0
          }, {
            xPercent: 0,
            autoAlpha: 1
          }, '<');
          loop.fromTo(fakeLetters[index + 1], {
            width: 0
          }, {
            width: LETTER_SLOT,
            ease: TITLE_ELASTIC_EASE
          }, `<${STICKER_DELAY - 0.1}`);
          loop.fromTo(stickers[index + 1], {
            autoAlpha: 0,
            rotation: enterDirection * 45,
            scale: 0
          }, {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            ease: TITLE_ELASTIC_EASE
          }, '<');
        }

        // 3) A última palavra termina a volta. As linhas descem para o estado
        // inicial; a primeira reaparece por baixo do corte e o ciclo reinicia.
        loop.to(rows[1], {
          delay: TITLE_Y_DELAY,
          autoAlpha: 1,
          yPercent: 0,
          ease: TITLE_ELASTIC_EASE
        });
        loop.to(rows[2], {
          autoAlpha: 0,
          yPercent: 0,
          ease: TITLE_ELASTIC_EASE
        }, '<');
        loop.to(rows[0], {
          autoAlpha: 1,
          yPercent: 0,
          ease: TITLE_ELASTIC_EASE
        }, `<${STAGGER}`);
        loop.to(staticSticker, {
          rotation: 0,
          scale: 1,
          autoAlpha: 1,
          ease: TITLE_ELASTIC_EASE
        }, `<${STICKER_DELAY}`);
        loop.to(staticSlot, {
          width: LETTER_SLOT,
          ease: TITLE_ELASTIC_EASE
        }, '<');

        const intro = gsap.timeline({ paused: true, defaults: { ease: 'elastic.out(1, 0.95)' } });
        intro
          .fromTo(rows[0], { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: TITLE_DURATION }, 0)
          .fromTo(rows[1], { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: TITLE_DURATION }, STAGGER)
          .fromTo(staticSlot, {
            width: 0
          }, {
            width: LETTER_SLOT,
            duration: 0.58,
            ease: TITLE_CUBIC_EASE
          }, STAGGER + 0.18)
          .fromTo(staticSticker, {
            autoAlpha: 0,
            rotation: 32,
            scale: 0.45
          }, {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            duration: 0.74,
            ease: TITLE_ELASTIC_EASE
          }, STAGGER + 0.24)
          .to(revealTargets, { autoAlpha: 1, duration: 0.1 }, 0.08)
          .call(() => loop.play(0), undefined, 2);

        // Mantém a cadência de recortes do loader original: uma bola salta por
        // vez, enquanto o percentual acompanha imagens, vídeos e fontes reais.
        const ballsWave = gsap.timeline({ paused: true, repeat: -1 });
        const ballPoses = [
          { rotation: -5, scale: 1.05, y: -8 },
          { rotation: 6, scale: 1.08, y: -15 },
          { rotation: -4, scale: 1.05, y: -9 }
        ];

        ballsWave.set(loaderBalls, { rotation: 0, scale: 1, y: 0 });
        [0, 1, 2, 1].forEach((index) => {
          ballsWave
            .set(loaderBalls[index], ballPoses[index])
            .to({}, { duration: 0.14 })
            .set(loaderBalls[index], { rotation: 0, scale: 1, y: 0 })
            .to({}, { duration: 0.06 });
        });
        ballsWave.play(0);

        void preloadEntryAssets(section, ({ complete, total }) => {
          if (cancelled) return;
          const progress = Math.round((complete / Math.max(total, 1)) * 100);
          loaderIndex.textContent = `${String(progress).padStart(3, '0')}%`;
        }).then(() => {
          if (cancelled) return;

          loaderIndex.textContent = '100%';
          entryTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
          entryTimeline
            .addLabel('release', 0)
            .to(loaderBalls, {
              autoAlpha: 0,
              duration: 0.32,
              scale: 0.72,
              stagger: { each: 0.05 },
              y: 8
            }, 'release')
            .to(loader, { autoAlpha: 0, duration: 0.26 }, 'release+=0.5')
            .call(() => intro.play(0), undefined, 'release+=0.76')
            .call(() => {
              setHeroLoadingLock(false);
              delete section.dataset.heroLoading;
              loader.dataset.loaderState = 'hidden';
            }, undefined, 'release+=1.1')
            .set(loader, { display: 'none' }, 'release+=1.1')
            .add(() => ballsWave.kill(), 'release+=0.32');
        });

        return () => {
          cancelled = true;
          window.removeEventListener('resize', updateTitleFit);
          setHeroLoadingLock(false);
          delete section.dataset.heroLoading;
          loader.dataset.loaderState = 'hidden';
          entryTimeline?.kill();
          ballsWave.kill();
          intro.kill();
          loop.kill();
        };
      });

      return () => media.revert();
    },
    { scope: root }
  );
}
