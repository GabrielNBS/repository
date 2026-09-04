'use client';
import projects, { type Project } from '@/features/portfolio/projects/data/projects';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import ProjectCard from '../../projects/ProjectCard';
import ProjectShaderGradient from '../../projects/ProjectShaderGradientLazy';
import { getProjectTone } from '../../projects/data/projectTone';
import { useProjectCursor } from '../../projects/cursor/ProjectCursorProvider';
import styles from './ProjectsSection.module.css';
import { useProjectsAgendaMotion, useProjectElastic } from './projectsAgendaMotion';

export default function ProjectsSection({ items = projects }: { items?: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const [showArchive, setShowArchive] = useState(false);
  const featured = items.slice(0, 4);
  const archived = items.slice(4);
  const { onProjectPointerEnter, onProjectPointerLeave, onProjectPointerMove } = useProjectCursor();
  // Os hooks montam a entrada da agenda e a resposta elástica individual de
  // cada card, sempre limitadas ao root desta seção.
  useProjectsAgendaMotion(root);
  useProjectElastic(root);

  useEffect(() => {
    // A abertura do arquivo muda a altura do layout. O refresh no próximo
    // frame deixa o DOM estabilizar antes de recalcular os ScrollTriggers.
    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(refreshFrame);
  }, [showArchive]);

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
            <div className={styles.illustration} aria-hidden="true" data-motion="projects-lamp">
              <span className={styles.lampCord} />
              <span className={styles.lampArm} />
              <span className={styles.lampShade} />
              <span className={styles.lampBulb} />
              <span className={styles.lampPool} />
            </div>
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
                aria-label={`Abrir detalhes do projeto ${project.name}`}
                onPointerEnter={(event) => onProjectPointerEnter(event, project)}
                onPointerLeave={onProjectPointerLeave}
                onPointerMove={onProjectPointerMove}
              >
                <ProjectShaderGradient
                  className={styles.dayShader}
                  tone={getProjectTone(project.id)}
                />
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
                    aria-label={`Abrir detalhes do projeto ${project.name}`}
                    onPointerEnter={(event) => onProjectPointerEnter(event, project)}
                    onPointerLeave={onProjectPointerLeave}
                    onPointerMove={onProjectPointerMove}
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
