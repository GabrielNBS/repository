'use client';

import type { Project } from '@/features/portfolio/projects/data/projects';
import { getProjectTeaser } from '@/features/portfolio/projects/data/projects';
import { getProjectTone } from './data/projectTone';
import ProjectTeaser from './ProjectTeaser';

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
  const toneClass = {
    peach: 'bg-peach',
    lilac: 'bg-lilac',
    cream: 'bg-cream',
    rose: 'bg-rose'
  }[tone];

  return (
    <div
      className={`text-ink ease-editorial relative isolate flex min-h-full flex-col justify-between overflow-hidden transition duration-500 group-hover:scale-[0.98] max-[800px]:min-h-[22rem] max-[480px]:min-h-[19rem] ${toneClass} ${className}`}
      aria-hidden="true"
      data-component="project-visual"
      data-project-visual
    >
      <ProjectTeaser
        teaser={getProjectTeaser(project)}
        className="pointer-events-none absolute inset-0 z-10 opacity-95"
        priority={priority}
        label="Pré-carregando"
        sizes="(max-width: 800px) 100vw, 50vw"
      />
      <div className="border-ink/35 bg-paper/35 ease-editorial absolute top-[17%] left-[17%] aspect-square w-[65%] rounded-full border transition duration-600 group-hover:translate-x-[6%] group-hover:-translate-y-[4%] group-hover:rotate-[18deg]" />
      <div className="border-ink/35 bg-peach ease-editorial absolute -right-[17%] -bottom-[22%] aspect-square w-[56%] rounded-full border mix-blend-multiply transition duration-600 group-hover:-translate-x-[10%] group-hover:-translate-y-[8%] group-hover:-rotate-[20deg]" />
      <div className="text-label relative z-2 flex justify-between p-5 font-extrabold tracking-widest uppercase">
        <span>0{project.id}</span>
        <span>{project.year}</span>
      </div>
      <div
        className="text-display-md max-[480px]:text-visual-mobile relative z-1 my-auto -rotate-9 self-center text-center leading-[0.76] font-normal tracking-[-0.12em] transition duration-450 group-hover:scale-105 group-hover:rotate-3"
        aria-hidden="true"
      >
        {project.name}
      </div>
      <div className="text-label relative z-2 flex justify-between p-5 font-extrabold tracking-widest uppercase">
        <span>{label}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
