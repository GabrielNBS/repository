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
      className="bg-canvas border-line relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden border-y"
      aria-label="Ponte de transição e navegação"
    >
      {/* Background Zen Elements (Sol, Montanhas, Nuvens, Bambu, Torii, Rio) */}
      <HashiBackground />

      {/* Bloco Central de Conteúdo e Ações (Frase + Links Rápidos juntos) */}
      <div className="w-site relative z-10 flex max-w-4xl flex-col items-center justify-center px-6 text-center">
        {/* Rótulo da seção */}
        <span className="text-accent text-label font-label mb-5 block tracking-[0.25em] uppercase select-none">
          02 // HASHI
        </span>

        {/* A Frase Editorial */}
        <h2
          ref={phraseRef}
          className="text-bridge font-heading text-ink max-w-[24ch] leading-relaxed tracking-tight select-none sm:max-w-[30ch]"
        >
          No fluxo silencioso entre o conceito e a criação, a travessia se torna o próprio caminho.
        </h2>

        {/* Indicador de rolagem zen */}
        <div className="mt-8 flex flex-col items-center gap-2 opacity-50 select-none md:mt-10">
          <span className="text-note text-muted font-bold tracking-[0.15em] uppercase">Rolar</span>
          <div className="bg-muted/30 relative h-[25px] w-[1px] overflow-hidden">
            <div className="bg-accent absolute top-0 left-0 h-1/2 w-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
