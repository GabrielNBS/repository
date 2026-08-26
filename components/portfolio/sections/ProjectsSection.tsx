import projects, { type Project } from '@/data/projects';
import ProjectCard from '../ProjectCard';

interface ProjectsSectionProps {
  items?: Project[];
}

export default function ProjectsSection({ items = projects }: ProjectsSectionProps) {
  return (
    <section
      id="projetos"
      className="scroll-mt-24 px-[clamp(1.25rem,3vw,3.75rem)] pt-28 pb-8 max-[480px]:pt-22 max-[480px]:pb-8"
      aria-labelledby="projects-title"
      data-projects-section
    >
      <div
        className="mb-12 flex items-end justify-between gap-8 max-[800px]:flex-col max-[800px]:items-start"
        data-blur-reveal
      >
        <div>
          <p className="text-muted inline-flex items-center gap-2.5 text-label leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            02 / Seleção recente
          </p>
          <h2
            id="projects-title"
            className="m-0 mt-4 max-w-[14ch] text-display-xl leading-[0.86] font-normal tracking-[-0.095em]"
            data-split="lines"
          >
            Soluções que ganharam forma<span className="text-peach">.</span>
          </h2>
        </div>
        <p className="text-muted m-0 mb-2 text-right text-meta leading-[1.4] max-[800px]:text-left">
          {items.length} projetos
          <br />
          front-end, produto e movimento
        </p>
      </div>
      <div className="grid gap-8">
        {items.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
