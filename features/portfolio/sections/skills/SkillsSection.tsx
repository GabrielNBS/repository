'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from './SkillsSection.module.css';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import { useSkillsMotion } from './skillsMotion';
import { useNearViewport } from '../../shared/motion/useNearViewport';

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

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const navRef = useRef<Array<HTMLButtonElement | null>>([]);
  const nearViewport = useNearViewport(sectionRef);

  const navigateToSkill = useSkillsMotion({
    section: sectionRef,
    shell: shellRef,
    track: trackRef,
    viewport: viewportRef,
    cards: cardsRef,
    nav: navRef,
    nearViewport
  });

  return (
    <section ref={sectionRef} className={styles.section} id="skills" aria-labelledby="skills-title">
      <noscript>
        <style>{`@media (max-width: 800px) { #skills [data-near-viewport] { overflow-x: auto; overflow-y: hidden; } }`}</style>
      </noscript>
      <div ref={shellRef} className={styles.sectionShell}>
        <div className={styles.aside}>
          <p className={styles.eyebrow}>04 / Como construo</p>
          <HeadingSplit
            as="h2"
            className={styles.asideTitle}
            id="skills-title"
            data-motion="text-split"
            toggleActions={false}
          >
            Muito mais que trocar a cor de um botão
          </HeadingSplit>

          <nav className={styles.skillsNav} aria-label="Navegação pelas habilidades">
            {skills.map((skill, index) => (
              <button
                key={skill.title}
                ref={(node) => {
                  navRef.current[index] = node;
                }}
                className={`${styles.navButton} ${index === 0 ? styles.navActive : ''}`}
                data-variant={cardTones[index]}
                type="button"
                aria-current={index === 0 ? 'step' : 'false'}
                onClick={() => navigateToSkill(index)}
              >
                {skill.title}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.stage}>
          <svg
            className={styles.paperPortal}
            viewBox="0 0 80 600"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className={styles.portalShadow}
              d="M0 0H64L55 32 63 61 48 96 58 130 45 170 55 206 42 247 51 281 40 320 52 356 43 390 58 431 49 464 62 501 53 537 65 570 58 600H0Z"
            />
            <path
              className={styles.portalBack}
              d="M0 0H54L45 32 53 61 38 96 48 130 35 170 45 206 32 247 41 281 30 320 42 356 33 390 48 431 39 464 52 501 43 537 55 570 48 600H0Z"
            />
            <path
              className={styles.portalFront}
              d="M0 0H34L40 28 28 58 36 92 24 124 31 162 20 199 29 238 18 272 25 309 16 348 28 384 21 420 34 455 26 489 39 528 30 564 38 600H0Z"
            />
          </svg>
          <div ref={viewportRef} className={styles.cardViewport} data-near-viewport={nearViewport}>
            <div
              ref={trackRef}
              className={styles.cardsTrack}
              role="region"
              aria-label="Camadas do trabalho front-end"
            >
              {skills.map((skill, index) => (
                <article
                  key={skill.title}
                  ref={(node) => {
                    cardsRef.current[index] = node;
                  }}
                  className={`${styles.card} ${index === 0 ? styles.cardActive : ''}`}
                  data-variant={cardTones[index]}
                  tabIndex={0}
                  aria-roledescription="cartão"
                  aria-label={`${skill.title}: ${skill.description}`}
                >
                  <div className={styles.cardSurface}>
                    <div className={styles.cardVisual}>
                      <span className={styles.cardMark} aria-hidden="true">
                        0{index + 1}.
                      </span>
                      <Image
                        className={styles.cardPoster}
                        src={skill.video.replace('.mp4', '-poster.webp')}
                        alt=""
                        fill
                        sizes="(max-width: 800px) 80vw, 360px"
                      />
                      <video
                        className={styles.cardVideo}
                        data-src={skill.video}
                        loop
                        muted
                        playsInline
                        preload="none"
                        aria-hidden="true"
                      />
                    </div>
                    <div className={styles.cardCopy}>
                      <h3 className={styles.cardTitle}>{skill.title}</h3>
                      <p className={styles.cardDescription}>{skill.description}</p>
                    </div>
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
