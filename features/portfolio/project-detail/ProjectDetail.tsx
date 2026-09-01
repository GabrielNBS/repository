'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Project } from '@/features/portfolio/projects/data/projects';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import ProjectVisual from '../projects/components/ProjectVisual';
import { useDetailMotion } from './projectDetailMotion';

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root);
  const galleryCount = Math.min(
    3,
    Math.max(project.gallery.desktop.length, project.gallery.mobile.length)
  );

  return (
    <main ref={root} className="min-h-svh pt-32 max-[800px]:pt-28" tabIndex={-1}>
      <a
        className="bg-ink text-paper focus:outline-peach text-label fixed top-3 left-1/2 z-[100] -translate-x-1/2 -translate-y-[160%] rounded-full px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition-transform duration-200 focus:translate-y-0 focus:outline-3 focus:outline-offset-3"
        href="#projeto-titulo"
      >
        Pular para o conteúdo
      </a>
      <Link
        className="border-ink/15 bg-paper/80 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label-sm fixed top-4 left-[clamp(1.25rem,3vw,3.75rem)] z-[21] inline-flex min-h-11 items-center rounded-full border px-3.5 py-3 font-extrabold tracking-[0.08em] uppercase backdrop-blur-[18px] transition focus-visible:outline-none"
        href="/#projetos"
      >
        ← Voltar
      </Link>
      <section
        className="grid grid-cols-[0.6fr_1.4fr] gap-8 px-[clamp(1.25rem,3vw,3.75rem)] pb-28 max-[800px]:grid-cols-1 max-[800px]:pb-20"
        data-detail-hero
      >
        <div>
          <p className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            Projeto / 0{project.id}
          </p>
          <HeadingSplit
            as="h1"
            id="projeto-titulo"
            className="text-detail-title m-0 mt-4 max-w-[9ch] leading-[0.78] font-normal tracking-[-0.12em]"
            data-detail-title
          >
            {project.name}
          </HeadingSplit>
        </div>
        <div
          className="[&>p]:text-muted [&>p]:text-detail-intro mb-0 ml-[10%] max-w-132 self-end max-[800px]:ml-0 [&>p]:m-0 [&>p]:leading-[1.15] [&>p]:tracking-tighter"
          data-detail-intro
        >
          <p>{project.description}</p>
          <div className="border-ink/15 [&_span]:text-muted [&_span]:text-utility-sm [&_strong]:text-body-xs grid grid-cols-3 gap-4 border-t pt-4 max-[800px]:grid-cols-2 [&_span]:mb-1.5 [&_span]:block [&_span]:font-bold [&_span]:tracking-[0.1em] [&_span]:uppercase [&_strong]:leading-[1.25]">
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
            className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label inline-flex rounded-full border px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-none max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
            href={project.deploy}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${project.name} em uma nova guia`}
          >
            Ver projeto ↗
          </a>
          <a
            className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label inline-flex rounded-full border px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-none max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
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

      <div data-story-stage className="relative overflow-hidden">
        <section
          data-gallery-section
          className="border-ink/15 relative z-10 w-full border-t px-[clamp(1.25rem,3vw,3.75rem)] pt-16 pb-16 max-[800px]:pt-28 max-[800px]:pb-28"
          aria-label={`Galeria editorial de ${project.name}`}
        >
          {galleryCount > 0 ? (
            <div className="grid grid-cols-12 gap-4 max-[800px]:grid-cols-1" data-frames-grid>
              {Array.from({ length: galleryCount }, (_, index) => {
                const desktop = project.gallery.desktop[index] ?? project.gallery.mobile[index];
                const mobile = project.gallery.mobile[index] ?? desktop;

                if (!desktop || !mobile) return null;

                return (
                  <figure
                    data-frame-card
                    className={`before:border-ink/25 relative min-h-96 overflow-hidden rounded-[1.25rem] before:pointer-events-none before:absolute before:inset-5 before:z-[2] before:rounded-[calc(1.25rem-0.3rem)] before:border before:content-[''] max-[800px]:col-auto! max-[800px]:mt-0! max-[800px]:min-h-[17rem] ${
                      index === 0
                        ? 'col-span-7'
                        : index === 1
                          ? 'col-span-5 mt-28'
                          : 'col-span-7 col-start-3 -mt-12'
                    } ${index % 2 === 0 ? 'bg-peach' : 'bg-lilac'}`}
                    key={desktop.src}
                  >
                    <picture className="absolute inset-0 block">
                      <source media="(max-width: 800px)" srcSet={mobile.src} />
                      <img
                        className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.03]"
                        src={desktop.src}
                        alt={desktop.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </picture>
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                    <figcaption className="text-utility absolute right-5 bottom-5 left-5 z-[3] flex justify-between gap-4 font-extrabold tracking-[0.1em] text-white uppercase drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.5)]">
                      <span>Frame 0{index + 1}</span>
                      <span>{desktop.label}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <div className="border-ink/15 bg-cream/35 flex min-h-72 items-center justify-center rounded-[1.25rem] border p-8 text-center">
              <p className="text-muted text-body-sm m-0 max-w-sm leading-relaxed">
                As capturas deste projeto serão adicionadas manualmente.
              </p>
            </div>
          )}
        </section>

        <section
          data-behind-section
          className="relative z-20 mt-4 ml-auto w-full max-w-[55%] px-[clamp(1.25rem,3vw,3.75rem)] py-12 max-[1024px]:max-w-[53%] max-[800px]:mt-0 max-[800px]:ml-0 max-[800px]:max-w-full max-[800px]:pt-20"
        >
          <div className="grid grid-cols-1 gap-8">
            <HeadingSplit
              as="h2"
              className="text-display-sm m-0 max-w-[8ch] leading-[0.84] font-normal tracking-[-0.1em]"
              data-split="lines"
            >
              Por trás da tela.
            </HeadingSplit>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-[800px]:grid-cols-1">
              <div
                data-behind-item
                className="[&>p]:text-muted [&>h3]:text-label [&>p]:text-body-md [&>h3]:mb-2.5 [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]"
              >
                <h3>O desafio</h3>
                <p>{project.problem}</p>
              </div>
              <div
                data-behind-item
                className="[&>p]:text-muted [&>h3]:text-label [&>p]:text-body-detail [&>h3]:mb-2.5 [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]"
              >
                <h3>A solução</h3>
                <p>{project.solution}</p>
              </div>
              <div
                data-behind-item
                className="[&>p]:text-muted [&>h3]:text-label [&>p]:text-body-detail [&>h3]:mb-2.5 [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]"
              >
                <h3>O que ficou</h3>
                <p>{project.summary}</p>
              </div>
              <div
                data-behind-item
                className="[&>p]:text-muted [&>h3]:text-label [&>p]:text-body-detail [&>h3]:mb-2.5 [&>h3]:font-extrabold [&>h3]:tracking-[0.1em] [&>h3]:uppercase [&>p]:m-0 [&>p]:leading-[1.35] [&>p]:tracking-[-0.035em]"
              >
                <h3>Highlights</h3>
                <p>{project.highlights.join(' · ')}</p>
              </div>
              <div
                data-behind-item
                className="border-ink/15 [&>span]:border-ink/15 [&>span]:text-muted [&>span]:text-label-sm col-span-full flex flex-wrap gap-2 border-t pt-6 max-[800px]:col-auto [&>span]:rounded-full [&>span]:border [&>span]:px-3 [&>span]:py-2 [&>span]:font-bold [&>span]:uppercase"
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
      <footer className="text-muted text-label flex items-center justify-between gap-4 px-[clamp(1.25rem,3vw,3.75rem)] pt-4 pb-8 font-bold tracking-[0.08em] uppercase max-[480px]:flex-col max-[480px]:items-start [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
        <span>Gabriel Nascimento © 2026</span>
        <Link href="/#contato">Próximo papo ↗</Link>
      </footer>
    </main>
  );
}
