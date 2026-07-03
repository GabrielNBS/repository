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

    // 5. Loop para animar dinamicamente todas as Pétalas de Sakura
    const petals = gsap.utils.toArray<HTMLElement>('.sakura-petal');
    petals.forEach((petal, index) => {
      // Vento Zen: Flutuação contínua assimétrica e com delays aleatórios
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
        delay: gsap.utils.random(0, 2)
      });

      // Efeito de Profundidade no Scroll (Paralax 3D baseado no data-size)
      const sizeAttr = petal.getAttribute('data-size') || 'medium';
      let speedFactor = 100;
      if (sizeAttr === 'small') speedFactor = 60;
      if (sizeAttr === 'large') speedFactor = 160;

      // Direção do paralax alternada para movimento mais natural
      const direction = index % 3 === 0 ? -0.8 : 1.2;

      gsap.to(petal, {
        yPercent: direction * speedFactor,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
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
        className="sakura-petal absolute top-[12%] left-[4%] w-4 h-4 pointer-events-none fill-current select-none opacity-40"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)' }}
        data-size="small"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[25%] left-[8%] w-6 h-6 pointer-events-none fill-current select-none opacity-30"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(25deg)' }}
        data-size="medium"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,6 24,14 22,23 C20,28 16,30 10,27 C4,30 0,28 -2,23 C-4,14 2,6 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[45%] left-[3%] w-5 h-5 pointer-events-none fill-current select-none opacity-45"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(-15deg)' }}
        data-size="medium"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[78%] left-[12%] w-7 h-7 pointer-events-none fill-current select-none opacity-35"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(50deg)' }}
        data-size="large"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,6 24,14 22,23 C20,28 16,30 10,27 C4,30 0,28 -2,23 C-4,14 2,6 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[88%] left-[5%] w-4 h-4 pointer-events-none fill-current select-none opacity-40"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(10deg)' }}
        data-size="small"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[15%] right-[25%] w-5 h-5 pointer-events-none fill-current select-none opacity-25"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(-40deg)' }}
        data-size="medium"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[8%] right-[10%] w-[18px] h-[18px] pointer-events-none fill-current select-none opacity-45"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(15deg)' }}
        data-size="small"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[28%] right-[5%] w-8 h-8 pointer-events-none fill-current select-none opacity-20"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(95deg)' }}
        data-size="large"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,6 24,14 22,23 C20,28 16,30 10,27 C4,30 0,28 -2,23 C-4,14 2,6 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[48%] right-[18%] w-6 h-6 pointer-events-none fill-current select-none opacity-30"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(-20deg)' }}
        data-size="medium"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[68%] right-[6%] w-[26px] h-[26px] pointer-events-none fill-current select-none opacity-35"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(115deg)' }}
        data-size="large"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C17,7 21,15 19,22 C17,27 13,29 10,26 C7,29 3,27 1,22 C-1,15 3,7 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[85%] right-[20%] w-[16px] h-[16px] pointer-events-none fill-current select-none opacity-40"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(35deg)' }}
        data-size="small"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
      </svg>
      <svg
        className="sakura-petal absolute top-[55%] left-[28%] w-[22px] h-[22px] pointer-events-none fill-current select-none opacity-25"
        style={{ color: 'var(--color-accent)', filter: 'brightness(1.15) saturate(0.85)', transform: 'rotate(-60deg)' }}
        data-size="medium"
        viewBox="-10 0 40 40"
        aria-hidden="true"
      >
        <path d="M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z" />
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
