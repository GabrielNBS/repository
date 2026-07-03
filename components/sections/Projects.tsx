'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from '@/data/projects';
import { ArrowIcon, ExternalIcon } from '@/components/ui/Icons';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // Register plugin inside hook to ensure it's client-only
    gsap.registerPlugin(ScrollTrigger);

    // autoAlpha cuida de opacity + visibility juntos,
    // então o bloco "some" de verdade (não fica clicável nem sobreposto)
    projects.forEach((_, i) => {
      if (i === 0) {
        gsap.set(`.text-block-${i}`, { autoAlpha: 1, y: 0 });
      } else {
        gsap.set(`.text-block-${i}`, { autoAlpha: 0, y: 30 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 72px',
        end: 'bottom bottom',
        scrub: 1, // pequeno smoothing evita "pular" frames em scroll rápido
      }
    });

    const OUT_DURATION = 0.35;
    const IN_DURATION = 0.35;
    const GAP = 0.3; // silêncio garantido entre sumir e aparecer

    for (let i = 0; i < projects.length - 1; i++) {
      const outStart = i;
      const outEnd = outStart + OUT_DURATION;
      const inStart = outEnd + GAP; // só começa a entrar depois que o outgoing TERMINOU + gap

      // saída: some completamente antes de qualquer coisa começar a entrar
      tl.to(`.text-block-${i}`, {
        autoAlpha: 0,
        y: -30,
        ease: 'power3.in',
        duration: OUT_DURATION,
      }, outStart);

      // entrada: só dispara depois do outgoing já ter zerado
      tl.to(`.text-block-${i + 1}`, {
        autoAlpha: 1,
        y: 0,
        ease: 'power3.out',
        duration: IN_DURATION,
      }, inStart);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <section id="projects" className="py-section">
      {/* Section Header */}
      <div className="w-site mx-auto mb-heading-gap">
        <p className="text-accent text-label font-label mb-4 tracking-widest uppercase">
          Projetos
        </p>
        <h2
          id="projects-title"
          className="text-display font-heading max-w-[15ch] max-md:max-w-[11ch] leading-[1.05]"
        >
          Provas tecnicas em contexto real.
        </h2>
      </div>

      {/* Desktop GSAP Pinned Showcase with Natural Image Scroll */}
      <div className="hidden lg:flex w-site mx-auto gap-grid relative items-start" ref={containerRef}>
        {/* Left Column: Fixed Text Content */}
        <div className="w-[45%] sticky top-[72px] h-[calc(100vh-72px)] flex flex-col justify-center z-10">
          <div className="relative h-[60vh] flex flex-col justify-center">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={`text-block-${index} absolute inset-x-0 flex flex-col gap-5 justify-center`}
                style={index === 0 ? {} : { visibility: 'hidden', opacity: 0 }}
              >
                <div className="text-accent text-index font-label">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-display font-heading tracking-normal text-ink leading-[1.1] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-muted text-body max-w-[28rem]">
                    {project.summary}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3" aria-label={`Tecnologias de ${project.name}`}>
                  {project.techs.slice(0, 4).map((tech) => (
                    <span
                      className="border-line text-muted px-tag-x py-tag-y text-tag rounded-full border font-bold bg-paper"
                      key={tech.name}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <TransitionLink
                    className="bg-ink text-paper hover:bg-accent-dark min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border border-transparent transition-all duration-180 hover:-translate-y-0.5"
                    href={`/projects/${project.slug}`}
                  >
                    Ver projeto
                    <ArrowIcon />
                  </TransitionLink>
                  <a
                    className="border-line text-ink hover:border-ink min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border bg-[rgb(255,255,255,0.72)] transition-all duration-180 hover:-translate-y-0.5"
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Deploy
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Naturally Scrolling Images */}
        <div className="w-[55%] flex flex-col">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              id={project.slug}
              className="project-row h-[calc(100vh-72px)] flex items-center justify-center"
            >
              <div className="w-full aspect-[16/10] relative overflow-hidden rounded-md border border-line bg-paper shadow-soft">
                <Image
                  src={project.mockups.desktop}
                  alt={`Preview desktop do projeto ${project.name}`}
                  fill
                  sizes="50vw"
                  priority={index === 0}
                  className="object-cover object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Fallback Layout */}
      <div className="lg:hidden w-site mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              id={project.slug}
              className="border-line hover:shadow-soft flex flex-col overflow-hidden rounded-md border bg-[rgb(255,255,255,0.74)] transition-all duration-180 hover:-translate-y-1 hover:border-[rgb(24,24,27,0.28)]"
            >
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="border-line relative block aspect-16/10 rounded-none border-0 border-b shadow-none"
              >
                <Image
                  src={project.mockups.desktop}
                  alt={`Preview desktop do projeto ${project.name}`}
                  fill
                  sizes="(max-width: 800px) 92vw"
                  className="object-cover object-top"
                />
              </TransitionLink>
              <div className="p-card-body flex flex-col gap-5 p-6">
                <div className="text-accent text-index font-label">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-title font-title tracking-normal">{project.name}</h3>
                  <p className="text-muted text-body">{project.summary}</p>
                </div>
                <div className="flex flex-wrap gap-3" aria-label={`Tecnologias de ${project.name}`}>
                  {project.techs.slice(0, 4).map((tech) => (
                    <span
                      className="border-line text-muted px-tag-x py-tag-y text-tag rounded-full border font-bold"
                      key={tech.name}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <TransitionLink
                    className="text-ink gap-link-gap text-link inline-flex items-center font-extrabold transition-all duration-180 hover:-translate-y-0.5"
                    href={`/projects/${project.slug}`}
                  >
                    Ver projeto
                    <ArrowIcon />
                  </TransitionLink>
                  <a
                    className="text-muted gap-link-gap text-link inline-flex items-center font-extrabold transition-all duration-180 hover:-translate-y-0.5"
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Deploy
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
