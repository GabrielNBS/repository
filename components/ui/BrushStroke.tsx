import React, { forwardRef } from 'react';

interface BrushStrokeProps {
  className?: string;
}

export const BrushStroke = forwardRef<SVGPathElement, BrushStrokeProps>(
  ({ className = '' }, ref) => {
    return (
      <svg
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        className={`absolute left-0 bottom-[-4px] w-full h-[8px] pointer-events-none select-none overflow-visible ${className}`}
        aria-hidden="true"
      >
        <defs>
          <filter id="sumi-brush" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          ref={ref}
          /* Traço com leve ondulação orgânica e pontas suavizadas */
          d="M 2,4.5 Q 28,2.2 50,5.2 T 98,3.8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#sumi-brush)"
        />
      </svg>
    );
  }
);

BrushStroke.displayName = 'BrushStroke';
