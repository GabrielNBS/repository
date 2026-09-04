'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, type CSSProperties } from 'react';
import type { Project } from '@/features/portfolio/projects/data/projects';
import ProjectVisual from '../projects/ProjectVisual';
import styles from './ProjectDetail.module.css';
import { useDetailMotion } from './projectDetailMotion';

const tones = ['peach', 'lilac', 'cream', 'rose'] as const;

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const tone = tones[(project.id - 1) % tones.length];
  const galleryCount = Math.max(project.gallery.desktop.length, project.gallery.mobile.length);
  const galleryFrames = Array.from({ length: galleryCount }, (_, index) => {
    const desktop = project.gallery.desktop[index] ?? project.gallery.mobile[index];
    const mobile = project.gallery.mobile[index] ?? desktop;

    return desktop && mobile ? { desktop, mobile } : null;
  }).filter((frame): frame is NonNullable<typeof frame> => Boolean(frame));

  useDetailMotion(root, project.slug);

  return (
    <main
      ref={root}
      className={styles.page}
      data-project-tone={tone}
      data-project-slug={project.slug}
      tabIndex={-1}
    >
      <a className={styles.skipLink} href="#projeto-titulo">
        Pular para o conteúdo
      </a>

      <nav className={styles.floatingNav} aria-label="Navegação do projeto">
        <Link href="/#projetos">← Projetos</Link>
        <span>{project.year}</span>
        <span>Case 0{project.id}</span>
      </nav>

      <section className={styles.hero} data-detail-hero aria-labelledby="projeto-titulo">
        <div className={styles.heroGlow} aria-hidden="true" data-detail-hero-glow />
        <svg className={styles.heroRoute} viewBox="0 0 1200 760" aria-hidden="true">
          <path
            data-detail-route
            d="M-40 596C126 454 224 662 392 540C560 418 490 212 696 218C898 224 894 486 1074 392C1158 348 1192 256 1250 116"
          />
        </svg>

        <header className={styles.heroHeader} data-detail-hero-copy>
          <span>Projeto / 0{project.id}</span>
          <span>{project.subtitle}</span>
        </header>

        <div className={styles.heroCopy}>
          <p className={styles.heroKicker} data-detail-hero-copy>
            {project.title}
          </p>
          <h1 id="projeto-titulo" data-detail-title>
            {project.name}
          </h1>
          <p className={styles.heroSummary} data-detail-hero-copy>
            {project.summary}
          </p>
        </div>

        <div className={styles.heroMedia} data-detail-hero-media>
          <div className={styles.heroMediaFrame} data-detail-tilt>
            {project.gallery.desktop[0] ? (
              <Image
                src={project.gallery.desktop[0].src}
                alt={project.gallery.desktop[0].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 800px) 100vw, 48vw"
                priority
              />
            ) : (
              <ProjectVisual project={project} label={project.subtitle} />
            )}
            <span className={styles.mediaLabel}>Interface em foco</span>
          </div>
        </div>

        <dl className={styles.heroFacts} data-detail-hero-copy>
          <div>
            <dt>Ano</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Atuação</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd>{project.title}</dd>
          </div>
        </dl>

        <div className={styles.heroActions} data-detail-hero-copy>
          <a href={project.deploy} target="_blank" rel="noopener noreferrer">
            Ver projeto <span>↗</span>
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            Código <span>↗</span>
          </a>
        </div>

        <p className={styles.scrollCue} aria-hidden="true" data-detail-hero-copy>
          Role para abrir o case
        </p>
      </section>

      <section
        className={styles.story}
        data-detail-story
        aria-label={`História do projeto ${project.name}`}
      >
        <div className={styles.storyPin} data-detail-story-pin>
          <header className={styles.storyChrome}>
            <span>Do problema ao produto</span>
            <span data-detail-story-counter>01 / 03</span>
          </header>

          <div className={styles.storyTrack} data-detail-story-track>
            <article className={styles.storyPanel} data-detail-story-panel>
              <span className={styles.panelNumber} data-detail-panel-number>
                01
              </span>
              <div className={styles.panelLabel}>Ponto de partida</div>
              <div className={styles.panelContent}>
                <p className={styles.panelIntro} data-detail-panel-intro>
                  {project.description}
                </p>
                <h2 data-detail-panel-title>O problema precisava caber em uma frase.</h2>
                <blockquote>{project.problem}</blockquote>
              </div>
              <span className={styles.panelSide}>{project.subtitle}</span>
            </article>

            <article className={styles.storyPanel} data-detail-story-panel>
              <span className={styles.panelNumber} data-detail-panel-number>
                02
              </span>
              <div className={styles.panelLabel}>Decisão de projeto</div>
              <div className={styles.panelContent}>
                <p className={styles.panelIntro} data-detail-panel-intro>
                  {project.role}
                </p>
                <h2 data-detail-panel-title>A resposta virou sistema.</h2>
                <blockquote>{project.solution}</blockquote>
              </div>
              <span className={styles.panelSide}>{project.title}</span>
            </article>

            <article className={styles.storyPanel} data-detail-story-panel>
              <span className={styles.panelNumber} data-detail-panel-number>
                03
              </span>
              <div className={styles.panelLabel}>O que permanece</div>
              <div className={styles.panelContent}>
                <p className={styles.panelIntro} data-detail-panel-intro>
                  {project.summary}
                </p>
                <h2 data-detail-panel-title>Resultado que pode ser reconhecido.</h2>
                <ul className={styles.highlights} aria-label="Destaques do projeto">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <span className={styles.panelSide}>{project.year}</span>
            </article>
          </div>

          <div className={styles.storyProgress} aria-hidden="true">
            <i data-detail-story-progress />
          </div>
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="gallery-title">
        <header className={styles.sectionHeader} data-detail-reveal>
          <span>Capturas / {String(galleryFrames.length).padStart(2, '0')}</span>
          <h2 id="gallery-title">A interface em movimento.</h2>
          <p>Desktop e mobile contam o mesmo sistema em escalas diferentes.</p>
        </header>

        {galleryFrames.length > 0 ? (
          <div className={styles.galleryList}>
            {galleryFrames.map(({ desktop, mobile }, index) => (
              <article
                className={styles.galleryScene}
                data-detail-gallery-scene
                key={`${desktop.src}-${mobile.src}`}
              >
                <div className={styles.galleryMeta} data-detail-gallery-copy>
                  <span>Frame {String(index + 1).padStart(2, '0')}</span>
                  <h3>{desktop.label}</h3>
                  <p>{desktop.alt}</p>
                </div>

                <figure className={styles.desktopFrame} data-detail-desktop-frame>
                  <div data-detail-browser-chrome>
                    <span />
                    <span />
                    <span />
                    <b>{project.slug}</b>
                  </div>
                  <Image
                    src={desktop.src}
                    alt={desktop.alt}
                    width={1600}
                    height={1067}
                    sizes="(max-width: 800px) 100vw, 78vw"
                  />
                  <figcaption data-detail-frame-caption>{desktop.label} / Desktop</figcaption>
                </figure>

                <figure className={styles.mobileFrame} data-detail-mobile-frame>
                  <div aria-hidden="true" />
                  <Image
                    src={mobile.src}
                    alt={mobile.alt}
                    width={600}
                    height={1091}
                    sizes="(max-width: 800px) 55vw, 19vw"
                  />
                  <figcaption data-detail-frame-caption>{mobile.label} / Mobile</figcaption>
                </figure>

                <div className={styles.sceneHold} aria-hidden="true">
                  <span>
                    Leitura {String(index + 1).padStart(2, '0')} /{' '}
                    {String(galleryFrames.length).padStart(2, '0')}
                  </span>
                  <i>
                    <b data-detail-gallery-progress />
                  </i>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.galleryFallback} data-detail-reveal>
            <ProjectVisual project={project} label={project.subtitle} />
            <div>
              <span>Registro em construção</span>
              <h3>{project.name} já funciona. A documentação visual vem depois.</h3>
              <p>{project.description}</p>
            </div>
          </div>
        )}
      </section>

      <section className={styles.system} data-detail-system aria-labelledby="system-title">
        <div className={styles.systemIntro} data-detail-reveal>
          <span>Ficha técnica</span>
          <h2 id="system-title">O que sustenta a experiência.</h2>
          <p>{project.solution}</p>
        </div>

        <div className={styles.techCloud} aria-label="Tecnologias usadas">
          {project.techs.map((tech, index) => (
            <span
              key={tech.name}
              data-detail-tech
              style={{ '--tech-index': index } as CSSProperties}
            >
              {tech.name}
            </span>
          ))}
        </div>

        <dl className={styles.systemFacts} data-detail-reveal>
          <div>
            <dt>Projeto</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt>Categoria</dt>
            <dd>{project.title}</dd>
          </div>
          <div>
            <dt>Escopo</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Identificador</dt>
            <dd>/{project.slug}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.final} data-detail-final>
        <span data-detail-final-copy>
          Case 0{project.id} / {project.year}
        </span>
        <h2 data-detail-final-title>
          Quer ver o sistema
          <br />
          <em>funcionando de verdade?</em>
        </h2>
        <p data-detail-final-copy>{project.summary}</p>
        <div className={styles.finalActions} data-detail-final-copy>
          <a href={project.deploy} target="_blank" rel="noopener noreferrer">
            Abrir {project.name} ↗
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            Explorar código ↗
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Gabriel Nascimento © 2026</span>
        <Link href="/#projetos">Todos os projetos</Link>
        <Link href="/#contato">Próximo papo ↗</Link>
      </footer>
    </main>
  );
}
