'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText } from '@/animations';
import { PETALS, SIZE_PX, SIZE_PARALLAX_SPEED } from '../../assets/Petals.config';
interface SakuraFlowerProps {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}

function SakuraFlower({ x, y, scale = 1, rotate = 0, opacity = 0.5 }: SakuraFlowerProps) {
  const path = 'M10,0 C18,8 22,18 20,25 C18,30 14,32 10,30 C6,32 2,30 0,25 C-2,18 2,8 10,0 Z';
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`}
      opacity={opacity}
      className="text-accent fill-current"
    >
      <path d={path} transform="rotate(0) translate(-10, 0)" />
      <path d={path} transform="rotate(72) translate(-10, 0)" />
      <path d={path} transform="rotate(144) translate(-10, 0)" />
      <path d={path} transform="rotate(216) translate(-10, 0)" />
      <path d={path} transform="rotate(288) translate(-10, 0)" />
      <circle cx="0" cy="0" r="1.5" className="text-paper fill-current" />
    </g>
  );
}

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
      ref={containerRef}
      className="min-h-hero-min w-site gap-grid py-hero-start pb-hero-end relative mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center max-lg:grid-cols-2 max-md:min-h-auto max-md:grid-cols-1 max-md:pt-10"
      aria-labelledby="hero-title"
    >
      {/* Sakura Petals */}
      {PETALS.map((p, index) => (
        <svg
          key={index}
          className="sakura-petal pointer-events-none absolute fill-current select-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: SIZE_PX[p.size],
            height: SIZE_PX[p.size],
            opacity: p.opacity,
            color: 'var(--color-accent)',
            filter: 'brightness(1.15) saturate(0.85)',
            transform: `rotate(${p.rotate}deg)`
          }}
          data-size={p.size}
          data-direction={p.direction}
          viewBox="-10 0 40 40"
          aria-hidden="true"
        >
          <path d={p.path} />
        </svg>
      ))}

      {/* Monte Fuji ao fundo */}
      <svg
        viewBox="0 0 1000 300"
        className="text-muted pointer-events-none absolute bottom-0 left-1/2 z-0 h-[250px] w-[120vw] max-w-[1200px] -translate-x-1/2 opacity-10 select-none md:h-[300px]"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          d="M 50 300 Q 300 280 430 80 Q 460 30 500 30 Q 540 30 570 80 Q 700 280 950 300"
          strokeWidth="1.2"
        />
        <path
          d="M 416 100 C 430 125 445 115 465 135 C 485 120 500 135 515 120 C 530 135 550 115 564 100"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>

      {/* Galhos de Sakura no topo direito */}
      <svg
        className="pointer-events-none absolute top-0 right-0 z-0 h-[350px] w-[450px] opacity-20 select-none"
        viewBox="0 0 450 350"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M450 0 C380 40 330 30 250 80 C180 120 140 100 80 170 C40 210 10 200 0 220"
          stroke="var(--color-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M300 55 C240 60 210 90 170 85 C140 80 120 90 90 70"
          stroke="var(--color-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M190 100 C150 130 130 160 100 155 C80 150 60 170 30 160"
          stroke="var(--color-muted)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M95 160 C75 190 60 195 40 230"
          stroke="var(--color-muted)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />

        <SakuraFlower x={350} y={35} scale={0.4} rotate={15} opacity={0.6} />
        <SakuraFlower x={300} y={55} scale={0.5} rotate={45} opacity={0.7} />
        <SakuraFlower x={250} y={80} scale={0.6} rotate={120} opacity={0.8} />
        <SakuraFlower x={210} y={87} scale={0.4} rotate={90} opacity={0.6} />
        <SakuraFlower x={170} y={85} scale={0.5} rotate={200} opacity={0.7} />
        <SakuraFlower x={140} y={105} scale={0.6} rotate={10} opacity={0.8} />
        <SakuraFlower x={100} y={155} scale={0.4} rotate={75} opacity={0.6} />
        <SakuraFlower x={80} y={170} scale={0.5} rotate={310} opacity={0.7} />
        <SakuraFlower x={40} y={210} scale={0.4} rotate={180} opacity={0.6} />
      </svg>

      <div className="relative z-10 col-span-full flex flex-col items-center gap-6">
        <div className="relative flex flex-col">
          {/* Talismã Japonês (Ofuda/Omamori) no topo esquerdo do Hero */}
          {/* Versão Vertical para Desktop (xl e acima) */}
          <div className="hero-label absolute top-0 -left-20 z-10 hidden select-none xl:block">
            <svg
              width="50"
              height="300"
              viewBox="0 0 36 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
            >
              {/* Papel de Fundo */}
              <rect
                x="1"
                y="1"
                width="34"
                height="198"
                rx="2"
                fill="var(--color-paper)"
                stroke="currentColor"
                strokeWidth="1.2"
              />

              {/* Linha de borda interna decorativa tracejada tradicional */}
              <rect
                x="4"
                y="4"
                width="28"
                height="192"
                rx="1"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeDasharray="3 2"
                opacity="0.75"
              />

              {/* Detalhe do topo do talismã (furo/nó do amuleto) */}
              <circle cx="18" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M18 6V9.5" stroke="currentColor" strokeWidth="1" />
              <path d="M14 6H22" stroke="currentColor" strokeWidth="0.8" />

              {/* Texto "FRONT-END DEVELOPER" vertical */}
              <text
                x="18"
                y="105"
                fill="currentColor"
                fontSize="6.8"
                fontWeight="800"
                fontFamily="inherit"
                letterSpacing="0.25em"
                textAnchor="middle"
                style={{ writingMode: 'vertical-rl' }}
              >
                FRONT-END DEVELOPER
              </text>

              {/* Carimbo de assinatura vermelha (Ensō/Inkan) na base do talismã */}
              <g transform="translate(9, 168)" opacity="0.85">
                <rect
                  x="0.5"
                  y="0.5"
                  width="17"
                  height="17"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <text
                  x="9"
                  y="12.5"
                  fill="currentColor"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="serif"
                >
                  印
                </text>
              </g>
            </svg>
          </div>

          {/* Versão Horizontal para Mobile e Tablet (menor que xl) */}
          <div className="hero-label border-accent/40 bg-paper mb-5 flex w-fit items-center gap-2.5 rounded-sm border px-3.5 py-1.5 shadow-xs select-none xl:hidden">
            {/* Símbolo do nó do talismã */}
            <div className="flex items-center gap-1">
              <span className="text-accent text-[0.62rem]">和</span>
              <div className="bg-accent/40 h-3 w-px" />
            </div>

            {/* Texto */}
            <span className="text-accent font-mono text-[0.68rem] font-bold tracking-[0.15em] uppercase">
              Front-end developer
            </span>

            {/* Selo/Símbolo do talismã na direita */}
            <div className="border-accent/60 text-accent/80 flex h-4.5 w-4.5 items-center justify-center rounded-sm border text-[0.45rem] font-bold">
              印
            </div>
          </div>
          <h1
            id="hero-title"
            ref={titleRef}
            className="text-hero font-heading max-w-full tracking-normal max-md:max-w-[11ch]"
          >
            Interfaces com clareza, ritmo e precisao.
          </h1>
          <p className="hero-desc text-muted text-body mt-8 max-w-140 text-start">
            Desenvolvo experiencias web responsivas que combinam arquitetura de componentes,
            usabilidade e acabamento visual para valorizar produtos reais.
          </p>
        </div>
      </div>

      {/* Ondas de Areia do Jardim Zen (Karesansui) */}
      <svg
        viewBox="0 0 1200 120"
        className="text-line pointer-events-none absolute bottom-0 left-0 z-0 h-[90px] w-full opacity-15 select-none md:h-[120px]"
        fill="none"
        stroke="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Padrões de ondas circulares simulando rastros ao redor de pedras no lado esquerdo */}
        <circle cx="200" cy="90" r="30" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="200" cy="90" r="45" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="200" cy="90" r="60" strokeWidth="0.8" opacity="0.3" />
        <circle cx="200" cy="90" r="75" strokeWidth="0.8" opacity="0.2" />

        {/* Linhas de ondas paralelas contínuas na base */}
        <path
          d="M 0 105 C 150 95, 300 115, 450 105 C 600 95, 750 115, 900 105 C 1050 95, 1200 115"
          strokeWidth="0.8"
        />
        <path
          d="M 0 90 C 150 80, 300 100, 450 90 C 600 80, 750 100, 900 90 C 1050 80, 1200 100"
          strokeWidth="0.8"
        />
        <path
          d="M 0 75 C 150 65, 300 85, 450 75 C 600 65, 750 85, 900 75 C 1050 65, 1200 85"
          strokeWidth="0.8"
        />

        {/* Pedras Zen minimalistas empilhadas (Wabi-Sabi) */}
        <g transform="translate(180, 65)" className="text-muted/70" opacity="0.75">
          <ellipse cx="20" cy="25" rx="18" ry="8" strokeWidth="1" />
          <ellipse cx="19" cy="18" rx="13" ry="6" strokeWidth="1" />
          <ellipse cx="21" cy="13" rx="8" ry="4" strokeWidth="1" />
        </g>
      </svg>
    </section>
  );
}
