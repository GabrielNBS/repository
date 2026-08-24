'use client';

import Link from 'next/link';
import type { Project } from '../../../data/projects';
import ProjectVisual from './ProjectVisual';
import { useProjectCursor } from './ProjectCursorProvider';
import ProjectStackIcons from './ProjectStackIcons';

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { onProjectPointerEnter, onProjectPointerLeave, onProjectPointerMove } = useProjectCursor();

  return (
    <Link
      className="group focus-visible:[&_[data-project-card]]:border-ink block rounded-[2rem] focus-visible:outline-none focus-visible:[&_[data-project-card]]:shadow-[0_0_0_4px_#f6efe5,0_0_0_7px_#25221f]"
      href={`/projetos/${project.slug}`}
      aria-label={`Abrir detalhes do projeto ${project.name}. Tecnologias: ${project.techs.map((tech) => tech.name).join(', ')}`}
      onPointerEnter={(event) => onProjectPointerEnter(event, project)}
      onPointerLeave={onProjectPointerLeave}
      onPointerMove={onProjectPointerMove}
    >
      <article
        className={`border-ink/15 group-hover:border-ink/40 relative grid min-h-[32rem] grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)] overflow-hidden rounded-[2rem] border p-[clamp(1rem,2vw,1.5rem)] transition duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-2.5 group-hover:shadow-[0_2rem_5rem_rgb(37_34_31_/_0.1)] max-[800px]:min-h-0 max-[800px]:grid-cols-1 max-[800px]:group-hover:-translate-y-1.5 ${['bg-peach/15', 'bg-lilac/15', 'bg-cream/35', 'bg-rose/20'][index % 4]} ${index % 2 === 1 ? 'min-[801px]:translate-x-[clamp(0rem,4vw,5rem)] min-[801px]:group-hover:translate-x-[clamp(0rem,4vw,5rem)]' : ''}`}
        data-project-card
      >
        <div className="flex min-h-[20rem] flex-col justify-between px-2.5 pt-4 pb-2.5 max-[480px]:min-h-[17rem] max-[480px]:p-2">
          <div>
            <span className="text-muted text-[0.78rem] font-bold tracking-[0.08em]">
              Projeto / 0{index + 1}
            </span>
            <h3 className="m-0 mt-2.5 mb-4 max-w-[7ch] text-[clamp(3.3rem,7vw,7rem)] leading-[0.82] font-normal tracking-[-0.105em] max-[480px]:text-[clamp(3rem,15vw,4rem)]">
              {project.name}
            </h3>
            <p className="text-muted m-0 max-w-xs text-[0.95rem] leading-[1.35] tracking-[-0.025em]">
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
