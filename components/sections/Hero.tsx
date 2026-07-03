'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
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

    // 5. Animação das Pétalas de Sakura (Flutuação contínua - Vento Zen)
    gsap.to('.sakura-petal-1', {
      y: '+=25',
      x: '+=15',
      rotation: '+=45',
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.sakura-petal-2', {
      y: '-=20',
      x: '-=12',
      rotation: '-=35',
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.sakura-petal-3', {
      y: '+=30',
      x: '-=15',
      rotation: '+=50',
      duration: 7.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.sakura-petal-4', {
      y: '-=15',
      x: '+=20',
      rotation: '-=40',
      duration: 6.0,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 6. Animação de Paralax com ScrollTrigger
    gsap.to('.sakura-petal-1', {
      yPercent: 120,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.sakura-petal-2', {
      yPercent: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.sakura-petal-3', {
      yPercent: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.sakura-petal-4', {
      yPercent: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
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
      <svg
        className="sakura-petal-1 absolute top-[15%] left-[6%] w-[22px] h-[22px] pointer-events-none fill-current select-none opacity-45"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)' }}
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>

      <svg
        className="sakura-petal-2 absolute top-[72%] left-[22%] w-[26px] h-[26px] pointer-events-none fill-current select-none opacity-30"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(45deg)' }}
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,6 24,14 22,23 C20,28 16,30 10,27 C4,30 0,28 -2,23 C-4,14 2,6 10,0 Z" />
      </svg>

      <svg
        className="sakura-petal-3 absolute top-[18%] right-[12%] w-[28px] h-[28px] pointer-events-none fill-current select-none opacity-35"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(-30deg)' }}
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>

      <svg
        className="sakura-petal-4 absolute top-[65%] right-[8%] w-[24px] h-[24px] pointer-events-none fill-current select-none opacity-40"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(110deg)' }}
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C17,7 21,15 19,22 C17,27 13,29 10,26 C7,29 3,27 1,22 C-1,15 3,7 10,0 Z" />
      </svg>

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
