'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { SPLIT_TEXT_CHAR_INSET, protectSplitTextMasks } from '../shared/motion/splitTextSafety';

// Plugins do detalhe: useGSAP cuida do ciclo de vida React, SplitText divide
// títulos, DrawSVG desenha a rota do hero, CustomEase centraliza a curva e
// ScrollTrigger liga cada timeline à posição do scroll.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin);

const DETAIL_EASE = 'detail-focus';

export function useDetailMotion(root: RefObject<HTMLElement | null>, routeKey: string) {
  useGSAP(
    () => {
      const page = root.current;

      if (!page) return;

      // Cada slug deve iniciar no topo. Guardamos os valores do documento para
      // restaurá-los quando a página de detalhe for desmontada.
      const previousScrollRestoration = window.history.scrollRestoration;
      const rootStyle = document.documentElement.style;
      const previousInlineScrollBehavior = rootStyle.scrollBehavior;
      const forceScrollTop = () => {
        rootStyle.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        rootStyle.scrollBehavior = previousInlineScrollBehavior;
      };

      // Evita que o navegador/Next restaure a posição anterior antes que os
      // pins sejam medidos; o refresh final recalcula toda a geometria.
      window.history.scrollRestoration = 'manual';
      ScrollTrigger.clearScrollMemory('manual');
      forceScrollTop();

      // Mapa dos alvos data-detail-* usados por todas as cenas. Para ajustar
      // uma animação específica, procure primeiro o alvo correspondente no
      // ProjectDetail.tsx e depois o tween que o manipula abaixo.
      const hero = page.querySelector<HTMLElement>('[data-detail-hero]');
      const heroGlow = page.querySelector<HTMLElement>('[data-detail-hero-glow]');
      const heroRoute = page.querySelector<SVGPathElement>('[data-detail-route]');
      const heroTitle = page.querySelector<HTMLElement>('[data-detail-title]');
      const heroMedia = page.querySelector<HTMLElement>('[data-detail-hero-media]');
      const tiltTarget = page.querySelector<HTMLElement>('[data-detail-tilt]');
      const heroCopy = gsap.utils.toArray<HTMLElement>('[data-detail-hero-copy]', page);
      const story = page.querySelector<HTMLElement>('[data-detail-story]');
      const storyPin = page.querySelector<HTMLElement>('[data-detail-story-pin]');
      const storyTrack = page.querySelector<HTMLElement>('[data-detail-story-track]');
      const storyPanels = gsap.utils.toArray<HTMLElement>('[data-detail-story-panel]', page);
      const storyCounter = page.querySelector<HTMLElement>('[data-detail-story-counter]');
      const storyProgress = page.querySelector<HTMLElement>('[data-detail-story-progress]');
      const panelTitles = gsap.utils.toArray<HTMLElement>('[data-detail-panel-title]', page);
      const galleryScenes = gsap.utils.toArray<HTMLElement>('[data-detail-gallery-scene]', page);
      const revealTargets = gsap.utils.toArray<HTMLElement>('[data-detail-reveal]', page);
      const techs = gsap.utils.toArray<HTMLElement>('[data-detail-tech]', page);
      const system = page.querySelector<HTMLElement>('[data-detail-system]');
      const finalSection = page.querySelector<HTMLElement>('[data-detail-final]');
      const finalTitle = page.querySelector<HTMLElement>('[data-detail-final-title]');
      const finalCopy = gsap.utils.toArray<HTMLElement>('[data-detail-final-copy]', page);

      // Falha segura: nenhuma timeline é criada se a estrutura de um detalhe
      // estiver incompleta, evitando animações parciais ou referências nulas.
      if (
        !hero ||
        !heroGlow ||
        !heroRoute ||
        !heroTitle ||
        !heroMedia ||
        !tiltTarget ||
        !story ||
        !storyPin ||
        !storyTrack ||
        !storyCounter ||
        !storyProgress ||
        !system ||
        !finalSection ||
        !finalTitle ||
        storyPanels.length !== 3 ||
        panelTitles.length !== 3
      ) {
        return;
      }

      // Curva editorial compartilhada por reveals e transições de conteúdo.
      // Alterar este path muda a sensação geral do case sem reescrever tweens.
      CustomEase.create(DETAIL_EASE, 'M0,0 C0.16,0.76 0.24,1 1,1');

      // O bloco desktop + movimento normal é desmontado/recriado quando o
      // breakpoint ou a preferência de movimento muda.
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 801px)',
          motion: '(prefers-reduced-motion: no-preference)',
          finePointer: '(pointer: fine)'
        },
        (mediaContext) => {
          const { desktop, motion, finePointer } = mediaContext.conditions ?? {};

          if (!desktop || !motion) return;

          // SplitText cria unidades animáveis e máscaras para o título do hero
          // e para a frase final. O markup original é restaurado no cleanup.
          const heroSplit = SplitText.create(heroTitle, {
            charsClass: 'split-motion-char',
            type: 'words,chars',
            mask: 'chars',
            aria: 'auto'
          });
          const finalSplit = SplitText.create(finalTitle, {
            wordsClass: 'split-motion-word',
            type: 'words',
            mask: 'words',
            aria: 'auto'
          });
          protectSplitTextMasks([heroSplit, finalSplit]);

          // Conteúdo semântico de cada capítulo. Estes quatro alvos são
          // revelados pela mesma timeline que troca os painéis.
          const storyContent = storyPanels.map((panel) => ({
            body: panel.querySelector<HTMLElement>('blockquote, ul'),
            intro: panel.querySelector<HTMLElement>('[data-detail-panel-intro]'),
            number: panel.querySelector<HTMLElement>('[data-detail-panel-number]'),
            title: panel.querySelector<HTMLElement>('[data-detail-panel-title]')
          }));

          // Estados iniciais: todas as propriedades abaixo são preparadas
          // antes do primeiro frame para impedir flash de conteúdo.
          gsap.set(heroSplit.chars, {
            autoAlpha: 0,
            ...SPLIT_TEXT_CHAR_INSET,
            rotate: 4,
            transformOrigin: 'left bottom',
            yPercent: 118
          });
          gsap.set(heroCopy, { autoAlpha: 0, y: 24 });
          gsap.set(heroMedia, {
            autoAlpha: 0,
            clipPath: 'inset(18% 24% 14% 24% round 2rem)',
            rotate: 6,
            scale: 0.84,
            y: 80
          });
          gsap.set(heroRoute, { drawSVG: '0%' });
          gsap.set(storyProgress, { scaleX: 0, transformOrigin: 'left center' });
          gsap.set(finalSplit.words, { autoAlpha: 0, rotate: 2, yPercent: 120 });

          // Mantém o texto de cada capítulo oculto até o scrub alcançar seu
          // label. A entrada é deliberadamente separada em número, intro,
          // título e corpo para permitir ajuste fino de cada etapa.
          storyContent.forEach(({ body, intro, number, title }) => {
            if (intro) gsap.set(intro, { autoAlpha: 0, x: 24, y: 12 });
            if (title) gsap.set(title, { autoAlpha: 0, y: 42 });
            if (body) gsap.set(body, { autoAlpha: 0, x: -24, y: 16 });
            if (number) gsap.set(number, { autoAlpha: 0, rotate: -6, scale: 0.84 });
          });

          // Timeline de entrada automática do hero: acontece uma vez quando o
          // detalhe monta, independente da timeline de scroll do hero.
          const intro = gsap.timeline({ defaults: { ease: DETAIL_EASE } });

          intro
            .to(heroRoute, { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' })
            .to(
              heroSplit.chars,
              {
                autoAlpha: 1,
                duration: 0.8,
                rotate: 0,
                stagger: 0.045,
                yPercent: 0
              },
              0.12
            )
            .to(heroCopy, { autoAlpha: 1, duration: 0.65, stagger: 0.07, y: 0 }, 0.35)
            .to(
              heroMedia,
              {
                autoAlpha: 1,
                clipPath: 'inset(0% 0% 0% 0% round 2rem)',
                duration: 1.15,
                rotate: 0,
                scale: 1,
                y: 0
              },
              0.42
            );

          // Parallax do hero ligado ao intervalo do próprio hero. Como usa
          // scrub, os tweens dentro dele devem permanecer sem easing temporal.
          const heroScroll = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
              invalidateOnRefresh: true
            }
          });

          heroScroll
            .to(heroTitle, { yPercent: -14, ease: 'none' }, 0)
            .to(heroMedia, { rotate: -3, scale: 0.95, yPercent: 16, ease: 'none' }, 0)
            .to(heroGlow, { rotate: 18, scale: 1.2, xPercent: -8, ease: 'none' }, 0)
            .to(heroRoute, { autoAlpha: 0.25, ease: 'none' }, 0.25);

          // O tempo interno dos labels define quando o contador e aria-hidden
          // trocam; os valores são independentes da quantidade de pixels real.
          let activeStoryPanel = 0;
          const chapterTimes = [0, 1.85, 3.7];
          const setActiveStoryPanel = (nextPanel: number) => {
            if (nextPanel === activeStoryPanel) return;

            activeStoryPanel = nextPanel;
            storyPanels.forEach((panel, index) => {
              panel.setAttribute('aria-hidden', String(index !== nextPanel));
            });
            storyCounter.textContent = `0${nextPanel + 1} / 03`;
          };

          // Os painéis ficam empilhados no mesmo palco; apenas um é visível e
          // a transição ocorre com autoAlpha/scale/y, sem deslocar o container.
          gsap.set(storyTrack, { x: 0 });
          gsap.set(storyPanels, {
            autoAlpha: 0,
            scale: 0.975,
            yPercent: 7,
            zIndex: 0
          });
          gsap.set(storyPanels[0], { autoAlpha: 1, scale: 1, yPercent: 0, zIndex: 1 });
          storyPanels.forEach((panel, index) => {
            panel.setAttribute('aria-hidden', String(index !== 0));
          });

          // Timeline principal da história. `pin: story` mantém a seção inteira
          // fixa; `end` cria espaço de leitura e `scrub` liga cada etapa ao
          // scroll, inclusive ao voltar para trás.
          const storyTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              id: 'project-detail-story',
              trigger: story,
              start: 'top top',
              end: () => `+=${Math.max(window.innerHeight * 4.8, 3200)}`,
              pin: story,
              scrub: 0.9,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
              onUpdate: (self) => {
                const currentTime = self.animation?.time() ?? 0;
                const panelIndex =
                  currentTime >= chapterTimes[2] ? 2 : currentTime >= chapterTimes[1] ? 1 : 0;
                setActiveStoryPanel(panelIndex);
              }
            }
          });

          // Agenda o conteúdo dentro do label do capítulo. Como estes tweens
          // pertencem à storyTimeline, a aparição nunca fica atrasada em
          // relação ao painel e também é revertida pelo mesmo scrub.
          const revealPanelContent = (panelIndex: number, label: string, revealOffset: number) => {
            const { body, intro, number, title } = storyContent[panelIndex];

            if (number) {
              storyTimeline.to(
                number,
                {
                  autoAlpha: 0.12,
                  duration: 0.46,
                  ease: DETAIL_EASE,
                  rotate: 0,
                  scale: 1
                },
                `${label}+=${revealOffset}`
              );
            }

            if (intro) {
              storyTimeline.to(
                intro,
                { autoAlpha: 0.68, duration: 0.28, ease: DETAIL_EASE, x: 0, y: 0 },
                `${label}+=${revealOffset + 0.06}`
              );
            }

            if (title) {
              storyTimeline.to(
                title,
                { autoAlpha: 1, duration: 0.46, ease: DETAIL_EASE, y: 0 },
                `${label}+=${revealOffset + 0.16}`
              );
            }

            if (body) {
              storyTimeline.to(
                body,
                { autoAlpha: 1, duration: 0.36, ease: DETAIL_EASE, x: 0, y: 0 },
                `${label}+=${revealOffset + 0.31}`
              );
            }
          };

          // Cada capítulo ocupa uma janela própria: chegada, revelação,
          // progresso e pausa. Ajuste os labels/durations para mudar o respiro
          // da leitura sem tocar nos seletores de conteúdo.
          storyTimeline
            .addLabel('chapter-one', 0)
            .to(storyProgress, { duration: 1.25, scaleX: 0.33 }, 'chapter-one')
            .addLabel('chapter-two', 'chapter-one+=1.25')
            .to(
              storyPanels[0],
              { autoAlpha: 0, duration: 0.42, ease: DETAIL_EASE, scale: 0.97, yPercent: -6 },
              'chapter-two'
            )
            .set(storyPanels[1], { zIndex: 2 }, 'chapter-two')
            .to(
              storyPanels[1],
              { autoAlpha: 1, duration: 0.6, ease: DETAIL_EASE, scale: 1, yPercent: 0 },
              'chapter-two+=0.1'
            )
            .to(storyProgress, { duration: 1.3, scaleX: 0.66 }, 'chapter-two')
            .to({}, { duration: 0.6 }, 'chapter-two+=1.3')
            .addLabel('chapter-three', 'chapter-two+=1.85')
            .to(
              storyPanels[1],
              { autoAlpha: 0, duration: 0.42, ease: DETAIL_EASE, scale: 0.97, yPercent: -6 },
              'chapter-three'
            )
            .set(storyPanels[2], { zIndex: 3 }, 'chapter-three')
            .to(
              storyPanels[2],
              { autoAlpha: 1, duration: 0.6, ease: DETAIL_EASE, scale: 1, yPercent: 0 },
              'chapter-three+=0.1'
            )
            .to(storyProgress, { duration: 1.25, scaleX: 1 }, 'chapter-three')
            .to({}, { duration: 1.15 }, 'chapter-three+=1.25');

          revealPanelContent(0, 'chapter-one', 0.02);
          revealPanelContent(1, 'chapter-two', 0.14);
          revealPanelContent(2, 'chapter-three', 0.14);

          // Reveals pontuais fora da história (metadados e chamadas) usam
          // triggers discretos, pois não precisam ficar pinados.
          revealTargets.forEach((target) => {
            gsap.fromTo(
              target,
              { autoAlpha: 0, filter: 'blur(6px)', y: 52 },
              {
                autoAlpha: 1,
                duration: 0.9,
                ease: DETAIL_EASE,
                filter: 'blur(0px)',
                scrollTrigger: {
                  trigger: target,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse'
                },
                y: 0
              }
            );
          });

          const galleryTimelines: gsap.core.Timeline[] = [];

          // Cada cena da galeria possui duas timelines: `revealTimeline` cuida
          // da chegada visual e `pinTimeline` cria um pin curto para leitura.
          galleryScenes.forEach((scene, index) => {
            const desktopFrame = scene.querySelector<HTMLElement>('[data-detail-desktop-frame]');
            const mobileFrame = scene.querySelector<HTMLElement>('[data-detail-mobile-frame]');
            const copy = scene.querySelector<HTMLElement>('[data-detail-gallery-copy]');
            const desktopImage = desktopFrame?.querySelector<HTMLElement>('img');
            const browserChrome = scene.querySelector<HTMLElement>('[data-detail-browser-chrome]');
            const captions = gsap.utils.toArray<HTMLElement>('[data-detail-frame-caption]', scene);
            const sceneProgress = scene.querySelector<HTMLElement>(
              '[data-detail-gallery-progress]'
            );

            if (
              !desktopFrame ||
              !mobileFrame ||
              !copy ||
              !desktopImage ||
              !browserChrome ||
              !sceneProgress
            ) {
              return;
            }

            gsap.set(sceneProgress, { scaleX: 0, transformOrigin: 'left center' });

            // Entrada da cena ao aproximar-se da viewport: copy, moldura,
            // mobile frame, chrome, captions e imagem entram em paralelo.
            const revealTimeline = gsap.timeline({
              scrollTrigger: {
                id: `project-detail-gallery-reveal-${index + 1}`,
                trigger: scene,
                start: 'top 92%',
                end: 'top 34%',
                scrub: 0.55,
                invalidateOnRefresh: true
              }
            });

            galleryTimelines.push(revealTimeline);

            revealTimeline
              .addLabel('arrive', 0)
              .fromTo(
                copy,
                { autoAlpha: 0, x: -32 },
                { autoAlpha: 1, duration: 0.34, ease: DETAIL_EASE, x: 0 },
                'arrive'
              )
              .fromTo(
                desktopFrame,
                {
                  clipPath: 'inset(14% 18% 18% 18% round 1.65rem)',
                  rotate: index % 2 === 0 ? 3.5 : -3.5,
                  scale: 0.9,
                  y: 90
                },
                {
                  clipPath: 'inset(0% 0% 0% 0% round 1.65rem)',
                  duration: 0.58,
                  ease: DETAIL_EASE,
                  rotate: 0,
                  scale: 1,
                  y: 0
                },
                'arrive+=0.04'
              )
              .fromTo(
                mobileFrame,
                { autoAlpha: 0, rotate: index % 2 === 0 ? -18 : 18, scale: 0.72, y: 190 },
                {
                  autoAlpha: 1,
                  duration: 0.46,
                  ease: DETAIL_EASE,
                  rotate: -5,
                  scale: 1,
                  y: 0
                },
                'arrive+=0.12'
              )
              .fromTo(
                browserChrome,
                { autoAlpha: 0, x: 24 },
                { autoAlpha: 1, duration: 0.32, ease: DETAIL_EASE, x: 0 },
                'arrive+=0.1'
              )
              .fromTo(
                captions,
                { autoAlpha: 0, scale: 0.82, y: 14 },
                {
                  autoAlpha: 1,
                  duration: 0.3,
                  ease: DETAIL_EASE,
                  scale: 1,
                  stagger: 0.06,
                  y: 0
                },
                'arrive+=0.2'
              )
              .fromTo(
                desktopImage,
                { scale: 1.06, yPercent: -1.5 },
                {
                  duration: 0.86,
                  scale: 1.02,
                  yPercent: 1.2
                },
                'arrive+=0.04'
              );

            // Pin rápido independente para que a composição fique estável por
            // alguns pixels e todos os detalhes possam ser lidos com calma.
            const pinTimeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                id: `project-detail-gallery-pin-${index + 1}`,
                trigger: scene,
                start: 'top 4%',
                end: () => `+=${gsap.utils.clamp(420, 680, window.innerHeight * 0.62)}`,
                pin: scene,
                pinSpacing: true,
                scrub: 0.72,
                anticipatePin: 1,
                invalidateOnRefresh: true
              }
            });

            pinTimeline
              .to(sceneProgress, { duration: 1, scaleX: 1 }, 0)
              .to(desktopImage, { duration: 1, scale: 1, yPercent: 0 }, 0);

            galleryTimelines.push(pinTimeline);
          });

          // Tecnologias entram em stagger aleatório para quebrar a rigidez da
          // lista sem alterar sua ordem semântica no DOM.
          if (techs.length) {
            gsap.fromTo(
              techs,
              { autoAlpha: 0, rotationX: -72, scale: 0.72, y: 64 },
              {
                autoAlpha: 1,
                duration: 0.8,
                ease: 'back.out(1.35)',
                rotationX: 0,
                scale: 1,
                scrollTrigger: {
                  trigger: system,
                  start: 'top 62%',
                  toggleActions: 'play none none reverse'
                },
                stagger: { amount: 0.48, from: 'random' },
                y: 0
              }
            );
          }

          // Encerramento do case: título dividido em palavras e copy final
          // entram juntos, com pequeno overlap para manter o ritmo editorial.
          const finalTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: finalSection,
              start: 'top 68%',
              toggleActions: 'play none none reverse'
            }
          });

          finalTimeline
            .to(finalSplit.words, {
              autoAlpha: 1,
              duration: 0.75,
              ease: DETAIL_EASE,
              rotate: 0,
              stagger: 0.06,
              yPercent: 0
            })
            .fromTo(
              finalCopy,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, duration: 0.6, ease: DETAIL_EASE, stagger: 0.09, y: 0 },
              '-=0.32'
            );

          let removePointerMotion = () => {};

          // Tilt de ponteiro é um detalhe opcional de desktop. quickTo mantém
          // apenas um tween por eixo, reduzindo custo em pointermove.
          if (finePointer) {
            const tiltX = gsap.quickTo(tiltTarget, 'rotationY', {
              duration: 0.8,
              ease: 'power3.out',
              overwrite: 'auto'
            });
            const tiltY = gsap.quickTo(tiltTarget, 'rotationX', {
              duration: 0.8,
              ease: 'power3.out',
              overwrite: 'auto'
            });

            const onPointerMove = (event: PointerEvent) => {
              const bounds = heroMedia.getBoundingClientRect();
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

              tiltX(x * 5);
              tiltY(y * -4);
            };
            const onPointerLeave = () => {
              tiltX(0);
              tiltY(0);
            };

            heroMedia.addEventListener('pointermove', onPointerMove);
            heroMedia.addEventListener('pointerleave', onPointerLeave);
            removePointerMotion = () => {
              heroMedia.removeEventListener('pointermove', onPointerMove);
              heroMedia.removeEventListener('pointerleave', onPointerLeave);
            };
          }

          // Limpa timelines, listeners e instâncias de SplitText criadas neste
          // breakpoint antes que outra execução do media context seja ativada.
          return () => {
            removePointerMotion();
            intro.kill();
            heroScroll.kill();
            storyTimeline.kill();
            galleryTimelines.forEach((timeline) => timeline.kill());
            finalTimeline.kill();
            heroSplit.revert();
            finalSplit.revert();
          };
        }
      );

      // Uma medida após o primeiro layout garante que imagens, pins e a rota
      // do hero usem as dimensões reais da página do slug atual.
      const refreshFrame = window.requestAnimationFrame(() => {
        forceScrollTop();
        ScrollTrigger.refresh();
      });

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        media.revert();
        window.history.scrollRestoration = previousScrollRestoration;
        rootStyle.scrollBehavior = previousInlineScrollBehavior;
      };
    },
    { scope: root, dependencies: [routeKey], revertOnUpdate: true }
  );
}
