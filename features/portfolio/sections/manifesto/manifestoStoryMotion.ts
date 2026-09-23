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

      // As cores vêm dos tokens globais, para que a timeline acompanhe a
      // identidade visual sem duplicar hexadecimais no código de animação.
      const color = (token: string) => getComputedStyle(section).getPropertyValue(token).trim();
      const palette = {
        paper: color('--color-paper'),
        lilac: color('--color-lilac'),
        peach: color('--color-peach'),
        cream: color('--color-cream')
      };

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
            .addLabel('rhythm:prepare', 'rhythm')
            .addLabel('rhythm:surface', 'rhythm+=0.18')
            .addLabel('rhythm:content', 'rhythm+=0.28')
            .addLabel('rhythm:settle', 'rhythm+=0.72')
            .to(
              titleWords[0],
              { autoAlpha: 0, rotate: -2, yPercent: -115, duration: 0.38, stagger: 0.025 },
              'rhythm:prepare'
            )
            // O próximo beat precisa cobrir o teaser antes do anterior perder
            // opacidade. Um fade cruzado deixava ambos parcialmente
            // transparentes por alguns frames e revelava a mídia de fundo.
            // A variável também é a tinta dos três furos; como pertence a esta
            // timeline scrubbada, sua troca acompanha o scroll sem saltos.
            .set(
              beats[1],
              {
                autoAlpha: 1,
                backgroundColor: palette.paper,
                '--beat-underlay': palette.lilac
              },
              'rhythm:surface'
            )
            .to(
              beats[1],
              {
                backgroundColor: palette.lilac,
                '--beat-underlay': palette.peach,
                duration: 0.48,
                ease: 'power1.inOut'
              },
              'rhythm:surface'
            )
            .to(beats[0], { autoAlpha: 0, duration: 0.3 }, 'rhythm:surface')
            .to(
              titleWords[1],
              { autoAlpha: 1, rotate: 0, yPercent: 0, duration: 0.55, stagger: 0.05 },
              'rhythm:content'
            )
            .fromTo(
              beats[1].querySelectorAll('p'),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
              'rhythm:content+=0.1'
            )
            // MorphSVG muda a silhueta do blob de ritmo para forma sem trocar
            // o elemento; isso mantém o fluxo visual e o DOM estáveis.
            .to(
              blob,
              { morphSVG: { shape: rhythmShape, type: 'rotational' }, duration: 1.05 },
              'rhythm:prepare'
            )
            .to(frame, { y: -14, rotate: 1.2, duration: 0.65 }, 'rhythm:prepare')
            .to(
              cards[0],
              {
                x: -48,
                y: 30,
                rotate: -6.4,
                scale: 0.968,
                backgroundColor: palette.peach,
                duration: 0.72
              },
              'rhythm:prepare'
            )
            .to(
              cards[1],
              {
                x: 34,
                y: 18,
                rotate: 4.8,
                scale: 0.985,
                backgroundColor: palette.cream,
                duration: 0.72
              },
              'rhythm:prepare+=0.04'
            )
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
              'rhythm:prepare'
            )
            .to(progress, { scaleX: 0.68, duration: 1.2, ease: 'none' }, 'rhythm')
            .addLabel('form', 'rhythm+=1.5')
            .addLabel('form:prepare', 'form')
            .addLabel('form:surface', 'form+=0.18')
            .addLabel('form:content', 'form+=0.28')
            .addLabel('form:settle', 'form+=0.72')
            .to(
              titleWords[1],
              { autoAlpha: 0, rotate: -2, yPercent: -115, duration: 0.38, stagger: 0.025 },
              'form:prepare'
            )
            // Mantém uma superfície opaca sobre o teaser também na segunda
            // troca; o texto seguinte continua entrando pela timeline abaixo.
            .set(
              beats[2],
              {
                autoAlpha: 1,
                backgroundColor: palette.lilac,
                '--beat-underlay': palette.peach
              },
              'form:surface'
            )
            .to(
              beats[2],
              {
                backgroundColor: palette.peach,
                '--beat-underlay': palette.cream,
                duration: 0.48,
                ease: 'power1.inOut'
              },
              'form:surface'
            )
            .to(beats[1], { autoAlpha: 0, duration: 0.3 }, 'form:surface')
            .to(
              titleWords[2],
              { autoAlpha: 1, rotate: 0, yPercent: 0, duration: 0.55, stagger: 0.05 },
              'form:content'
            )
            .fromTo(
              beats[2].querySelectorAll('p'),
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
              'form:content+=0.1'
            )
            .to(
              blob,
              { morphSVG: { shape: formShape, type: 'rotational' }, duration: 1.05 },
              'form:prepare'
            )
            .to(frame, { y: 0, rotate: -0.7, duration: 0.72 }, 'form:prepare')
            .to(
              cards[0],
              {
                x: -56,
                y: 34,
                rotate: -7,
                scale: 0.964,
                backgroundColor: palette.cream,
                duration: 0.72
              },
              'form:prepare'
            )
            .to(
              cards[1],
              {
                x: 38,
                y: 20,
                rotate: 5.6,
                scale: 0.98,
                backgroundColor: palette.paper,
                duration: 0.72
              },
              'form:prepare+=0.04'
            )
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
              'form:prepare'
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
    },
    { scope: root }
  );
}
