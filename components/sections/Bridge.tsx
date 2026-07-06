'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateSplitText, animateFadeIn } from '@/animations';

export default function Bridge() {
  const containerRef = useRef<HTMLElement>(null);
  const phraseRef = useRef<HTMLHeadingElement>(null);
  const bambooRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

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
          toggleActions: 'play none none reverse',
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
        toggleActions: 'play none none reverse',
      }
    });

    if (prefersReducedMotion) return;

    // 2. Parallax das Montanhas e Sol
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
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
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-canvas border-y border-line"
      aria-label="Ponte de transição e navegação"
    >
      {/* Background Zen Elements (Sol, Montanhas, Nuvens, Bambu, Torii, Rio) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        
        {/* Sol Vermelho (Aki) */}
        <div className="sun-bg absolute top-[22%] right-[15%] w-[130px] h-[130px] rounded-full bg-accent opacity-[0.06] blur-[1px]" />

        {/* Nuvem 1 (esquerda superior) */}
        <svg className="kumo-cloud-1 absolute top-[15%] left-[8%] text-line h-[45px] w-[90px]" viewBox="0 0 120 60" fill="none" stroke="currentColor">
          <path d="M10 40c0-10 8-18 18-18 4 0 8 1 11 3 4-10 13-17 25-17 15 0 27 11 27 25 0 1-.1 2-.2 3 5 0 9 4 9 9s-4 9-9 9H18c-4.4 0-8-3.6-8-8z" strokeWidth="1.2" />
          <path d="M35 32c0-5 4-9 9-9 2 0 4 .5 5.5 1.5 2-5 6.5-8.5 12.5-8.5 7.5 0 13.5 5.5 13.5 12.5" strokeWidth="0.8" />
        </svg>

        {/* Nuvem 2 (direita média) */}
        <svg className="kumo-cloud-2 absolute top-[28%] right-[12%] text-line h-[35px] w-[70px]" viewBox="0 0 120 60" fill="none" stroke="currentColor">
          <path d="M10 40c0-10 8-18 18-18 4 0 8 1 11 3 4-10 13-17 25-17 15 0 27 11 27 25 0 1-.1 2-.2 3 5 0 9 4 9 9s-4 9-9 9H18c-4.4 0-8-3.6-8-8z" strokeWidth="1.2" />
          <path d="M35 32c0-5 4-9 9-9 2 0 4 .5 5.5 1.5 2-5 6.5-8.5 12.5-8.5 7.5 0 13.5 5.5 13.5 12.5" strokeWidth="0.8" />
        </svg>

        {/* Montanhas Orientais com gradiente */}
        <svg className="absolute bottom-0 left-0 w-full h-[40%]" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountain-grad-far" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-soft)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-canvas)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="mountain-grad-near" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-line)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-canvas)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Montanha distante */}
          <path className="mountain-far" d="M-100,180 Q150,60 450,140 T1050,90 T1540,180 L1540,300 L-100,300 Z" fill="url(#mountain-grad-far)" />
          
          {/* Montanha próxima (Monte Fuji) */}
          <path className="mountain-near" d="M400,300 L620,110 Q650,80 690,80 Q730,80 760,110 L980,300 Z" fill="url(#mountain-grad-near)" />
        </svg>

        {/* Bambu Minimalista */}
        <svg
          ref={bambooRef}
          className="bamboo-fg absolute bottom-[14%] right-[4%] text-muted h-[260px] w-[90px] hidden sm:block"
          viewBox="0 0 100 300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M40 300 L41 240 M41 237 L42 180 M42 177 L40 120 M40 117 L38 60 M38 57 L39 10" />
          <circle cx="41" cy="238.5" r="1.5" fill="currentColor" />
          <circle cx="42" cy="178.5" r="1.5" fill="currentColor" />
          <circle cx="40" cy="118.5" r="1.5" fill="currentColor" />
          <circle cx="38" cy="58.5" r="1.5" fill="currentColor" />

          <path className="bamboo-leaf" d="M42 178 Q25 160 10 165 C20 175 35 178 42 178 Z" fill="currentColor" stroke="none" />
          <path className="bamboo-leaf" d="M40 118 Q55 100 70 105 C60 115 48 118 40 118 Z" fill="currentColor" stroke="none" />
          <path className="bamboo-leaf" d="M38 58 Q20 40 5 45 C15 55 30 58 38 58 Z" fill="currentColor" stroke="none" />

          <path d="M65 300 L63 220 M63 217 L64 150 M64 147 L62 80 M62 77 L60 20" />
          <circle cx="63" cy="218.5" r="1.5" fill="currentColor" />
          <circle cx="64" cy="148.5" r="1.5" fill="currentColor" />
          <circle cx="62" cy="78.5" r="1.5" fill="currentColor" />

          <path className="bamboo-leaf" d="M64 148 Q80 130 95 135 C85 145 73 148 64 148 Z" fill="currentColor" stroke="none" />
          <path className="bamboo-leaf" d="M62 78 Q45 60 30 65 C40 75 52 78 62 78 Z" fill="currentColor" stroke="none" />
        </svg>

        {/* Linhas de Rio / Fluxo de Água */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
            <path className="river-flow-1" d="M-1440,50 Q-1260,70 -1080,50 T-720,50 Q-540,70 -360,50 T0,50 Q180,70 360,50 T720,50 Q900,70 1080,50 T1440,50 Q1620,70 1800,50 T2160,50" stroke="var(--color-line)" strokeWidth="1" opacity="0.35" />
            <path className="river-flow-2" d="M-1440,30 Q-1260,10 -1080,30 T-720,30 Q-540,10 -360,30 T0,30 Q180,10 360,30 T720,30 Q900,10 1080,30 T1440,30 Q1620,10 1800,30 T2160,30" stroke="var(--color-line)" strokeWidth="1.2" opacity="0.25" />
          </svg>
        </div>

      </div>

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
