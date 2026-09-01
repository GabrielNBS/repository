'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SkillsSection.module.css';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import projects from '@/features/portfolio/projects/data/projects';

interface Skill {
  title: string;
  description: string;
  video: string;
}

const skills: Skill[] = [
  {
    title: 'React & Next.js',
    video: '/videos/skills/react-next.mp4',
    description:
      'Construo interfaces componentizadas, rotas claras e experiências que sustentam produto, não só páginas.'
  },
  {
    title: 'TypeScript em escala',
    video: '/videos/skills/typescript.mp4',
    description:
      'Transformo contratos, props e dados em segurança para evoluir o código com menos surpresa.'
  },
  {
    title: 'Performance Web',
    video: '/videos/skills/performance.mp4',
    description:
      'Otimizo carregamento, renderização e imagens para a interface responder antes de pedir atenção.'
  },
  {
    title: 'Design Systems',
    video: '/videos/skills/design-system.mp4',
    description:
      'Crio padrões reutilizáveis que dão consistência ao produto sem apagar o contexto de cada tela.'
  },
  {
    title: 'Acessibilidade',
    video: '/videos/skills/accessibility.mp4',
    description:
      'Faço semântica, foco, teclado e contraste participarem da experiência desde o primeiro componente.'
  },
  {
    title: 'Frontend com IA',
    video: '/videos/skills/ai-frontend.mp4',
    description:
      'Uso IA para explorar, testar e acelerar decisões, mantendo critério humano sobre código e produto.'
  }
];

const cardTones = ['peach', 'lilac', 'rose', 'cream', 'lilac', 'peach'] as const;
const projectNames = projects.slice(0, skills.length).map((project) => project.name);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const navRef = useRef<Array<HTMLButtonElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const shell = shellRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const navItems = navRef.current.filter(Boolean) as HTMLButtonElement[];

      if (!section || !shell || !track || !viewport || cards.length < 2) return undefined;

      const videos = Array.from(section.querySelectorAll<HTMLVideoElement>(`.${styles.cardVideo}`));

      gsap.registerPlugin(ScrollTrigger);

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

      const measure = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        step = cardWidth + gap;
        maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);
        pinDistance = maxTranslate + window.innerHeight * lastCardBreath;
        section.style.setProperty('--skills-scroll-distance', `${pinDistance}px`);
      };

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

        gsap.set(track, { x: -position });

        if (indexChanged || immediate) setActive(nextIndex, !immediate);
      };

      const scrollToIndex = (index: number) => {
        if (window.matchMedia('(max-width: 800px)').matches) {
          cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setActive(index, true);
          return;
        }

        const scrollDistance = section.offsetHeight - window.innerHeight;
        const target = section.offsetTop + scrollDistance * (index / (cards.length - 1));
        window.scrollTo({ top: target, behavior: 'smooth' });
      };

      measure();

      const scrollTrigger = ScrollTrigger.create({
        id: 'skills-horizontal-track',
        trigger: section,
        start: 'top top',
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

      const onResize = () => {
        measure();
        if (window.matchMedia('(max-width: 800px)').matches) {
          gsap.set(track, { clearProps: 'transform' });
          setActive(activeIndex, false);
        } else {
          setPosition(Math.min(maxTranslate, scrollTrigger.progress * pinDistance), true);
        }
        ScrollTrigger.refresh();
      };

      const onPointerDown = (event: PointerEvent) => {
        if (window.matchMedia('(max-width: 800px)').matches || event.button !== 0) return;
        dragging = true;
        dragStartX = event.clientX;
        dragStartPosition = position;
        shell.classList.add(styles.isDragging);
        shell.setPointerCapture(event.pointerId);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!dragging || !step) return;
        const nextPosition = dragStartPosition - (event.clientX - dragStartX);
        setPosition(nextPosition, true);
      };

      const onPointerUp = () => {
        if (!dragging) return;
        dragging = false;
        shell.classList.remove(styles.isDragging);
        const nearestIndex = maxTranslate
          ? Math.round((position / maxTranslate) * (cards.length - 1))
          : 0;
        scrollToIndex(nearestIndex);
      };

      const navClickHandlers = navItems.map((item, index) => {
        const handler = () => scrollToIndex(index);
        item.addEventListener('click', handler);
        return { item, handler };
      });
      shell.addEventListener('pointerdown', onPointerDown);
      shell.addEventListener('pointermove', onPointerMove);
      shell.addEventListener('pointerup', onPointerUp);
      shell.addEventListener('pointercancel', onPointerUp);
      window.addEventListener('resize', onResize);
      reduceMotionQuery.addEventListener('change', syncVideoMotion);

      setPosition(0, true);

      return () => {
        navClickHandlers.forEach(({ item, handler }) => item.removeEventListener('click', handler));
        shell.removeEventListener('pointerdown', onPointerDown);
        shell.removeEventListener('pointermove', onPointerMove);
        shell.removeEventListener('pointerup', onPointerUp);
        shell.removeEventListener('pointercancel', onPointerUp);
        window.removeEventListener('resize', onResize);
        reduceMotionQuery.removeEventListener('change', syncVideoMotion);
        scrollTrigger.kill();
        section.style.removeProperty('--skills-scroll-distance');
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} className={styles.section} id="skills" aria-labelledby="skills-title">
      <div ref={shellRef} className={styles.sectionShell} data-blur-reveal>
        <div className={styles.aside}>
          <p className={styles.eyebrow}>04 / Como construo</p>
          <HeadingSplit
            as="h2"
            className={styles.asideTitle}
            id="skills-title"
            data-split="lines"
            toggleActions={false}
          >
            Muito mais que trocar a cor de um botão.
          </HeadingSplit>

          <nav className={styles.skillsNav} aria-label="Projetos relacionados às skills">
            {projectNames.map((projectName, index) => (
              <button
                key={projectName}
                ref={(node) => {
                  navRef.current[index] = node;
                }}
                className={`${styles.navButton} ${index === 0 ? styles.navActive : ''}`}
                data-tone={cardTones[index]}
                type="button"
                aria-current={index === 0 ? 'step' : 'false'}
              >
                {projectName}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.stage}>
          <div ref={viewportRef} className={styles.cardViewport}>
            <div
              ref={trackRef}
              className={styles.cardsTrack}
              aria-label="Camadas do trabalho front-end"
            >
              {skills.map((skill, index) => (
                <article
                  key={skill.title}
                  ref={(node) => {
                    cardsRef.current[index] = node;
                  }}
                  className={`${styles.card} ${index === 0 ? styles.cardActive : ''}`}
                  data-tone={cardTones[index]}
                  tabIndex={0}
                  aria-label={`${skill.title}: ${skill.description}`}
                >
                  <div className={styles.cardVisual}>
                    <span className={styles.cardMark} aria-hidden="true">
                      0{index + 1}.
                    </span>
                    <video
                      className={styles.cardVideo}
                      src={skill.video}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.cardCopy}>
                    <h3 className={styles.cardTitle}>{skill.title}</h3>
                    <p className={styles.cardDescription}>{skill.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
