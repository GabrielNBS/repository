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

type CardDestination = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};

function measureCardDestination(
  frame: HTMLElement,
  stack: HTMLElement,
  closing: HTMLElement,
  slot: HTMLElement
): CardDestination {
  // Mede a posição final do card em relação ao stack, já no layout atual.
  // Como o slot muda entre breakpoints, esta função é chamada novamente no
  // refresh do ScrollTrigger em vez de guardar coordenadas fixas.
  let slotX = 0;
  let slotY = 0;
  let offsetNode: HTMLElement | null = slot;

  while (offsetNode && offsetNode !== closing) {
    slotX += offsetNode.offsetLeft;
    slotY += offsetNode.offsetTop;
    offsetNode = offsetNode.offsetParent as HTMLElement | null;
  }

  // Leitura de layout agrupada: primeiro obtemos as dimensões, depois a
  // timeline usa apenas transforms (x/y/scale) para realizar a transição.
  const slotStyles = window.getComputedStyle(slot);
  const frameStyles = window.getComputedStyle(frame);
  const slotWidth = Number.parseFloat(slotStyles.width) || slot.offsetWidth;
  const slotHeight = Number.parseFloat(slotStyles.height) || slot.offsetHeight;
  const frameWidth = Number.parseFloat(frameStyles.width) || frame.offsetWidth;
  const frameHeight = Number.parseFloat(frameStyles.height) || frame.offsetHeight;
  const closingLeft = closing.offsetLeft - closing.offsetWidth / 2;
  const closingTop = closing.offsetTop - closing.offsetHeight / 2;

  return {
    x: closingLeft + slotX + slotWidth / 2 - stack.offsetLeft,
    y: closingTop + slotY + slotHeight / 2 - stack.offsetTop,
    scaleX: slotWidth / frameWidth,
    scaleY: slotHeight / frameHeight
  };
}

