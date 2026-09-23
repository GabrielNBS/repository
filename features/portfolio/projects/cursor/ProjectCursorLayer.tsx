'use client';

import type { RefObject } from 'react';
import type { Project } from '@/features/portfolio/projects/data/projects';
import { getProjectCursorIcon } from '../data/projectCursorContent';
import styles from './ProjectCursorLayer.module.css';

type ProjectCursorLayerProps = {
  cursorRef: RefObject<HTMLSpanElement | null>;
  project: Project | null;
};

export default function ProjectCursorLayer({ cursorRef, project }: ProjectCursorLayerProps) {
  const cursorIcon = project ? getProjectCursorIcon(project.slug) : '↗';

  return (
    <span
      ref={cursorRef}
      className={styles.cursor}
      aria-hidden="true"
    >
      <span
        className={styles.content}
        data-component="project-cursor-content"
      >
        <span className={styles.accent}>{cursorIcon}</span>
        Ver {project?.name ?? 'projeto'} <span className={styles.accent}>↗</span>
      </span>
    </span>
  );
}
