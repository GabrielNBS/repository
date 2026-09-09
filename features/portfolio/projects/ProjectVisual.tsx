'use client';

import type { Project } from '@/features/portfolio/projects/data/projects';
import { getProjectTone } from './data/projectTone';
import ProjectShaderGradient from './ProjectShaderGradientLazy';

type ProjectVisualProps = {
  project: Project;
  label?: string;
  className?: string;
};

export default function ProjectVisual({
  project,
  label = 'Interface / estudo',
  className = ''
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
      className={`text-ink ease-editorial relative isolate flex min-h-full flex-col justify-between overflow-hidden rounded-[1.45rem] transition duration-500 group-hover:scale-[0.98] max-[800px]:min-h-[22rem] max-[480px]:min-h-[19rem] ${toneClass} ${className}`}
      aria-hidden="true"
      data-component="project-visual"
      data-project-visual
    >
      <ProjectShaderGradient
        className="pointer-events-none absolute inset-0 opacity-95"
        tone={tone}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(37_34_31/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(37_34_31/0.12)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)] bg-[size:2.2rem_2.2rem]" />
      <div className="border-ink/35 bg-paper/35 ease-editorial absolute top-[17%] left-[17%] aspect-square w-[65%] rounded-full border transition duration-[600ms] group-hover:translate-x-[6%] group-hover:-translate-y-[4%] group-hover:rotate-[18deg]" />
      <div className="border-ink/35 bg-peach ease-editorial absolute right-[-17%] bottom-[-22%] aspect-square w-[56%] rounded-full border mix-blend-multiply transition duration-[600ms] group-hover:-translate-x-[10%] group-hover:-translate-y-[8%] group-hover:-rotate-[20deg]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(246_239_229/0.12),transparent_52%,rgb(37_34_31/0.1))]" />
      <div className="text-label relative z-[2] flex justify-between p-5 font-extrabold tracking-widest uppercase">
        <span>0{project.id}</span>
        <span>{project.year}</span>
      </div>
      <div
        className="text-display-md max-[480px]:text-visual-mobile relative z-[1] my-auto -rotate-9 self-center text-center leading-[0.76] font-normal tracking-[-0.12em] transition duration-[450ms] group-hover:scale-105 group-hover:rotate-3"
        aria-hidden="true"
      >
        {project.name}
      </div>
      <div className="text-label relative z-[2] flex justify-between p-5 font-extrabold tracking-widest uppercase">
        <span>{label}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
