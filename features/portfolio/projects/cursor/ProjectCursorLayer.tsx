'use client';

import AppIcon from '@/features/portfolio/shared/AppIcon';

import type { RefObject } from 'react';
import type { Project } from '@/features/portfolio/projects/data/projects';
import styles from './ProjectCursorLayer.module.css';

type ProjectCursorLayerProps = {
  cursorRef: RefObject<HTMLSpanElement | null>;
  project: Project | null;
};

export default function ProjectCursorLayer({ cursorRef, project }: ProjectCursorLayerProps) {

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
        Ver {project?.name ?? 'projeto'} <AppIcon name="arrowUpRight" size="compact" className={styles.accent} />
      </span>
    </span>
  );
}
