'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText } from '@/animations';
import { SIZE_PARALLAX_SPEED } from '../../assets/Petals.config';
import SakuraPetals from '@/components/ui/Hero/SakuraPetals';
import ZenBackground from '@/components/ui/Hero/ZenBackground';
import ScrollFrameSequence from '@/components/video/ScrollFrameSequence';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          delay: gsap.utils.random(0, 2)
        });
      });

      // 6. Parallax no scroll: um ScrollTrigger só para todas as pétalas,
      // em vez de um por elemento.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
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
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="bg-canvas relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Sakura Petals */}
      <SakuraPetals />

      {/* Scroll-Scrubbing da Raposa Sumi-e no canto inferior direito */}
      <ScrollFrameSequence
        sequencePath="/frames/fox-sumi-e"
        triggerSelector="#hero"
        className="bottom-0 left-0 aspect-video w-[90dvw] max-w-[1000px] md:w-[45dvw]"
        canvasClassName="opacity-90"
      />

      {/* Fundo Zen (Fuji, Galhos e Areia) */}
      <ZenBackground />

      <div className="w-site relative z-10 mx-auto flex flex-col items-center gap-6">
        <div className="relative flex flex-col items-end">
          <h1
            id="hero-title"
            ref={titleRef}
            className="text-hero font-heading max-w-full text-end tracking-normal max-md:max-w-[11ch]"
          >
            Interfaces com clareza, ritmo e precisao.
          </h1>
          <p className="hero-desc text-muted text-body mt-8 max-w-140 text-end">
            Desenvolvo experiencias web responsivas que combinam arquitetura de componentes,
            usabilidade e acabamento visual para valorizar produtos reais.
          </p>
        </div>
      </div>
    </section>
  );
}
