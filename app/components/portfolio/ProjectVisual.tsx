import type { Project } from '../../../data/projects';

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
  const tone = ['bg-peach', 'bg-lilac', 'bg-cream', 'bg-rose'][(project.id - 1) % 4];

  return (
    <div
      className={`text-ink relative isolate flex min-h-full flex-col justify-between overflow-hidden rounded-[1.45rem] transition duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[0.98] max-[800px]:min-h-[22rem] max-[480px]:min-h-[19rem] ${tone} ${className}`}
      aria-hidden="true"
      data-project-visual
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(37_34_31/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(37_34_31/0.12)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)] bg-[size:2.2rem_2.2rem]" />
      <div className="border-ink/35 bg-paper/45 absolute top-[17%] left-[17%] aspect-square w-[65%] rounded-full border transition duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-[6%] group-hover:-translate-y-[4%] group-hover:rotate-[18deg]" />
      <div className="border-ink/35 bg-peach absolute right-[-17%] bottom-[-22%] aspect-square w-[56%] rounded-full border mix-blend-multiply transition duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-[10%] group-hover:-translate-y-[8%] group-hover:-rotate-[20deg]" />
      <div className="relative z-[2] flex justify-between p-5 text-label font-extrabold tracking-widest uppercase">
        <span>0{project.id}</span>
        <span>{project.year}</span>
      </div>
      <div
        className="relative z-[1] my-auto -rotate-9 self-center text-center text-display-md leading-[0.76] font-normal tracking-[-0.12em] transition duration-[450ms] group-hover:scale-105 group-hover:rotate-3 max-[480px]:text-visual-mobile"
        aria-hidden="true"
      >
        {project.name}
      </div>
      <div className="relative z-[2] flex justify-between p-5 text-label font-extrabold tracking-widest uppercase">
        <span>{label}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
