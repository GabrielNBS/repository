'use client';

import type { RefObject } from 'react';
import type { Project } from '../../../data/projects';
import { getProjectCursorIcon } from './projectCursorContent';

type ProjectCursorLayerProps = {
  cursorRef: RefObject<HTMLSpanElement | null>;
  project: Project | null;
};

export default function ProjectCursorLayer({ cursorRef, project }: ProjectCursorLayerProps) {
  const cursorIcon = project ? getProjectCursorIcon(project.slug) : '↗';

  return (
    <span
      ref={cursorRef}
      className="bg-ink text-paper pointer-events-none fixed top-0 left-0 z-120 block w-0 overflow-hidden rounded-full whitespace-nowrap opacity-0 shadow-[0_0.75rem_rgb(37_34_31_/_0.18)]"
      aria-hidden="true"
    >
      <span
        className="flex w-max flex-none items-center gap-2 px-4 pr-5 py-3 text-[0.68rem] font-extrabold tracking-[0.08em] uppercase"
        data-project-cursor-content
      >
        <span className="text-peach text-base leading-none">{cursorIcon}</span>
        Ver {project?.name ?? 'projeto'} <span className="text-peach text-base leading-none">↗</span>
      </span>
    </span>
  );
}
