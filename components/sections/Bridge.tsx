'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateSplitText, animateFadeIn } from '@/animations';
import HashiBackground from '@/components/ui/Bridge/HashiBackground';

export default function Bridge() {
  const containerRef = useRef<HTMLElement>(null);
  const phraseRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Revelação da Frase com ScrollTrigger
      let splitInstance: { revert: () => void } | null = null;
      if (phraseRef.current) {
        splitInstance = animateSplitText(phraseRef.current, {
          type: 'words',
          y: 25,
          opacity: 0,
          stagger: 0.04,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phraseRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      // Revelação dos links rápidos
      animateFadeIn('.bridge-link-item', {
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bridge-links-container',
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        }
      });

      if (prefersReducedMotion) return;

      // 2. Parallax das Montanhas e Sol
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      scrollTl.to('.mountain-far', { yPercent: 12, ease: 'none' }, 0);
      scrollTl.to('.mountain-near', { yPercent: 22, ease: 'none' }, 0);
      scrollTl.to('.sun-bg', { yPercent: -15, ease: 'none' }, 0);
      scrollTl.to('.torii-fg', { yPercent: -6, ease: 'none' }, 0);
      scrollTl.to('.bamboo-fg', { yPercent: -8, ease: 'none' }, 0);

      // 3. Fluxo de Água do Rio (movimento horizontal contínuo)
      gsap.to('.river-flow-1', {
        x: 720,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.river-flow-2', {
        x: -720,
        duration: 28,
        repeat: -1,
        ease: 'none'
      });

      // 4. Balanço suave das folhas do bambu
      const bambooLeaves = gsap.utils.toArray<SVGPathElement>('.bamboo-leaf');
      bambooLeaves.forEach((leaf, i) => {
        gsap.to(leaf, {
          rotation: i % 2 === 0 ? 4 : -4,
          transformOrigin: 'left center',
          duration: gsap.utils.random(3.5, 5.5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2)
        });
      });

      // 5. Nuvens flutuando suavemente
      gsap.to('.kumo-cloud-1', {
        x: 60,
        duration: 32,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.kumo-cloud-2', {
        x: -50,
        duration: 26,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });

      return () => {
        if (splitInstance) splitInstance.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-canvas border-y border-line"
      aria-label="Ponte de transição e navegação"
    >
      {/* Background Zen Elements (Sol, Montanhas, Nuvens, Bambu, Torii, Rio) */}
      <HashiBackground />

      {/* Bloco Central de Conteúdo e Ações (Frase + Links Rápidos juntos) */}
      <div className="relative w-site max-w-4xl px-6 flex flex-col items-center justify-center z-10 text-center">
        {/* Rótulo da seção */}
        <span className="text-accent text-label font-label tracking-[0.25em] mb-5 uppercase block select-none">
          02 // HASHI
        </span>

        {/* A Frase Editorial */}
        <h2
          ref={phraseRef}
          className="text-bridge font-heading text-ink tracking-tight leading-relaxed max-w-[24ch] sm:max-w-[30ch] select-none"
        >
          No fluxo silencioso entre o conceito e a criação, a travessia se torna o próprio caminho.
        </h2>

        {/* Indicador de rolagem zen */}
        <div className="mt-8 md:mt-10 flex flex-col items-center gap-2 opacity-50 select-none">
          <span className="text-note tracking-[0.15em] uppercase font-bold text-muted">Rolar</span>
          <div className="w-[1px] h-[25px] bg-muted/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
