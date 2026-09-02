'use client';
import projects, { type Project } from '@/features/portfolio/projects/data/projects';
import Link from 'next/link';
import { useRef, useState } from 'react';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import ProjectCard from './ProjectCard';
import styles from '../styles/ProjectsSection.module.css';
import { useProjectsAgendaMotion, useProjectElastic } from '../motion/projectsAgendaMotion';

export default function ProjectsSection({ items = projects }: { items?: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const [showArchive, setShowArchive] = useState(false);
  const featured = items.slice(0, 4);
  const archived = items.slice(4);
  useProjectsAgendaMotion(root);
  useProjectElastic(root);
  return (
    <section id="projetos" ref={root} className={styles.section} aria-label="Projetos">
      <div className={styles.story}>
        <header className={styles.header}>
          <span>02 / Seleção recente</span>
          <span>4 em foco · {archived.length} no arquivo</span>
        </header>
        <div className={styles.agenda}>
          <div className={styles.cover} data-motion="agenda-enter">
            <HeadingSplit as="h2">
              Meus trabalhos recentes<span>.</span>
            </HeadingSplit>
            <div className={styles.illustration} aria-hidden="true"></div>
            <p>
              Quatro projetos em primeiro plano. Passe pelos dias para ler o recorte de cada
              sistema.
            </p>
          </div>
          <div className={styles.days}>
            {featured.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projetos/${project.slug}`}
                data-motion="agenda-enter project-elastic"
                className={styles.day}
              >
                <span>Case {String(i + 1).padStart(2, '0')}</span>
                <h3>{project.name}</h3>
                <small>
                  {project.year} · {project.title}
                </small>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>

        {archived.length > 0 && (
          <div className={styles.archive} data-motion="agenda-enter">
            <button
              type="button"
              onClick={() => setShowArchive((visible) => !visible)}
              aria-expanded={showArchive}
            >
              {showArchive ? 'Ocultar arquivo' : `Ver mais ${archived.length} projetos`}
            </button>
            {showArchive && (
              <div className={styles.archiveCards}>
                {archived.map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/projetos/${project.slug}`}
                    className={styles.archiveCard}
                  >
                    <span>0{index + 5}</span>
                    <strong>{project.name}</strong>
                    <small>
                      {project.year} · {project.title}
                    </small>
                    <b>↗</b>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.fallback}>
        {items.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
