'use client';

import { useRef } from 'react';
import styles from './SkillsSection.module.css';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import { useSkillsMotion } from './skillsMotion';

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

  useSkillsMotion({
    section: sectionRef,
    shell: shellRef,
    track: trackRef,
    viewport: viewportRef,
    cards: cardsRef,
    nav: navRef
  });

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

          <nav className={styles.skillsNav} aria-label="Navegação pelas habilidades">
            {skills.map((skill, index) => (
              <button
                key={skill.title}
                ref={(node) => {
                  navRef.current[index] = node;
                }}
                className={`${styles.navButton} ${index === 0 ? styles.navActive : ''}`}
                data-tone={cardTones[index]}
                type="button"
                aria-current={index === 0 ? 'step' : 'false'}
              >
                {skill.title}
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
