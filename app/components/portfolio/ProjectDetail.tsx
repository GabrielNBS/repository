'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Project } from '../../../data/projects';
import ProjectVisual from './ProjectVisual';
import { useDetailMotion } from './portfolioMotion';

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root);

  return (
    <main ref={root} className="min-h-svh pt-32 max-[800px]:pt-28" tabIndex={-1}>
      <a
        className="bg-ink text-paper focus:outline-peach fixed top-3 left-1/2 z-[100] -translate-x-1/2 -translate-y-[160%] rounded-full px-4 py-3 text-xs font-extrabold tracking-[0.06em] uppercase transition-transform duration-200 focus:translate-y-0 focus:outline-3 focus:outline-offset-3"
        href="#projeto-titulo"
      >
        Pular para o conteúdo
      </a>
      <Link
        className="border-ink/15 bg-paper/80 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper fixed top-4 left-[clamp(1.25rem,3vw,3.75rem)] z-[21] inline-flex min-h-11 items-center rounded-full border px-3.5 py-3 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase backdrop-blur-[18px] transition focus-visible:outline-none"
        href="/#projetos"
      >
        ← Voltar
      </Link>
      <section
        className="grid grid-cols-[0.6fr_1.4fr] gap-8 px-[clamp(1.25rem,3vw,3.75rem)] pb-28 max-[800px]:grid-cols-1 max-[800px]:pb-20"
        data-detail-hero
      >
        <div>
          <p className="text-muted inline-flex items-center gap-2.5 text-[0.72rem] leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            Projeto / 0{project.id}
          </p>
          <h1
            id="projeto-titulo"
            className="m-0 mt-4 max-w-[7ch] text-[clamp(4.5rem,12vw,13rem)] leading-[0.78] font-normal tracking-[-0.12em]"
            data-detail-title
          >
            {project.name}
          </h1>
        </div>
        <div
          className="[&>p]:text-muted mb-0 ml-[10%] max-w-132 self-end max-[800px]:ml-0 [&>p]:m-0 [&>p]:text-[clamp(1.1rem,2vw,1.7rem)] [&>p]:leading-[1.15] [&>p]:tracking-tighter"
          data-detail-intro
        >
          <p>{project.description}</p>
          <div className="border-ink/15 [&_span]:text-muted grid grid-cols-3 gap-4 border-t pt-4 max-[800px]:grid-cols-2 [&_span]:mb-1.5 [&_span]:block [&_span]:text-[0.66rem] [&_span]:font-bold [&_span]:tracking-[0.1em] [&_span]:uppercase [&_strong]:text-[0.8rem] [&_strong]:leading-[1.25]">
            <div>
              <span>Ano</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Atuação</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Tipo</span>
              <strong>{project.title}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-8 max-[480px]:grid max-[480px]:grid-cols-1">
          <a
            className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper inline-flex rounded-full border px-4 py-3 text-[0.72rem] font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-none max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
            href={project.deploy}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver ${project.name} em uma nova guia`}
          >
            Ver projeto ↗
          </a>
          <a
            className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper inline-flex rounded-full border px-4 py-3 text-[0.72rem] font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-none max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver o código de ${project.name} em uma nova guia`}
          >
            Código ↗
          </a>
        </div>
        <div
          className="col-span-full min-h-[min(70vh,42rem)] **:data-project-visual:min-h-[min(70vh,42rem)] max-[800px]:min-h-100 [&_[data-project-visual]]:rounded-[2rem] max-[800px]:[&_[data-project-visual]]:min-h-[25rem]"
          data-detail-visual
        >
          <ProjectVisual project={project} label={project.subtitle} />
        </div>
      </section>

      <div
        data-story-stage
        className="relative flex min-h-[min(56rem,100svh)] items-center overflow-hidden max-[800px]:block max-[800px]:min-h-0"
      >
        <section
          data-gallery-section
          className="border-ink/15 relative z-10 w-full border-t px-[clamp(1.25rem,3vw,3.75rem)] pt-16 pb-16 max-[800px]:pt-28 max-[800px]:pb-28"
          aria-label={`Galeria editorial de ${project.name}`}
        >
          <div className="grid grid-cols-12 gap-4 max-[800px]:grid-cols-1" data-frames-grid>
            {[project.title, project.subtitle, 'Detalhe / interface'].map((label, index) => (
              <div
                data-frame-card
                className={`before:border-ink/25 relative min-h-96 overflow-hidden rounded-[1.25rem] before:absolute before:inset-5 before:rounded-[calc(1.25rem-0.3rem)] before:border before:content-[''] max-[800px]:col-auto! max-[800px]:mt-0! max-[800px]:min-h-[17rem] [&>span]:absolute [&>span]:right-5 [&>span]:bottom-5 [&>span]:left-5 [&>span]:flex [&>span]:justify-between [&>span]:text-[0.68rem] [&>span]:font-extrabold [&>span]:tracking-[0.1em] [&>span]:uppercase ${
                  index === 0
                    ? 'col-span-7'
                    : index === 1
                      ? 'col-span-5 mt-28'
                      : 'col-span-7 col-start-3 -mt-12'
                } ${index % 2 === 0 ? 'bg-peach' : 'bg-lilac'}`}
                key={label}
                aria-hidden="true"
              >
                <span>
                  <span>Frame 0{index + 1}</span>
                  <span>{label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          data-behind-section
          className="relative z-20 ml-auto w-full max-w-[55%] px-[clamp(1.25rem,3vw,3.75rem)] py-12 max-[1024px]:max-w-[53%] max-[800px]:ml-0 max-[800px]:max-w-full max-[800px]:pt-20 min-[801px]:absolute min-[801px]:top-1/2 min-[801px]:right-0 min-[801px]:py-0"
        >
          <div className="grid grid-cols-1 gap-8">
            <h2
              className="m-0 max-w-[8ch] text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.84] font-extrabold tracking-[-0.1em]"
              data-split="lines"
            >
              Por trás da tela.
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-[800px]:grid-cols-1">
              <div data-behind-item className="[&>p]:text-muted [&>h3]:mb-2.5 [&>h3]:text-[0.72rem] [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:text-[1rem] [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]">
                <h3>O desafio</h3>
                <p>{project.problem}</p>
              </div>
              <div data-behind-item className="[&>p]:text-muted [&>h3]:mb-2.5 [&>h3]:text-[0.72rem] [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:text-[1.05rem] [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]">
                <h3>A solução</h3>
                <p>{project.solution}</p>
              </div>
              <div data-behind-item className="[&>p]:text-muted [&>h3]:mb-2.5 [&>h3]:text-[0.72rem] [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:text-[1.05rem] [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]">
                <h3>O que ficou</h3>
                <p>{project.summary}</p>
              </div>
              <div data-behind-item className="[&>p]:text-muted [&>h3]:mb-2.5 [&>h3]:text-[0.72rem] [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:text-[1.05rem] [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]">
                <h3>Highlights</h3>
                <p>{project.highlights.join(' · ')}</p>
              </div>
              <div
                data-behind-item
                className="border-ink/15 [&>span]:border-ink/15 [&>span]:text-muted col-span-full flex flex-wrap gap-2 border-t pt-6 max-[800px]:col-auto [&>span]:rounded-full [&>span]:border [&>span]:px-3 [&>span]:py-2 [&>span]:text-[0.7rem] [&>span]:font-bold [&>span]:uppercase"
                aria-label="Tecnologias usadas"
              >
                {project.techs.map((tech) => (
                  <span key={tech.name}>{tech.name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="text-muted flex items-center justify-between gap-4 px-[clamp(1.25rem,3vw,3.75rem)] pt-4 pb-8 text-[0.72rem] font-bold tracking-[0.08em] uppercase max-[480px]:flex-col max-[480px]:items-start [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
        <span>Gabriel Nascimento © 2026</span>
        <Link href="/#contato">Próximo papo ↗</Link>
      </footer>
    </main>
  );
}
