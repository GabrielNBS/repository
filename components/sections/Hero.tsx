'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText } from '@/animations';
import { ArrowIcon } from '@/components/ui/Icons';
import { PETALS, SIZE_PX, SIZE_PARALLAX_SPEED } from '../../assets/Petals.config';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 1. Animação do Label
    animateFadeIn('.hero-label', {
      x: -15,
      duration: 0.8,
      ease: 'power2.out',
    });

    // 2. Animação do Título (SplitText)
    let splitInstance: { revert: () => void } | null = null;
    if (titleRef.current) {
      splitInstance = animateSplitText(titleRef.current, {
        stagger: 0.05,
        duration: 0.9,
        ease: 'power2.out',
      });
    }

    // 3. Animação da Descrição
    animateFadeIn('.hero-desc', {
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    });

    // 4. Animação dos Botões
    animateFadeIn('.hero-actions', {
      y: 15,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Usuário pediu menos movimento: pula o flutuar contínuo e o parallax
    if (prefersReducedMotion) return;

    // 5. Flutuação contínua (vento zen) das pétalas
    const petals = gsap.utils.toArray<HTMLElement>('.sakura-petal');
    petals.forEach((petal, index) => {
      const randomX = gsap.utils.random(10, 25);
      const randomY = gsap.utils.random(15, 35);
      const randomRot = gsap.utils.random(30, 90);
      const randomDur = gsap.utils.random(5.0, 8.5);

      gsap.to(petal, {
        y: `${index % 2 === 0 ? '+=' : '-='}${randomY}`,
        x: `${index % 3 === 0 ? '+=' : '-='}${randomX}`,
        rotation: `${index % 2 === 0 ? '+=' : '-='}${randomRot}`,
        duration: randomDur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 2),
      });
    });

    // 6. Parallax no scroll: um ScrollTrigger só para todas as pétalas,
    // em vez de um por elemento.
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    petals.forEach((petal) => {
      const size = petal.dataset.size as keyof typeof SIZE_PARALLAX_SPEED;
      const direction = Number(petal.dataset.direction);
      const speedFactor = SIZE_PARALLAX_SPEED[size];

      scrollTl.to(
        petal,
        { yPercent: direction * speedFactor, ease: 'none' },
        0 // todas ancoradas no início da timeline: rodam em paralelo
      );
    });

    return () => {
      if (splitInstance) splitInstance.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-hero-min w-site gap-grid py-hero-start pb-hero-end mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center max-lg:grid-cols-2 max-md:min-h-auto max-md:grid-cols-1 max-md:pt-10"
      aria-labelledby="hero-title"
    >
      {/* Sakura Petals */}
      {PETALS.map((p, index) => (
        <svg
          key={index}
          className="sakura-petal absolute pointer-events-none fill-current select-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: SIZE_PX[p.size],
            height: SIZE_PX[p.size],
            opacity: p.opacity,
            color: 'var(--color-accent)',
            filter: 'brightness(1.15) saturate(0.85)',
            transform: `rotate(${p.rotate}deg)`,
          }}
          data-size={p.size}
          data-direction={p.direction}
          viewBox="-10 0 40 40"
          aria-hidden="true"
        >
          <path d={p.path} />
        </svg>
      ))}

      <div className="relative col-span-full flex flex-col items-center gap-6 text-center z-10">
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