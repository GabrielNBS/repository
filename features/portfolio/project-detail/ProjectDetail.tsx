'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { FiCheckCircle, FiLayers, FiTarget } from 'react-icons/fi';
import ProjectVisual from '../projects/ProjectVisual';
import type { Project } from '../projects/data/projects';
import { getStackIcon } from '../projects/data/projectStackIconLogic';
import { useDetailMotion } from './projectDetailMotion';
import HeadingSplit from '../shared/motion/HeadingSplit';
import { ScrollSplitCard } from '@/components/ui/scroll-split-card';

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root);
  const isLongProjectName = project.name.length > 10;
  const galleryItems =
    project.gallery.desktop.length > 0 ? project.gallery.desktop : project.gallery.mobile;
  const coverImage = galleryItems[0];
  const technologies = project.techs.map((technology) => {
    const { Icon, tone } = getStackIcon(technology.name);
    return {
      name: technology.name,
      tone,
      icon: <Icon aria-hidden="true" />
    };
  });

  return (
    <main ref={root} className="min-h-svh pt-32 max-[800px]:pt-28" tabIndex={-1}>
      <a
        className="bg-ink text-paper focus:outline-peach text-label fixed top-3 left-1/2 z-100 -translate-x-1/2 -translate-y-[160%] rounded-full px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition-transform duration-200 focus:translate-y-0 focus:outline-3 focus:outline-offset-3"
        href="#projeto-titulo"
      >
        Pular para o conteúdo
      </a>
      <Link
        className="border-ink/15 bg-paper/80 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label-sm fixed top-4 left-[clamp(1.25rem,3vw,3.75rem)] z-[21] inline-flex min-h-11 items-center rounded-full border px-3.5 py-3 font-extrabold tracking-[0.08em] uppercase backdrop-blur-[18px] transition focus-visible:outline-none"
        href="/"
      >
        ← Voltar
      </Link>
      <section
        className="grid grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] gap-8 px-[clamp(1.25rem,3vw,3.75rem)] pb-28 max-[800px]:grid-cols-1 max-[800px]:pb-20"
        data-detail-hero
      >
        <div
          className={`min-w-0${isLongProjectName ? ' max-[1800px]:col-span-full max-[1800px]:row-start-2 max-[800px]:col-auto max-[800px]:row-auto' : ''}`}
        >
          <p className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            Projeto / 0{project.id}
          </p>
          <h1
            id="projeto-titulo"
            className={`text-detail-title m-0 mt-4 max-w-none whitespace-nowrap leading-[0.78] font-normal tracking-[-0.12em]${isLongProjectName ? ' text-right' : ''}`}
            data-detail-title
          >
            {project.name}
          </h1>
        </div>
        <div
          className={`[&>p]:text-muted [&>p]:text-detail-intro mb-0 ml-0 w-full max-w-108 min-w-0 justify-self-end self-start text-right [&>p]:m-0 [&>p]:leading-[1.15] [&>p]:tracking-tighter${isLongProjectName ? ' max-[1800px]:col-start-2 max-[1800px]:row-start-1 max-[800px]:col-auto max-[800px]:row-auto' : ''}`}
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

        <div
          className="col-span-full min-h-[min(70vh,42rem)] **:data-project-visual:min-h-[min(70vh,42rem)] max-[800px]:min-h-100 [&_[data-project-visual]]:rounded-[2rem] max-[800px]:[&_[data-project-visual]]:min-h-[25rem]"
          data-detail-visual
        >
          <ProjectVisual project={project} label={project.subtitle} />
        </div>
      </section>

      <div data-story-section className="relative">
        <section
          data-story-panel
          className="border-ink/15 relative z-10 min-h-svh border-t px-[clamp(1.25rem,3vw,3.75rem)] py-14 max-[800px]:min-h-0 max-[800px]:py-24"
          aria-label={`Recorte funcional de ${project.name}`}
        >
          <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-[110rem] flex-col justify-center max-[800px]:min-h-0">
            <div
              data-story-heading
              className="mb-10 grid grid-cols-[minmax(0,1fr)_minmax(15rem,0.65fr)] items-end gap-8 max-[800px]:grid-cols-1 max-[800px]:gap-4"
            >
              <div>
                <p className="text-muted text-label mb-4 inline-flex items-center gap-2.5 font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
                  01 / Sistema em uso
                </p>
                <HeadingSplit
                  as="h2"
                  className="text-display-sm m-0 max-w-[8ch] leading-[0.82] font-normal -tracking-widest"
                  data-split="lines"
                >
                  Por trás da tela.
                </HeadingSplit>
              </div>
              <p className="text-muted text-body-lg m-0 max-w-md justify-self-end leading-[1.15] tracking-[-0.04em] max-[800px]:justify-self-start">
                {project.subtitle}. Um recorte curto das decisões que fazem {project.name}{' '}
                responder.
              </p>
            </div>

            <div data-story-cards>
              <ScrollSplitCard
                imageSrc={coverImage?.src}
                startLabel={project.subtitle}
                endLabel={`Feito para ${project.name}.`}
                technologies={technologies}
                cards={[
                  {
                    title: 'O desafio',
                    description: project.problem,
                    bgColor: 'var(--color-ink)',
                    textColor: 'var(--color-paper)',
                    icon: <FiTarget className="size-5" strokeWidth={1.5} />,
                    shaderTone: 'peach'
                  },
                  {
                    title: 'A solução',
                    description: project.solution,
                    bgColor: 'var(--color-peach)',
                    textColor: 'var(--color-ink)',
                    icon: <FiLayers className="size-5" strokeWidth={1.5} />,
                    shaderTone: 'lilac'
                  },
                  {
                    title: 'O que ficou',
                    description: project.summary,
                    bgColor: 'var(--color-cream)',
                    textColor: 'var(--color-ink)',
                    icon: <FiCheckCircle className="size-5" strokeWidth={1.5} />,
                    shaderTone: 'cream'
                  }
                ]}
                className="-mx-4 w-[calc(100%+2rem)] max-w-none"
              />
            </div>
          </div>
        </section>
      </div>

      <nav
        aria-label="Navegação do projeto"
        className="flex flex-wrap justify-center gap-3 px-[clamp(1.25rem,3vw,3.75rem)] py-16 max-[480px]:grid max-[480px]:grid-cols-1"
      >
        <a
          className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label inline-flex rounded-full border px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-none max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
          href={project.deploy}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver ${project.name} em uma nova guia`}
        >
          Ver projeto ↗
        </a>
        <a
          className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label inline-flex rounded-full border px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-none max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver o código de ${project.name} em uma nova guia`}
        >
          Código ↗
        </a>
      </nav>
      <footer className="text-muted text-label flex items-center justify-between gap-4 px-[clamp(1.25rem,3vw,3.75rem)] pt-4 pb-8 font-bold tracking-[0.08em] uppercase max-[480px]:flex-col max-[480px]:items-start [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
        <span>Gabriel Nascimento © 2026</span>
        <Link href="/#contato">Próximo papo ↗</Link>
      </footer>
    </main>
  );
}
