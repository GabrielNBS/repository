'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import projects from '../../../data/projects';
import PortfolioNav from './PortfolioNav';
import ProjectCard from './ProjectCard';
import { usePortfolioMotion } from './portfolioMotion';

const technologies = ['React', 'Next.js', 'TypeScript', 'GSAP', 'Design Systems', 'CSS'];

export default function PortfolioHome() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  usePortfolioMotion(root);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main ref={root} className="overflow-x-clip focus:outline-none" tabIndex={-1}>
      <a
        className="bg-ink text-paper focus:outline-peach fixed top-3 left-1/2 z-100 -translate-x-1/2 translate-y-[-160%] rounded-full px-4 py-3 text-xs font-extrabold tracking-[0.06em] uppercase transition-transform duration-200 focus:translate-y-0 focus:outline-3 focus:outline-offset-3"
        href="#hero-title"
      >
        Pular para o conteúdo
      </a>
      <PortfolioNav />
      <section
        className="relative flex min-h-[min(54rem,100svh)] flex-col justify-end px-[clamp(1.25rem,3vw,3.75rem)] pt-36 pb-12 max-[800px]:min-h-svh max-[800px]:pt-32 max-[480px]:pb-8"
        aria-labelledby="hero-title"
        data-hero
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(37_34_31/0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgb(37_34_31/0.055)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,transparent_6%,black_50%,transparent_100%)] bg-size-[clamp(4rem,11vw,10rem)_clamp(4rem,11vw,10rem)]" />
        <div
          className="border-ink/25 before:bg-peach after:bg-ink absolute top-[17%] right-[12%] aspect-square w-[clamp(10rem,24vw,22rem)] rounded-full border opacity-80 before:absolute before:inset-[18%] before:rounded-full before:content-[''] after:absolute after:top-[4%] after:right-[12%] after:size-3 after:rounded-full after:content-[''] max-[800px]:top-1/4 max-[800px]:-right-[10%]"
          aria-hidden="true"
          data-hero-orbit
        />
        <p
          className="text-muted inline-flex items-center gap-2.5 text-[0.72rem] leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']"
          data-hero-eyebrow
        >
          Interfaces com intenção
        </p>
        <h1
          id="hero-title"
          className="relative z-1 my-5 max-w-[13ch] text-[clamp(4.5rem,12.5vw,13rem)] leading-[0.82] font-normal tracking-[-0.105em] max-[480px]:text-[clamp(4rem,19vw,5.2rem)] max-[480px]:tracking-[-0.11em]"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="inline-block" data-hero-word>
              Desenvolvimento
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="inline-block" data-hero-word>
              no
            </span>{' '}
            <em className="text-peach inline-block font-serif font-normal" data-hero-word>
              detalhe.
            </em>
          </span>
        </h1>
        <div className="grid grid-cols-[1fr_auto] items-end gap-8 max-[800px]:grid-cols-1 max-[480px]:gap-5">
          <p
            className="text-muted m-0 max-w-100 text-[clamp(1rem,1.5vw,1.3rem)] leading-tight tracking-[-0.04em]"
            data-hero-intro
          >
            Construo experiências digitais com clareza, personalidade e movimento — da primeira
            ideia ao último detalhe.
          </p>
          <a
            className="text-muted [&>span]:border-ink/15 [&>span]:after:border-ink inline-flex min-h-11 items-center gap-3 text-[0.72rem] font-bold tracking-widest uppercase [&>span]:relative [&>span]:block [&>span]:size-[2.7rem] [&>span]:rounded-full [&>span]:border [&>span]:after:absolute [&>span]:after:top-[0.85rem] [&>span]:after:left-1/2 [&>span]:after:size-[0.45rem] [&>span]:after:-translate-x-1/2 [&>span]:after:rotate-45 [&>span]:after:border-r [&>span]:after:border-b [&>span]:after:content-['']"
            href="#projetos"
            data-scroll-cue
          >
            Deslize <span aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="border-ink/15 grid min-h-[80vh] scroll-mt-24 items-center border-y px-[clamp(1.25rem,3vw,3.75rem)] py-32 max-[800px]:min-h-[65vh] max-[480px]:py-[5.5rem]"
        aria-label="Manifesto"
      >
        <div
          className="grid grid-cols-[minmax(8rem,0.4fr)_1fr] gap-8 max-[800px]:grid-cols-1"
          data-blur-reveal
        >
          <p className="text-muted inline-flex items-center gap-2.5 text-[0.72rem] leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            01 / Manifesto
          </p>
          <div>
            <h2
              className="[&_em]:text-peach m-0 max-w-[11.5ch] text-[clamp(3rem,8vw,8rem)] leading-[0.88] font-normal tracking-[-0.09em] [&_em]:font-serif [&_em]:font-normal"
              data-split="lines"
            >
              Menos ruído<span className="text-peach">.</span>{' '}
              <strong className="text-peach">Mais presença</strong>
              <span className="text-ink">.</span>
            </h2>
            <p className="text-muted m-0 mb-3 ml-auto max-w-xs self-end text-base leading-[1.35] tracking-[-0.03em] max-[800px]:ml-0">
              A interface precisa ser rápida de entender, gostosa de usar e impossível de esquecer.
            </p>
          </div>
        </div>
      </section>

      <section
        id="projetos"
        className="scroll-mt-24 px-[clamp(1.25rem,3vw,3.75rem)] pt-28 pb-32 max-[480px]:py-22"
        aria-labelledby="projects-title"
      >
        <div
          className="mb-12 flex items-end justify-between gap-8 max-[800px]:flex-col max-[800px]:items-start"
          data-blur-reveal
        >
          <div>
            <p className="text-muted inline-flex items-center gap-2.5 text-[0.72rem] leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
              02 / Seleção recente
            </p>
            <h2
              id="projects-title"
              className="m-0 mt-4 max-w-[14ch] text-[clamp(3.5rem,8vw,8rem)] leading-[0.86] font-normal tracking-[-0.095em]"
              data-split="lines"
            >
              Soluções que ganharam forma<span className="text-peach">.</span>
            </h2>
          </div>
          <p className="text-muted m-0 mb-2 text-right text-[0.78rem] leading-[1.4] max-[800px]:text-left">
            {projects.length} projetos
            <br />
            front-end, produto e movimento
          </p>
        </div>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section
        id="sobre"
        className="grid scroll-mt-24 grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)] items-center gap-[clamp(3rem,10vw,10rem)] px-[clamp(1.25rem,3vw,3.75rem)] py-32 pt-48 max-[800px]:grid-cols-1 max-[800px]:pt-28 max-[480px]:py-[5.5rem]"
        aria-labelledby="about-title"
      >
        <div
          className="bg-lilac before:border-ink relative aspect-[0.82] w-full overflow-hidden rounded-t-[45%] rounded-b-3xl before:absolute before:right-[-12%] before:bottom-[-20%] before:aspect-square before:w-[90%] before:rounded-full before:border before:content-[''] max-[800px]:w-[min(100%,22rem)]"
          role="img"
          aria-label="Retrato editorial de Gabriel Nascimento"
          data-blur-reveal
        >
          <span
            className="absolute top-1/2 left-1/2 translate-x-[-53%] -translate-y-1/2 -rotate-12 text-[clamp(5rem,13vw,13rem)] leading-[0.7] font-normal tracking-[-0.16em]"
            aria-hidden="true"
          >
            GN
          </span>
          <div className="absolute right-4 bottom-4 left-4 flex justify-between text-[0.7rem] font-extrabold tracking-[0.09em] uppercase">
            <span>Gabriel Nascimento</span>
            <span>São Paulo / BR</span>
          </div>
        </div>
        <div className="max-w-2xl" data-blur-reveal>
          <p className="text-muted inline-flex items-center gap-2.5 text-[0.72rem] leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            03 / Sobre
          </p>
          <h2
            id="about-title"
            className="m-0 mt-4 mb-7 max-w-[10ch] text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.87] font-extrabold -tracking-widest"
            data-split="lines"
          >
            Código com olhar de direção.
          </h2>
          <p className="text-muted m-0 max-w-124 text-[clamp(1rem,1.5vw,1.3rem)] leading-tight tracking-[-0.04em]">
            Sou Gabriel Nascimento, Desenvolvedor Front-end. Gosto de aproximar lógica e
            sensibilidade para transformar produtos digitais em experiências que fazem sentido.
          </p>
          <ul
            className="[&>li]:border-ink/15 [&>li]:text-muted flex list-none flex-wrap gap-2 p-0 pt-8 [&>li]:rounded-full [&>li]:border [&>li]:px-3 [&>li]:py-2 [&>li]:text-[0.72rem] [&>li]:font-bold [&>li]:tracking-[0.05em] [&>li]:uppercase"
            aria-label="Tecnologias e especialidades"
          >
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="contato"
        className="scroll-mt-24 px-[clamp(1.25rem,3vw,3.75rem)] py-32 pt-48 pb-20 max-[800px]:pt-28 max-[480px]:py-22"
        aria-labelledby="contact-title"
      >
        <div
          className="border-ink/15 grid grid-cols-[0.75fr_1.25fr] gap-8 border-t pt-5 max-[800px]:grid-cols-1"
          data-blur-reveal
        >
          <div>
            <p className="text-muted inline-flex items-center gap-2.5 text-[0.72rem] leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
              04 / Contato
            </p>
            <h2
              id="contact-title"
              className="m-0 max-w-[8ch] text-[clamp(3.5rem,8vw,8rem)] leading-[0.84] font-extrabold -tracking-widest"
              data-split="lines"
            >
              Vamos fazer algo vivo?
            </h2>
          </div>
          <form className="self-end" onSubmit={handleSubmit}>
            <label
              className="text-muted mb-3 block text-[0.72rem] font-bold tracking-widest uppercase"
              htmlFor="contact-email"
            >
              Deixe seu melhor e-mail
            </label>
            <div className="border-ink flex items-center border-b max-[480px]:gap-2">
              <input
                id="contact-email"
                className="placeholder:text-ink/35 min-w-0 flex-1 border-0 bg-transparent py-3 text-[clamp(1.4rem,3vw,2.7rem)] tracking-[-0.07em] outline-none"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                aria-describedby="contact-status"
              />
              <button
                className="bg-peach hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper grid size-12 shrink-0 place-items-center rounded-full border-0 text-xl transition duration-200 hover:rotate-45 focus-visible:rotate-45 focus-visible:outline-none"
                type="submit"
                aria-label="Enviar e-mail"
              >
                ↗
              </button>
            </div>
            <p
              id="contact-status"
              className="text-muted m-0 mt-3 text-[0.78rem]"
              aria-live="polite"
            >
              {sent
                ? 'Recebido. Em breve a gente conversa.'
                : 'Sem newsletter. Só uma conversa quando fizer sentido.'}
            </p>
          </form>
        </div>
      </section>

      <footer className="text-muted flex items-center justify-between gap-4 px-[clamp(1.25rem,3vw,3.75rem)] pt-4 pb-8 text-[0.72rem] font-bold tracking-[0.08em] uppercase max-[480px]:flex-col max-[480px]:items-start [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
        <span>Gabriel Nascimento © 2026</span>
        <Link href="#hero-title">Voltar ao topo ↑</Link>
      </footer>
    </main>
  );
}
