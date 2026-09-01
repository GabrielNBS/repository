'use client';

import Link from 'next/link';
import type { CSSProperties, PointerEvent } from 'react';
import type { Project } from '@/features/portfolio/projects/data/projects';
import { useProjectCursor } from '../cursor/ProjectCursorProvider';
import ProjectStackIcons from './ProjectStackIcons';
import ProjectStoryVisual from './ProjectStoryVisual';
import styles from '../styles/ProjectsSection.module.css';

type ProjectStoryCardProps = {
  index: number;
  project: Project;
};

const surfaces = ['#efae82', '#cdb8d8', '#e7d6bb', '#e8b6aa'];

export default function ProjectStoryCard({ index, project }: ProjectStoryCardProps) {
  const { onProjectPointerEnter, onProjectPointerLeave, onProjectPointerMove } = useProjectCursor();
  const cursorHandlers = {
    onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) =>
      onProjectPointerEnter(event, project),
    onPointerLeave: onProjectPointerLeave,
    onPointerMove: onProjectPointerMove
  };
  const style = { '--project-surface': surfaces[index % surfaces.length] } as CSSProperties;

  return (
    <article className={styles.storyCard} data-project-story-card style={style}>
      <Link
        {...cursorHandlers}
        aria-label={`Abrir detalhes do projeto ${project.name}. Tecnologias: ${project.techs.map((tech) => tech.name).join(', ')}`}
        className={`${styles.focusLink} group`}
        data-project-story-focus-link
        href={`/projetos/${project.slug}`}
      >
        <div className={styles.storyCopy}>
          <span className={styles.storyNumber}>Projeto / 0{index + 1}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <ProjectStackIcons stacks={project.techs} />
        </div>
        <ProjectStoryVisual project={project} />
        <span className={styles.storyHint}>Continue rolando para arquivar ↘</span>
      </Link>

      <Link
        {...cursorHandlers}
        aria-label={`Reabrir a apresentação do projeto ${project.name}`}
        className={`${styles.overviewLink} group`}
        data-project-story-overview-link
        data-project-story-index={index}
        href={`#${project.slug}`}
      >
        <span className={styles.overviewNumber}>0{index + 1} / overview</span>
        <strong>{project.name}</strong>
        <small>{project.title}</small>
        <ProjectStackIcons stacks={project.techs} />
      </Link>
    </article>
  );
}
