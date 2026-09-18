'use client';

import Link from 'next/link';
import { useRef } from 'react';
import ProjectVisual from '../projects/ProjectVisual';
import type { Project } from '../projects/data/projects';
import { getStackIcon } from '../projects/data/projectStackIconLogic';
import { useDetailMotion } from './projectDetailMotion';
import HeadingSplit from '../shared/motion/HeadingSplit';

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root);
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
  const narrativeSections = [
    { label: 'O desafio', body: project.problem },
    { label: 'A solução', body: project.solution },
    { label: 'O que ficou', body: project.summary }
  ];

  return (
    <main ref={root} className="min-h-svh pt-32 max-[800px]:pt-28" tabIndex={-1}>
      <a
        className="bg-ink text-paper focus:outline-peach text-label fixed top-3 left-1/2 z-100 -translate-x-1/2 translate-y-[-160%] rounded-full px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition-transform duration-200 focus:translate-y-0 focus:outline-3 focus:outline-offset-3"
        href="#projeto-titulo"
      >
        Pular para o conteúdo
      </a>
      <Link
        className="border-ink/15 bg-paper/80 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label-sm focus-visible:outline-peach fixed top-4 left-[clamp(1.25rem,3vw,3.75rem)] z-21 inline-flex min-h-11 items-center rounded-full border px-3.5 py-3 font-extrabold tracking-[0.08em] uppercase backdrop-blur-[18px] transition focus-visible:outline-2 focus-visible:outline-offset-2"
        href="/"
      >
        ← Voltar
      </Link>

      <section
        className="overflow-x-clip px-[clamp(1.25rem,3vw,3.75rem)] pb-28 max-[800px]:pb-20"
        data-detail-hero
      >
        <div className="relative z-0 min-w-0 overflow-visible" data-detail-visual>
          <div className="grid grid-cols-[minmax(9rem,0.42fr)_minmax(0,1.58fr)] items-stretch gap-[clamp(2rem,6vw,5.25rem)] max-[800px]:grid-cols-1 max-[800px]:gap-8">
            <aside className="border-ink flex min-h-full flex-col justify-between border-y py-5 max-[800px]:gap-10">
              <div className="min-w-0">
                <p className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
                  Projeto / 0{project.id}
                </p>
                <h1
                  id="projeto-titulo"
                  className="text-display-xs text-ink m-0 mt-5 max-w-[8ch] font-serif leading-[0.82] font-normal -tracking-widest"
                  data-detail-title
                >
                  {project.name}
                </h1>
                <p className="text-muted text-body-md mt-7 max-w-[31ch] leading-[1.42] tracking-[-0.02em]">
                  {project.description}
                </p>
                <p className="text-muted text-label mt-6 max-w-[27ch] leading-[1.35] font-bold tracking-[0.08em] uppercase">
                  {project.subtitle}
                </p>
              </div>
              <div className="border-ink/15 grid grid-cols-2 gap-x-4 gap-y-4 border-t pt-4 max-[480px]:grid-cols-1 max-[480px]:gap-0 max-[480px]:border-b max-[480px]:pt-0 max-[480px]:[&>div]:py-3.5 max-[480px]:[&>div:not(:last-child)]:border-b">
                <div>
                  <span className="text-muted text-utility-sm mb-1.5 block font-bold tracking-widest uppercase max-[480px]:mb-1">
                    Ano
                  </span>
                  <strong className="text-ink text-body-xs leading-tight">{project.year}</strong>
                </div>
                <div>
                  <span className="text-muted text-utility-sm mb-1.5 block font-bold tracking-widest uppercase max-[480px]:mb-1">
                    Tipo
                  </span>
                  <strong className="text-ink text-body-xs leading-tight">{project.title}</strong>
                </div>
                <div className="col-span-2 max-[480px]:col-span-1">
                  <span className="text-muted text-utility-sm mb-1.5 block font-bold tracking-widest uppercase max-[480px]:mb-1">
                    Atuação
                  </span>
                  <strong className="text-ink text-body-xs leading-tight">{project.role}</strong>
                </div>
              </div>
            </aside>

            <div className="relative z-0 isolate min-w-0 overflow-visible pr-6 pb-6 max-[800px]:pr-3 max-[800px]:pb-3">
              <span
                aria-hidden="true"
                className="bg-peach pointer-events-none absolute top-6 right-0 bottom-0 left-6 z-0 max-[800px]:top-3 max-[800px]:left-3"
              />
              <span
                aria-hidden="true"
                className="border-ink pointer-events-none absolute top-0 right-6 bottom-6 left-0 z-1 translate-x-3 translate-y-3 border max-[800px]:right-3 max-[800px]:bottom-3 max-[800px]:translate-x-1.5 max-[800px]:translate-y-1.5"
              />
              <ProjectVisual
                project={project}
                label={project.subtitle}
                priority
                className="border-ink relative z-10 aspect-video min-h-0 border-2 shadow-[0_30px_55px_-28px_rgba(37,34,31,0.72)] max-[800px]:aspect-auto max-[800px]:h-88 max-[800px]:min-h-0 max-[480px]:h-80"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        data-detail-narrative
        className="border-ink/15 relative border-t px-[clamp(1.25rem,3vw,3.75rem)] py-32 max-[960px]:py-24 max-[800px]:py-20"
        aria-label={`Leitura do projeto ${project.name}`}
      >
        <div className="mx-auto grid max-w-[110rem] grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-[clamp(3rem,9vw,10rem)] max-[960px]:grid-cols-1 max-[960px]:gap-16">
          <div data-detail-narrative-heading className="min-w-0">
            <p className="text-muted text-label mb-5 inline-flex items-center gap-2.5 font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
              01 / Leitura do projeto
            </p>
            <HeadingSplit
              as="h2"
              className="text-display-sm m-0 max-w-[8ch] leading-[0.82] font-normal -tracking-widest"
              data-split="lines"
            >
              Do problema ao produto.
            </HeadingSplit>
            <p className="text-muted text-body-lg mt-8 max-w-124 leading-[1.35] tracking-[-0.035em]">
              {project.subtitle}. Uma leitura direta das decisões que dão forma a {project.name} e
              ao modo como ele responde no uso real.
            </p>

            <figure className="relative mt-16 ml-auto w-full max-w-88 max-[960px]:mt-12 max-[600px]:mx-0">
              <span className="bg-ink text-paper absolute -top-4 -right-4 z-10 grid size-14 place-items-center rounded-full text-sm font-bold tracking-[0.08em]">
                {String(project.id).padStart(2, '0')}
              </span>
              <div
                className="border-ink/15 bg-cream relative aspect-4/3 overflow-hidden rounded-3xl border bg-cover bg-center shadow-[0_24px_60px_-38px_rgba(37,34,31,0.45)]"
                role="img"
                aria-label={coverImage?.alt ?? `Identidade visual do projeto ${project.name}`}
                style={
                  coverImage
                    ? {
                        backgroundImage: `linear-gradient(135deg, rgba(239,174,130,0.14), rgba(37,34,31,0.2)), url("${coverImage.src}")`
                      }
                    : {
                        backgroundImage:
                          'radial-gradient(circle at 75% 24%, rgba(239,174,130,0.9), transparent 28%), linear-gradient(135deg, var(--color-ink), var(--color-lilac))'
                      }
                }
              >
                {!coverImage && (
                  <span className="text-paper/85 absolute inset-0 grid place-items-center font-serif text-[clamp(5rem,14vw,9rem)] leading-none italic">
                    {project.name.slice(0, 1)}
                  </span>
                )}
                <span className="text-paper text-utility-sm absolute right-5 bottom-4 left-5 font-bold tracking-[0.12em] uppercase drop-shadow-sm">
                  {coverImage?.label ?? 'Sistema em construção'}
                </span>
              </div>
              <figcaption className="text-muted text-utility-sm mt-3 flex justify-between gap-4 font-bold tracking-widest uppercase">
                <span>{project.name}</span>
                <span>{project.year}</span>
              </figcaption>
            </figure>
          </div>

          <div data-detail-narrative-copy className="min-w-0">
            <div className="border-ink/20 border-t">
              {narrativeSections.map((section, index) => (
                <article
                  key={section.label}
                  className="border-ink/15 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-6 border-b py-9 max-[600px]:grid-cols-[2.75rem_minmax(0,1fr)] max-[600px]:gap-4 max-[600px]:py-7"
                >
                  <span className="text-muted text-label pt-1 font-bold tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-ink text-card-title m-0 max-w-[12ch] leading-[0.96] font-normal tracking-[-0.07em]">
                      {section.label}
                    </h3>
                    <p className="text-muted text-body-lg mt-5 max-w-2xl leading-[1.45] tracking-tight">
                      {section.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] gap-8 pt-9 max-[600px]:grid-cols-1 max-[600px]:gap-8">
              <div>
                <p className="text-muted text-label mb-4 font-bold tracking-widest uppercase">
                  Sinais de entrega
                </p>
                <ul
                  className="m-0 flex list-none flex-wrap gap-2 p-0"
                  aria-label="Destaques do projeto"
                >
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="border-ink/15 bg-paper text-body-xs inline-flex min-h-10 items-center rounded-full border px-3 font-bold tracking-[0.04em]"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-muted text-label mb-4 font-bold tracking-widest uppercase">
                  Tecnologias
                </p>
                <ul
                  className="m-0 flex list-none flex-wrap gap-x-5 gap-y-3 p-0"
                  aria-label="Tecnologias utilizadas"
                >
                  {technologies.map((technology) => (
                    <li
                      key={technology.name}
                      className="text-body-sm inline-flex items-center gap-2"
                    >
                      <span className="text-muted" aria-hidden="true">
                        {technology.icon}
                      </span>
                      <span>{technology.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav
        aria-label="Navegação do projeto"
        className="flex flex-wrap justify-center gap-3 px-[clamp(1.25rem,3vw,3.75rem)] py-16 max-[480px]:grid max-[480px]:grid-cols-1"
      >
        <a
          className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label focus-visible:outline-ink inline-flex rounded-full border px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
          href={project.deploy}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ${project.name} em uma nova guia`}
        >
          Ver projeto ↗
        </a>
        <a
          className="border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-label focus-visible:outline-ink inline-flex rounded-full border px-4 py-3 font-extrabold tracking-[0.06em] uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 max-[480px]:min-h-11 max-[480px]:items-center max-[480px]:justify-center"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
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
