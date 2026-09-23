'use client';

import type { Project } from '@/features/portfolio/projects/data/projects';
import { getProjectTeaser } from '@/features/portfolio/projects/data/projects';
import { getProjectTone } from './data/projectTone';
import ProjectTeaser from './ProjectTeaser';
import styles from './ProjectVisual.module.css';

type ProjectVisualProps = {
  project: Project;
  label?: string;
  className?: string;
  priority?: boolean;
};

export default function ProjectVisual({
  project,
  label = 'Interface / estudo',
  className = '',
  priority = false
}: ProjectVisualProps) {
  const tone = getProjectTone(project.id);
  return (
    <div
      className={`${styles.visual} ${className}`}
      aria-hidden="true"
      data-component="project-visual"
      data-project-visual
      data-variant={tone}
    >
      <ProjectTeaser
        teaser={getProjectTeaser(project)}
        className={styles.teaser}
        priority={priority}
        label="Pré-carregando"
        sizes="(max-width: 800px) 100vw, 50vw"
      />
      <div className={styles.orbPrimary} />
      <div className={styles.orbSecondary} />
      <div className={styles.label}>
        <span>0{project.id}</span>
        <span>{project.year}</span>
      </div>
      <div
        className={styles.name}
        aria-hidden="true"
      >
        {project.name}
      </div>
      <div className={styles.label}>
        <span>{label}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
