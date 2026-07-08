'use client';

export default function ZenBackground() {
  return (
    <>
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
    </>
  );
}
