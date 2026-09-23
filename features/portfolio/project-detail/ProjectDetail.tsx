'use client';

import Link from 'next/link';
import { useRef } from 'react';
import ProjectVisual from '../projects/ProjectVisual';
import type { Project } from '../projects/data/projects';
import { getStackIcon } from '../projects/data/projectStackIconLogic';
import { useDetailMotion } from './projectDetailMotion';
import HeadingSplit from '../shared/motion/HeadingSplit';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root);
  const galleryItems =
    project.gallery.desktop.length > 0 ? project.gallery.desktop : project.gallery.mobile;
  const coverImage = galleryItems[0];
  const technologies = project.techs.map((technology) => {
    const { Icon, color } = getStackIcon(technology.name);
    return {
      name: technology.name,
      color,
      icon: <Icon aria-hidden="true" />
    };
  });
  const narrativeSections = [
    { label: 'O desafio', body: project.problem },
    { label: 'A solução', body: project.solution },
    { label: 'O que ficou', body: project.summary }
  ];

  return (
    <main ref={root} className={styles.main} tabIndex={-1}>
      <a className={styles.skipLink} href="#projeto-titulo">
        Pular para o conteúdo
      </a>
      <Link className={styles.backButton} href="/">
        ← Voltar
      </Link>

      <section className={styles.heroSection} data-detail-hero>
        <div className={styles.heroVisualContainer} data-detail-visual>
          <div className={styles.heroGrid}>
            <aside className={styles.asideMeta}>
              <div>
                <p className={styles.projectEyebrow}>
                  Projeto / 0{project.id}
                </p>
                <h1
                  id="projeto-titulo"
                  className={styles.projectTitle}
                  data-detail-title
                >
                  {project.name}
                </h1>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <p className={styles.projectSubtitle}>
                  {project.subtitle}
                </p>
              </div>
              <div className={styles.metaSpecs}>
                <div>
                  <span className={styles.metaLabel}>Ano</span>
                  <strong className={styles.metaValue}>{project.year}</strong>
                </div>
                <div>
                  <span className={styles.metaLabel}>Tipo</span>
                  <strong className={styles.metaValue}>{project.title}</strong>
                </div>
                <div className={styles.metaFullWidth}>
                  <span className={styles.metaLabel}>Atuação</span>
                  <strong className={styles.metaValue}>{project.role}</strong>
                </div>
              </div>
            </aside>

            <div className={styles.visualWrapper}>
              <span aria-hidden="true" className={styles.visualBackdropPeach} />
              <span aria-hidden="true" className={styles.visualBackdropBorder} />
              <ProjectVisual
                project={project}
                label={project.subtitle}
                priority
                className={styles.visualContent}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        data-detail-narrative
        className={styles.narrativeSection}
        aria-label={`Leitura do projeto ${project.name}`}
      >
        <div className={styles.narrativeContainer}>
          <div data-detail-narrative-heading className={styles.narrativeLeft}>
            <p className={styles.narrativeEyebrow}>
              01 / Leitura do projeto
            </p>
            <HeadingSplit
              as="h2"
              className={styles.narrativeHeading}
              data-split="lines"
            >
              Do problema ao produto.
            </HeadingSplit>
            <p className={styles.narrativeIntro}>
              {project.subtitle}. Uma leitura direta das decisões que dão forma a {project.name} e
              ao modo como ele responde no uso real.
            </p>

            <figure className={styles.coverFigure}>
              <span className={styles.badgeNumber}>
                {String(project.id).padStart(2, '0')}
              </span>
              <div
                className={styles.coverCard}
                role="img"
                aria-label={coverImage?.alt ?? `Identidade visual do projeto ${project.name}`}
                style={
                  coverImage
                    ? {
                        backgroundImage: `linear-gradient(135deg, rgba(239,174,130,0.14), rgba(37,34,31,0.2)), url("${coverImage.src}")`
                      }
                    : {
                        backgroundImage:
                          'radial-gradient(circle at 75% 24%, rgba(239,174,130,0.9), transparent 28%), linear-gradient(135deg, var(--color-ink), var(--color-lilac))'
                      }
                }
              >
                {!coverImage && (
                  <span className={styles.coverMonogram}>
                    {project.name.slice(0, 1)}
                  </span>
                )}
                <span className={styles.coverLabel}>
                  {coverImage?.label ?? 'Sistema em construção'}
                </span>
              </div>
              <figcaption className={styles.coverCaption}>
                <span>{project.name}</span>
                <span>{project.year}</span>
              </figcaption>
            </figure>
          </div>

          <div data-detail-narrative-copy className={styles.narrativeRight}>
            <div className={styles.articlesList}>
              {narrativeSections.map((section, index) => (
                <article key={section.label} className={styles.articleItem}>
                  <span className={styles.articleIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={styles.articleTitle}>
                      {section.label}
                    </h3>
                    <p className={styles.articleBody}>
                      {section.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.deliverablesGrid}>
              <div>
                <p className={styles.deliverablesHeading}>
                  Sinais de entrega
                </p>
                <ul className={styles.highlightsList} aria-label="Destaques do projeto">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className={styles.highlightTag}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.deliverablesHeading}>
                  Tecnologias
                </p>
                <ul className={styles.techsList} aria-label="Tecnologias utilizadas">
                  {technologies.map((technology) => (
                    <li key={technology.name} className={styles.techItem}>
                      <span
                        className={styles.techIcon}
                        style={{ color: technology.color }}
                        aria-hidden="true"
                      >
                        {technology.icon}
                      </span>
                      <span>{technology.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Navegação do projeto" className={styles.projectActionsNav}>
        <a
          className={styles.actionButton}
          href={project.deploy}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ${project.name} em uma nova guia`}
        >
          Ver projeto ↗
        </a>
        <a
          className={styles.actionButton}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver o código de ${project.name} em uma nova guia`}
        >
          Código ↗
        </a>
      </nav>

      <footer className={styles.footer}>
        <span>Gabriel Nascimento © 2026</span>
        <Link href="/#contato">Próximo papo ↗</Link>
      </footer>
    </main>
  );
}