export function useManifestoStoryMotion(
  root: RefObject<HTMLElement | null>,
  options: { embedded?: boolean } = {}
) {
  useGSAP(
    () => {
      const section = root.current;
      const embedded = options.embedded ?? false;

      if (!section) return;

      // Cada alvo data-* corresponde a uma camada da narrativa. Se algum
      // elemento essencial faltar, o hook sai sem criar uma timeline parcial.
      const pin = section.querySelector<HTMLElement>('[data-manifesto-pin]');
      const stage = section.querySelector<HTMLElement>('[data-manifesto-stage]');
      const atmosphere = section.querySelector<HTMLElement>('[data-manifesto-atmosphere]');
      const intro = section.querySelector<HTMLElement>('[data-manifesto-intro]');
      const introTitle = section.querySelector<HTMLElement>('[data-manifesto-intro-title]');
      const keywords = gsap.utils.toArray<HTMLElement>('[data-manifesto-keyword]', section);
      const stack = section.querySelector<HTMLElement>('[data-manifesto-stack]');
      const frame = section.querySelector<HTMLElement>('[data-manifesto-frame]');
      const cardWord = section.querySelector<HTMLElement>('[data-manifesto-card-word]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-manifesto-card]', section);
      const beats = gsap.utils.toArray<HTMLElement>('[data-manifesto-beat]', section);
      const beatTitles = gsap.utils.toArray<HTMLElement>('[data-manifesto-beat-title]', section);
      const blob = section.querySelector<SVGPathElement>('[data-manifesto-blob]');
      const rhythmShape = section.querySelector<SVGPathElement>('[data-manifesto-shape="rhythm"]');
      const formShape = section.querySelector<SVGPathElement>('[data-manifesto-shape="form"]');
      const orbitTag = section.querySelector<HTMLElement>('[data-manifesto-orbit-tag]');
      const orbitPath = section.querySelector<SVGPathElement>('[data-manifesto-orbit-path]');
      const progress = section.querySelector<HTMLElement>('[data-manifesto-progress]');
      const counter = section.querySelector<HTMLElement>('[data-manifesto-counter]');
      const frameIndex = section.querySelector<HTMLElement>('[data-manifesto-frame-index]');
      const closing = section.querySelector<HTMLElement>('[data-manifesto-closing]');
      const closingParts = gsap.utils.toArray<HTMLElement>(
        '[data-manifesto-closing-part]',
        section
      );
      const closingCardSlot = section.querySelector<HTMLElement>('[data-manifesto-card-slot]');
      const chrome = gsap.utils.toArray<HTMLElement>('[data-manifesto-chrome]', section);
      const projects = document.querySelector<HTMLElement>('#projetos');
      const host = embedded
        ? section.closest<HTMLElement>('main')
        : section;

      if (
        !pin ||
        !stage ||
        !atmosphere ||
        !intro ||
        !introTitle ||
        !stack ||
        !frame ||
        !cardWord ||
        !blob ||
        !rhythmShape ||
        !formShape ||
        !orbitTag ||
        !orbitPath ||
        !progress ||
        !counter ||
        !frameIndex ||
        !closing ||
        !closingCardSlot ||
        !projects ||
        !host ||
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
      media.add('(max-width: 800px)', () => {
        if (embedded) gsap.set(introTitle, { autoAlpha: 0 });
      });

      // Converte o progresso global em beat ativo (0, 1 ou 2), mantendo o
      // contador e o estado aria sincronizados com a leitura visual.
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
          let cardDestination = measureCardDestination(frame, stack, closing, closingCardSlot);

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
            counter.textContent = nextBeat < 0 ? '00' : `0${nextBeat + 1}`;
            frameIndex.textContent = nextBeat < 0 ? '00' : `0${nextBeat + 1}`;
          };

          // Estado inicial: stack e cards começam fora da cena; todas as
          // propriedades animadas aqui são os pontos de partida dos labels.
          gsap.set(stack, {
            autoAlpha: 0,
            scale: 0.2,
            rotate: -5,
            xPercent: -50,
            y: 96,
            yPercent: -50
          });
          gsap.set(cards, { autoAlpha: 0 });
          gsap.set(cardWord, { autoAlpha: 0, scale: 0.72 });
          gsap.set(beats, { autoAlpha: 0 });
          gsap.set(beats[0], { autoAlpha: 1 });
          // A hero entrega a frase ao manifesto. Mantemos o título já composto
          // no primeiro frame desta seção para que a troca do pin não revele
          // uma tela vazia enquanto a próxima batida ainda não começou.
          gsap.set(introSplit.words, {
            autoAlpha: embedded ? 0 : 1,
            rotate: embedded ? 2.5 : 0,
            yPercent: embedded ? 115 : 0
          });
          gsap.set(titleWords.flat(), { autoAlpha: 0, rotate: 2, yPercent: 120 });
          gsap.set(keywords, { autoAlpha: 0, scale: 0.72 });
          gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
          gsap.set(closing, { autoAlpha: 0, scale: 0.94, y: 28 });
          gsap.set(closingParts, { autoAlpha: 0, yPercent: 42 });
          gsap.set(projects, { autoAlpha: 0, y: 48 });
          setActiveBeat(-1);

          // Timeline principal do manifesto. O pin segura a cena no viewport e
          // `scrub: 1.05` faz o playhead acompanhar o scroll com amortecimento.
          const timeline = gsap.timeline({
            defaults: { ease: 'manifesto-focus' },
            scrollTrigger: {
              id: 'manifesto-story',
              trigger: host,
              start: embedded
                ? () => `top+=${Math.round(window.innerHeight * 2.2)} top`
                : 'top top',
              end: () => `+=${Math.max(window.innerHeight * 3.35, 2500)}`,
              pin: embedded ? false : pin,
              scrub: 1.05,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefreshInit: () => {
                cardDestination = measureCardDestination(frame, stack, closing, closingCardSlot);
              },
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
            // As palavras-chave convergem para o stack enquanto o intro sai;
            // o card principal nasce desse encontro visual.
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
                scale: 1,
                duration: 0.5,
                stagger: { amount: 0.22, from: 'center' }
              },
              'thesis+=0.28'
            )
            .to(progress, { scaleX: 0.18, duration: 1.2, ease: 'none' }, 'thesis')
            .addLabel('converge', 'thesis+=1.18')
            .to(intro, { autoAlpha: 0, scale: 0.94, yPercent: -16, duration: 0.48 }, 'converge')
            .to(
              keywords,
              {
                x: (_, target) => stack.offsetLeft - (target as HTMLElement).offsetLeft,
                y: (_, target) => stack.offsetTop - (target as HTMLElement).offsetTop,
                rotate: 0,
                scale: 0.45,
                autoAlpha: 0,
                duration: 0.7,
                stagger: 0.045
              },
              'converge'
            )
            .to(
              stack,
              { autoAlpha: 1, scale: 1, rotate: 0, y: 0, duration: 1.05 },
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
            .to(frame, { rotate: 1.2, scale: 0.96, duration: 0.65 }, 'rhythm')
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
            .to(frame, { rotate: -0.7, scale: 1.025, duration: 0.72 }, 'form')
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
            // Release é a passagem da narrativa para Projetos. Aqui o card
            // encolhe/move para o slot da frase final; o texto "entra" só é
            // revelado depois de o card terminar de se alocar.
            .addLabel('release', 'form+=1.5')
            .set(stack, { zIndex: 9 }, 'release')
            .to(chrome, { autoAlpha: 0, duration: 0.28 }, 'release')
            .to(orbitTag, { autoAlpha: 0, scale: 0.5, duration: 0.28 }, 'release')
            .to(stack, { x: 0, y: 0, duration: 0.42 }, 'release')
            .to(beats[2], { autoAlpha: 0, scale: 0.92, duration: 0.4 }, 'release+=0.04')
            .to(
              cards,
              {
                autoAlpha: 0,
                scale: 0.82,
                duration: 0.48,
                stagger: 0.055
              },
              'release+=0.06'
            )
            .to(
              frame,
              {
                x: () => cardDestination.x,
                y: () => cardDestination.y,
                rotation: 0,
                skewX: 0,
                scaleX: () => cardDestination.scaleX,
                scaleY: () => cardDestination.scaleY,
                duration: 1.02,
                ease: 'power3.inOut'
              },
              'release+=0.14'
            )
            .to(cardWord, { autoAlpha: 1, scale: 1, duration: 0.46 }, 'release+=1.6')
            .to(atmosphere, { scale: 1.08, autoAlpha: 0.22, duration: 0.78 }, 'release+=0.08')
            .to(closing, { autoAlpha: 1, scale: 1, y: 0, duration: 0.4 }, 'release+=0.22')
            .to(
              closingParts,
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.64,
                stagger: 0.08
              },
              'release+=0.3'
            )
            .to(projects, { autoAlpha: 1, y: 0, duration: 0.55 }, 'release+=0.86')
            .to(progress, { scaleX: 1, duration: 0.48, ease: 'none' }, 'release+=0.56');

          // quickTo cria um canal reutilizável para o parallax do ponteiro,
          // evitando novos tweens a cada evento pointermove.
          const frameX = gsap.quickTo(stack, 'x', {
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto'
          });
          const frameY = gsap.quickTo(stack, 'y', {
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto'
          });
          const atmosphereX = gsap.quickTo(atmosphere, 'xPercent', {
            duration: 1.2,
            ease: 'power3.out'
          });
          const atmosphereY = gsap.quickTo(atmosphere, 'yPercent', {
            duration: 1.2,
            ease: 'power3.out'
          });

          // O parallax é suspenso no release para não competir com a transição
          // scrubbada que posiciona o card na frase final.
          const onPointerMove = (event: PointerEvent) => {
            if ((timeline.scrollTrigger?.progress ?? 0) >= 0.78) return;

            const bounds = stage.getBoundingClientRect();
            const x = gsap.utils.clamp(
              -1,
              1,
              ((event.clientX - bounds.left) / bounds.width) * 2 - 1
            );
            const y = gsap.utils.clamp(
              -1,
              1,
              ((event.clientY - bounds.top) / bounds.height) * 2 - 1
            );
            frameX(x * 9);
            frameY(y * 7);
            atmosphereX(x * -1.8);
            atmosphereY(y * -1.3);
          };

          const onPointerLeave = () => {
            frameX(0);
            frameY(0);
            atmosphereX(0);
            atmosphereY(0);
          };

          stage.addEventListener('pointermove', onPointerMove);
          stage.addEventListener('pointerleave', onPointerLeave);

          return () => {
            stage.removeEventListener('pointermove', onPointerMove);
            stage.removeEventListener('pointerleave', onPointerLeave);
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
