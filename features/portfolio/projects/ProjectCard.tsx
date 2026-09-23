'use client';

import Link from 'next/link';
import type { Project } from '@/features/portfolio/projects/data/projects';
import ProjectVisual from './ProjectVisual';
import { useProjectCursor } from './cursor/ProjectCursorProvider';
import ProjectStackIcons from './ProjectStackIcons';
import styles from './ProjectCard.module.css';

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { onProjectPointerEnter, onProjectPointerLeave, onProjectPointerMove } = useProjectCursor();

  return (
    <Link
      className={styles.link}
      href={`/projetos/${project.slug}`}
      aria-label={`Abrir detalhes do projeto ${project.name}. Tecnologias: ${project.techs.map((tech) => tech.name).join(', ')}`}
      onPointerEnter={(event) => onProjectPointerEnter(event, project)}
      onPointerLeave={onProjectPointerLeave}
      onPointerMove={onProjectPointerMove}
    >
      <article
        className={`${styles.card} ${index % 2 === 1 ? styles.offset : ''}`}
        data-component="project-card"
        data-variant={['peach', 'lilac', 'cream', 'rose'][index % 4]}
      >
        <div className={styles.content}>
          <div>
            <div className={styles.meta}>
              <span className={styles.projectNumber}>
                Projeto / 0{index + 1}
              </span>
              <span className={styles.year}>
                {project.year}
              </span>
            </div>
            <h3 className={styles.title}>
              {project.name}
            </h3>
            <p className={styles.description}>
              {project.description}
            </p>
          </div>
          <div className={styles.actions}>
            <ProjectStackIcons stacks={project.techs} />
            <span
              className={styles.details}
              aria-hidden="true"
            >
              Detalhes <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
        <ProjectVisual project={project} className={styles.visual} priority={index === 0} />
      </article>
    </Link>
  );
}
