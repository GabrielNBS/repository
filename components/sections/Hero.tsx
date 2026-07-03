'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText } from '@/animations';
import { ArrowIcon } from '@/components/ui/Icons';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Animação do Label
    animateFadeIn('.hero-label', {
      x: -15,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 2. Animação do Título (SplitText)
    let splitInstance: { revert: () => void } | null = null;
    if (titleRef.current) {
      splitInstance = animateSplitText(titleRef.current, {
        stagger: 0.05,
        duration: 0.9,
        ease: 'power2.out'
      });
    }

    // 3. Animação da Descrição
    animateFadeIn('.hero-desc', {
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 4. Animação dos Botões
    animateFadeIn('.hero-actions', {
      y: 15,
      duration: 0.8,
      ease: 'power2.out'
    });

    return () => {
      if (splitInstance) splitInstance.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="min-h-hero-min w-site gap-grid py-hero-start pb-hero-end mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center max-lg:grid-cols-2 max-md:min-h-auto max-md:grid-cols-1 max-md:pt-10"
      aria-labelledby="hero-title"
    >
      <div className="relative col-span-full flex flex-col items-center gap-6 text-center">
        <p className="hero-label text-accent text-note absolute top-1.5 left-[-3.6rem] m-0 rotate-180 font-bold tracking-[0.06em] uppercase [writing-mode:vertical-rl] max-lg:hidden">
          Front-end developer
        </p>
        <div className="flex flex-col items-center">
          <h1
            id="hero-title"
            ref={titleRef}
            className="text-hero font-heading max-w-full tracking-normal max-md:max-w-[11ch]"
          >
            Interfaces com clareza, ritmo e precisao.
          </h1>
          <p className="hero-desc text-muted text-body mt-8 max-w-140">
            Desenvolvo experiencias web responsivas que combinam arquitetura de componentes,
            usabilidade e acabamento visual para valorizar produtos reais.
          </p>
        </div>
        <div className="hero-actions mt-4 flex flex-wrap justify-center gap-3">
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
