'use client';

import Link from 'next/link';
import type { Project } from '@/features/portfolio/projects/data/projects';
import ProjectVisual from './ProjectVisual';
import { useProjectCursor } from './cursor/ProjectCursorProvider';
import ProjectStackIcons from './ProjectStackIcons';

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { onProjectPointerEnter, onProjectPointerLeave, onProjectPointerMove } = useProjectCursor();

  return (
    <Link
      className="group focus-visible:**:data-[component=project-card]:border-ink block rounded-4xl focus-visible:outline-none focus-visible:[&_[data-component=project-card]]:shadow-[0_0_0_4px_#f6efe5,0_0_0_7px_#25221f]"
      href={`/projetos/${project.slug}`}
      aria-label={`Abrir detalhes do projeto ${project.name}. Tecnologias: ${project.techs.map((tech) => tech.name).join(', ')}`}
      onPointerEnter={(event) => onProjectPointerEnter(event, project)}
      onPointerLeave={onProjectPointerLeave}
      onPointerMove={onProjectPointerMove}
    >
      <article
        className={`border-ink/15 group-hover:border-ink/40 ease-editorial relative grid min-h-128 grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)] overflow-hidden rounded-[2rem] border p-[clamp(1rem,2vw,1.5rem)] transition duration-[450ms] group-hover:-translate-y-2.5 group-hover:shadow-[0_2rem_5rem_rgb(37_34_31_/_0.1)] max-[800px]:min-h-0 max-[800px]:grid-cols-1 max-[800px]:group-hover:-translate-y-1.5 ${['bg-peach/15', 'bg-lilac/15', 'bg-cream/35', 'bg-rose/20'][index % 4]} ${index % 2 === 1 ? 'min-[801px]:translate-x-[clamp(0rem,4vw,5rem)] min-[801px]:group-hover:translate-x-[clamp(0rem,4vw,5rem)]' : ''}`}
        data-component="project-card"
      >
        <div className="flex min-h-80 flex-col justify-between px-2.5 pt-4 pb-2.5 max-[480px]:min-h-68 max-[480px]:p-2">
          <div>
            <span className="text-muted text-meta font-bold tracking-[0.08em]">
              Projeto / 0{index + 1}
            </span>
            <h3 className="text-project-card max-[480px]:text-project-card-mobile m-0 mt-2.5 mb-4 max-w-[7ch] leading-[0.82] font-normal tracking-[-0.105em]">
              {project.name}
            </h3>
            <p className="text-muted text-body m-0 max-w-xs leading-[1.35] tracking-tight">
              {project.summary}
            </p>
          </div>
          <ProjectStackIcons stacks={project.techs} />
        </div>
        <ProjectVisual project={project} />
      </article>
    </Link>
  );
}
