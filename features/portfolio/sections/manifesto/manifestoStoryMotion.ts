'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { protectSplitTextMasks } from '../../shared/motion/splitTextSafety';

// O manifesto combina todos estes plugins: SplitText para a tipografia,
// MotionPath para o orbit, MorphSVG para a forma orgânica e ScrollTrigger para
// transformar o scroll em uma timeline pinada.
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  CustomEase,
  MorphSVGPlugin,
  MotionPathPlugin
);

export function useManifestoStoryMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      // Cada alvo data-* corresponde a uma camada da narrativa. Se algum
      // elemento essencial faltar, o hook sai sem criar uma timeline parcial.
      const pin = section.querySelector<HTMLElement>('[data-manifesto-pin]');
      const atmosphere = section.querySelector<HTMLElement>('[data-manifesto-atmosphere]');
      const intro = section.querySelector<HTMLElement>('[data-manifesto-intro]');
      const introTitle = section.querySelector<HTMLElement>('[data-manifesto-intro-title]');
      const keywords = gsap.utils.toArray<HTMLElement>('[data-manifesto-keyword]', section);
      const stack = section.querySelector<HTMLElement>('[data-manifesto-stack]');
      const frame = section.querySelector<HTMLElement>('[data-manifesto-frame]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-manifesto-card]', section);
      const beats = gsap.utils.toArray<HTMLElement>('[data-manifesto-beat]', section);
      const beatTitles = gsap.utils.toArray<HTMLElement>('[data-manifesto-beat-title]', section);
      const blob = section.querySelector<SVGPathElement>('[data-manifesto-blob]');
      const rhythmShape = section.querySelector<SVGPathElement>('[data-manifesto-shape="rhythm"]');
      const formShape = section.querySelector<SVGPathElement>('[data-manifesto-shape="form"]');
      const orbitTag = section.querySelector<HTMLElement>('[data-manifesto-orbit-tag]');
      const orbitPath = section.querySelector<SVGPathElement>('[data-manifesto-orbit-path]');
      const progress = section.querySelector<HTMLElement>('[data-manifesto-progress]');
      const closing = section.querySelector<HTMLElement>('[data-manifesto-closing]');
      const closingParts = gsap.utils.toArray<HTMLElement>(
        '[data-manifesto-closing-part]',
        section
      );
      const chrome = gsap.utils.toArray<HTMLElement>('[data-manifesto-chrome]', section);

      if (
        !pin ||
        !atmosphere ||
        !intro ||
        !introTitle ||
        !stack ||
        !frame ||
        !blob ||
        !rhythmShape ||
        !formShape ||
        !orbitTag ||
        !orbitPath ||
        !progress ||
        !closing ||
        keywords.length !== 3 ||
        cards.length !== 2 ||
        beats.length !== 3 ||
        beatTitles.length !== 3 ||
        closingParts.length !== 3
      ) {
        return;
      }

      // Curva base compartilhada por entradas e transições da narrativa. Para
      // deixar o manifesto mais rápido/lento, ajuste esta curva ou os labels,
      // não cada tween individualmente.
      CustomEase.create('manifesto-focus', 'M0,0 C0.16,0.74 0.22,1 1,1');

      // gsap.matchMedia reverte automaticamente a timeline quando o breakpoint
      // ou prefers-reduced-motion deixa de corresponder.
      const media = gsap.matchMedia();
      // Converte o progresso global em beat ativo (0, 1 ou 2), mantendo o
      // estado aria sincronizado com a leitura visual.
      const progressToBeat = gsap.utils.pipe(
        gsap.utils.mapRange(0.25, 0.76, 0, 2),
        gsap.utils.clamp(0, 2),
        gsap.utils.snap(1)
      );

      media.add(
        {
          desktop: '(min-width: 801px)',
          motion: '(prefers-reduced-motion: no-preference)'
        },
        (mediaContext) => {
          const { desktop, motion } = mediaContext.conditions ?? {};

          if (!desktop || !motion) return;

          // Os títulos são divididos em palavras para entrarem como unidades
          // legíveis, mantendo as máscaras protegidas contra clipping.
          const introSplit = SplitText.create(introTitle, {
            type: 'words',
            mask: 'words',
            wordsClass: 'split-motion-word',
            aria: 'auto'
          });
          const titleSplits = beatTitles.map((title) =>
            SplitText.create(title, {
              type: 'words',
              mask: 'words',
              wordsClass: 'split-motion-word',
              aria: 'auto'
            })
          );
          protectSplitTextMasks([introSplit, ...titleSplits]);
          const titleWords = titleSplits.map((split) => split.words);

          let activeBeat = -1;

          // Atualiza somente estado semântico/visual discreto; a posição em si
          // continua sendo responsabilidade da timeline scrubbada.
          const setActiveBeat = (nextBeat: number) => {
            if (activeBeat === nextBeat) return;

            activeBeat = nextBeat;
            beats.forEach((beat, index) => {
              const isActive = index === nextBeat;
              beat.dataset.active = String(isActive);
              beat.setAttribute('aria-hidden', String(!isActive));
            });
          };

          // Estado inicial: cada camada começa próxima da sua posição final.
          // A entrada acontece por opacidade e deslocamentos curtos; não há
          // escala de um mini container para uma composição maior.
          gsap.set(stack, {
            autoAlpha: 0,
            rotate: -5,
            xPercent: -50,
            y: 96,
            yPercent: -50
          });
          gsap.set(cards, { autoAlpha: 0 });
          gsap.set(beats, { autoAlpha: 0 });
          gsap.set(beats[0], { autoAlpha: 1 });
          gsap.set(introSplit.words, {
            autoAlpha: 0,
            rotate: 2.5,
            yPercent: 42
          });
          gsap.set(titleWords.flat(), { autoAlpha: 0, rotate: 2, yPercent: 120 });
          gsap.set(keywords, { autoAlpha: 0, y: 22 });
          gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
          gsap.set(closing, { autoAlpha: 0, y: 32 });
          gsap.set(closingParts, { autoAlpha: 0, yPercent: 42 });
          setActiveBeat(-1);

          // Timeline principal do manifesto. O pin segura a cena no viewport e
          // `scrub: 1.05` faz o playhead acompanhar o scroll com amortecimento.
          const timeline = gsap.timeline({
            defaults: { ease: 'manifesto-focus' },
            scrollTrigger: {
              id: 'manifesto-story',
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.max(window.innerHeight * 3.35, 2500)}`,
              pin,
              scrub: 1.05,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const nextBeat = self.progress < 0.23 ? -1 : progressToBeat(self.progress);
                setActiveBeat(nextBeat);
              }
            }
          });

          // Cada label marca uma ideia da história. Os valores de duration são
          // unidades internas da timeline; o end do ScrollTrigger decide
          // quanto scroll real corresponde a cada unidade.
          timeline
            .addLabel('thesis')
            // As camadas têm velocidades próprias ao longo do scroll. O
            // manifesto se abre por profundidade, sem ampliar um container.
            .to(
              atmosphere,
              { xPercent: 3, yPercent: -18, duration: 5, ease: 'none' },
              'thesis'
            )
            .to(
              introSplit.words,
              { autoAlpha: 1, rotate: 0, yPercent: 0, duration: 0.72, stagger: 0.055 },
              'thesis'
            )
            // MotionPath move a tag pelo mesmo orbit em trechos diferentes,
            // criando a sensação de continuidade entre os beats.
            .to(
              keywords,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: { amount: 0.22, from: 'center' }
              },
              'thesis+=0.28'
            )
            .to(progress, { scaleX: 0.18, duration: 1.2, ease: 'none' }, 'thesis')
            .addLabel('converge', 'thesis+=1.18')
            .to(intro, { autoAlpha: 0, yPercent: -16, duration: 0.48 }, 'converge')
            .to(
              keywords,
              {
                autoAlpha: 0,
                y: (index) => (index % 2 ? -24 : 24),
                duration: 0.52,
                stagger: 0.045
              },
              'converge'
            )
            .to(
              stack,
              { autoAlpha: 1, rotate: 0, y: 0, duration: 0.78 },
              'converge+=0.08'
            )
            .to(cards, { autoAlpha: 1, duration: 0.35, stagger: 0.08 }, 'converge+=0.5')
            .to(
              titleWords[0],
              { autoAlpha: 1, rotate: 0, yPercent: 0, duration: 0.55, stagger: 0.05 },
              'converge+=0.58'
            )
            .fromTo(
              beats[0].querySelectorAll('p'),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
              'converge+=0.68'
            )
            .to(
              orbitTag,
              {
                motionPath: {
                  path: orbitPath,
                  align: orbitPath,
                  alignOrigin: [0.5, 0.5],
                  start: 0.08,
                  end: 0.35
                },
                duration: 1.1,
                ease: 'none'
              },
              'converge'
            )
            .to(progress, { scaleX: 0.4, duration: 1.3, ease: 'none' }, 'converge')
            .addLabel('rhythm', 'converge+=1.45')
            .to(
              titleWords[0],
              { autoAlpha: 0, rotate: -2, yPercent: -115, duration: 0.38, stagger: 0.025 },
              'rhythm'
            )
            .to(beats[0], { autoAlpha: 0, duration: 0.3 }, 'rhythm+=0.18')
            .to(beats[1], { autoAlpha: 1, duration: 0.35 }, 'rhythm+=0.22')
            .to(
              titleWords[1],
              { autoAlpha: 1, rotate: 0, yPercent: 0, duration: 0.55, stagger: 0.05 },
              'rhythm+=0.28'
            )
            .fromTo(
              beats[1].querySelectorAll('p'),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
              'rhythm+=0.38'
            )
            // MorphSVG muda a silhueta do blob de ritmo para forma sem trocar
            // o elemento; isso mantém o fluxo visual e o DOM estáveis.
            .to(
              blob,
              { morphSVG: { shape: rhythmShape, type: 'rotational' }, duration: 1.05 },
              'rhythm'
            )
            .to(frame, { y: -14, rotate: 1.2, duration: 0.65 }, 'rhythm')
            .to(cards[0], { x: -32, y: 20, rotate: -4.5, duration: 0.72 }, 'rhythm')
            .to(cards[1], { x: 30, y: 16, rotate: 4.2, duration: 0.72 }, 'rhythm')
            .to(
              orbitTag,
              {
                motionPath: {
                  path: orbitPath,
                  align: orbitPath,
                  alignOrigin: [0.5, 0.5],
                  start: 0.35,
                  end: 0.67
                },
                duration: 1.1,
                ease: 'none'
              },
              'rhythm'
            )
            .to(progress, { scaleX: 0.68, duration: 1.2, ease: 'none' }, 'rhythm')
            .addLabel('form', 'rhythm+=1.5')
            .to(
              titleWords[1],
              { autoAlpha: 0, rotate: -2, yPercent: -115, duration: 0.38, stagger: 0.025 },
              'form'
            )
            .to(beats[1], { autoAlpha: 0, duration: 0.3 }, 'form+=0.18')
            .to(beats[2], { autoAlpha: 1, duration: 0.35 }, 'form+=0.22')
            .to(
              titleWords[2],
              { autoAlpha: 1, rotate: 0, yPercent: 0, duration: 0.55, stagger: 0.05 },
              'form+=0.28'
            )
            .fromTo(
              beats[2].querySelectorAll('p'),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
              'form+=0.38'
            )
            .to(
              blob,
              { morphSVG: { shape: formShape, type: 'rotational' }, duration: 1.05 },
              'form'
            )
            .to(frame, { y: 0, rotate: -0.7, duration: 0.72 }, 'form')
            .to(cards, { x: 0, y: 0, rotate: 0, duration: 0.72 }, 'form')
            .to(
              orbitTag,
              {
                motionPath: {
                  path: orbitPath,
                  align: orbitPath,
                  alignOrigin: [0.5, 0.5],
                  start: 0.67,
                  end: 0.94
                },
                duration: 1.1,
                ease: 'none'
              },
              'form'
            )
            .to(progress, { scaleX: 0.9, duration: 1.2, ease: 'none' }, 'form')
            // No final, a composição permanece no lugar e abre espaço para a
            // frase. Não há retorno para um slot nem montagem de palavra por
            // meio de um card.
            .addLabel('release', 'form+=1.5')
            .set(stack, { zIndex: 9 }, 'release')
            .to(chrome, { autoAlpha: 0, duration: 0.28 }, 'release')
            .to(orbitTag, { autoAlpha: 0, duration: 0.28 }, 'release')
            .to(
              cards,
              {
                autoAlpha: 0,
                duration: 0.48,
                stagger: 0.055
              },
              'release+=0.06'
            )
            .to(stack, { autoAlpha: 0, y: -28, duration: 0.54 }, 'release+=0.28')
            .to(atmosphere, { autoAlpha: 0.22, yPercent: -26, duration: 0.78 }, 'release+=0.08')
            .to(closing, { autoAlpha: 1, y: 0, duration: 0.52 }, 'release+=0.42')
            .to(
              closingParts,
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.64,
                stagger: 0.08
              },
              'release+=0.48'
            )
            .to(progress, { scaleX: 1, duration: 0.48, ease: 'none' }, 'release+=0.56');

          return () => {
            beats.forEach((beat) => beat.removeAttribute('aria-hidden'));
            introSplit.revert();
            titleSplits.forEach((split) => split.revert());
            timeline.kill();
          };
        }
      );

      return () => media.revert();
    },
    { scope: root }
  );
}
