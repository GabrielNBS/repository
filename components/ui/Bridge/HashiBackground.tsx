'use client';

import React from 'react';

export default function HashiBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* Sol Vermelho (Aki) */}
      <div className="sun-bg bg-accent absolute top-[22%] right-[15%] h-[130px] w-[130px] rounded-full opacity-[0.06] blur-[1px]" />

      {/* Nuvem 1 (esquerda superior) */}
      <svg
        className="kumo-cloud-1 text-line absolute top-[15%] left-[8%] h-[45px] w-[90px]"
        viewBox="0 0 120 60"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M10 40c0-10 8-18 18-18 4 0 8 1 11 3 4-10 13-17 25-17 15 0 27 11 27 25 0 1-.1 2-.2 3 5 0 9 4 9 9s-4 9-9 9H18c-4.4 0-8-3.6-8-8z"
          strokeWidth="1.2"
        />
        <path
          d="M35 32c0-5 4-9 9-9 2 0 4 .5 5.5 1.5 2-5 6.5-8.5 12.5-8.5 7.5 0 13.5 5.5 13.5 12.5"
          strokeWidth="0.8"
        />
      </svg>

      {/* Nuvem 2 (direita média) */}
      <svg
        className="kumo-cloud-2 text-line absolute top-[28%] right-[12%] h-[35px] w-[70px]"
        viewBox="0 0 120 60"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M10 40c0-10 8-18 18-18 4 0 8 1 11 3 4-10 13-17 25-17 15 0 27 11 27 25 0 1-.1 2-.2 3 5 0 9 4 9 9s-4 9-9 9H18c-4.4 0-8-3.6-8-8z"
          strokeWidth="1.2"
        />
        <path
          d="M35 32c0-5 4-9 9-9 2 0 4 .5 5.5 1.5 2-5 6.5-8.5 12.5-8.5 7.5 0 13.5 5.5 13.5 12.5"
          strokeWidth="0.8"
        />
      </svg>

      {/* Montanhas Orientais com gradiente */}
      <svg
        className="absolute bottom-0 left-0 h-[40%] w-full"
        viewBox="0 0 1440 300"
        fill="none"
        preserveAspectRatio="none"
      >
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
        <path
          className="mountain-far"
          d="M-100,180 Q150,60 450,140 T1050,90 T1540,180 L1540,300 L-100,300 Z"
          fill="url(#mountain-grad-far)"
        />

        {/* Montanha próxima (Monte Fuji) */}
        <path
          className="mountain-near"
          d="M400,300 L620,110 Q650,80 690,80 Q730,80 760,110 L980,300 Z"
          fill="url(#mountain-grad-near)"
        />
      </svg>

      {/* Bambu Minimalista */}
      <svg
        className="bamboo-fg text-muted absolute right-[4%] bottom-[14%] hidden h-[260px] w-[90px] animate-none sm:block"
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

        <path
          className="bamboo-leaf"
          d="M42 178 Q25 160 10 165 C20 175 35 178 42 178 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          className="bamboo-leaf"
          d="M40 118 Q55 100 70 105 C60 115 48 118 40 118 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          className="bamboo-leaf"
          d="M38 58 Q20 40 5 45 C15 55 30 58 38 58 Z"
          fill="currentColor"
          stroke="none"
        />

        <path d="M65 300 L63 220 M63 217 L64 150 M64 147 L62 80 M62 77 L60 20" />
        <circle cx="63" cy="218.5" r="1.5" fill="currentColor" />
        <circle cx="64" cy="148.5" r="1.5" fill="currentColor" />
        <circle cx="62" cy="78.5" r="1.5" fill="currentColor" />

        <path
          className="bamboo-leaf"
          d="M64 148 Q80 130 95 135 C85 145 73 148 64 148 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          className="bamboo-leaf"
          d="M62 78 Q45 60 30 65 C40 75 52 78 62 78 Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>

      {/* Linhas de Rio / Fluxo de Água */}
      <div className="absolute bottom-0 left-0 h-[100px] w-full overflow-hidden">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            className="river-flow-1"
            d="M-1440,50 Q-1260,70 -1080,50 T-720,50 Q-540,70 -360,50 T0,50 Q180,70 360,50 T720,50 Q900,70 1080,50 T1440,50 Q1620,70 1800,50 T2160,50"
            stroke="var(--color-muted)"
            strokeWidth="1"
            opacity="0.35"
          />
          <path
            className="river-flow-2"
            d="M-1440,30 Q-1260,10 -1080,30 T-720,30 Q-540,10 -360,30 T0,30 Q180,10 360,30 T720,30 Q900,10 1080,30 T1440,30 Q1620,10 1800,30 T2160,30"
            stroke="var(--color-muted)"
            strokeWidth="1.2"
            opacity="0.25"
          />
        </svg>
      </div>
    </div>
  );
}
