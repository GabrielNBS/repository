import React from 'react';
import { ArrowIcon } from '@/components/ui/Icons';

export default function Hero() {
  return (
    <section
      className="min-h-hero-min w-site gap-grid py-hero-start pb-hero-end mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center max-lg:grid-cols-2 max-md:min-h-auto max-md:grid-cols-1 max-md:pt-10"
      aria-labelledby="hero-title"
    >
      <div className="relative col-span-full flex flex-col items-center gap-6 text-center">
        <p className="text-accent text-note absolute top-1.5 left-[-3.6rem] m-0 rotate-180 font-bold tracking-[0.06em] uppercase [writing-mode:vertical-rl] max-lg:hidden">
          Front-end developer
        </p>
        <div className="flex flex-col items-center">
          <h1
            id="hero-title"
            className="text-hero font-heading max-w-full tracking-normal max-md:max-w-[11ch]"
          >
            Interfaces com clareza, ritmo e precisao.
          </h1>
          <p className="text-muted text-body mt-8 max-w-140">
            Desenvolvo experiencias web responsivas que combinam arquitetura de componentes,
            usabilidade e acabamento visual para valorizar produtos reais.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            className="bg-ink text-paper hover:bg-accent-dark min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border border-transparent transition-all duration-180 hover:-translate-y-0.5 max-sm:w-full"
            href="#projects"
          >
            Ver projetos
            <ArrowIcon />
          </a>
          <a
            className="border-line text-ink hover:border-ink min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border bg-[rgb(255,255,255,0.72)] transition-all duration-180 hover:-translate-y-0.5 max-sm:w-full"
            href="#contact"
          >
            Contato
          </a>
        </div>
      </div>
    </section>
  );
}
