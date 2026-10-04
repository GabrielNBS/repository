'use client';

import { useId, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface DrawingMap {
  width: number;
  height: number;
  strokeWidth: number;
  totalLength: number;
  paths: { d: string; length: number }[];
}

/** Reveals the original raster ink through centerlines traced from that asset. */
export default function RasterDrawing({
  src,
  alt,
  drawing,
  className
}: {
  src: string;
  alt: string;
  drawing: DrawingMap;
  className?: string;
}) {
  const root = useRef<SVGSVGElement>(null);
  const completed = useRef<string | null>(null);
  const maskId = `drawing-${useId().replace(/:/g, '')}`;

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg) return;
      const artwork = svg.querySelector('image');
      const media = gsap.matchMedia();
      // Keep the illustration painted on compact screens instead of delaying
      // its largest contentful paint until the drawing animation completes.
      media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
          if (completed.current === src) {
          artwork?.removeAttribute('mask');
          return;
        }
        const paths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-draw]'));
        const completeMask = svg.querySelector('[data-complete-mask]');
        gsap.set(completeMask, { opacity: 0 });
        gsap.set(paths, { attr: { 'stroke-dashoffset': 1 } });
        const timeline = gsap.timeline({
          paused: true,
          onComplete: () => {
              completed.current = src;
            artwork?.removeAttribute('mask');
          }
        });
        let elapsed = 0;
        paths.forEach((path, index) => {
          const fraction = drawing.paths[index].length / drawing.totalLength;
          timeline.to(
            path,
            {
              attr: { 'stroke-dashoffset': 0 },
              duration: Math.max(0.08, fraction * 2.8),
              ease: 'none'
            },
            elapsed
          );
          elapsed += fraction * 2.6;
        });
        // Include antialiasing and any filled source pixels, then display the
        // original without a mask so the final state is pixel-for-pixel faithful.
        timeline.to(completeMask, { opacity: 1, duration: 0.16 });

        let entered = false;
        let loaded = false;
        let disposed = false;
        const preload = new window.Image();
        preload.onload = () => {
          if (disposed) return;
          loaded = true;
          if (entered) timeline.play();
        };
        preload.onerror = () => artwork?.removeAttribute('mask');
        preload.src = src;
        const trigger = ScrollTrigger.create({
          trigger: svg,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            entered = true;
            if (loaded) timeline.play();
          }
        });
        return () => {
          disposed = true;
          trigger.kill();
          preload.onload = null;
          preload.onerror = null;
          artwork?.setAttribute('mask', `url(#${maskId})`);
        };
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [src, drawing], revertOnUpdate: true }
  );

  return (
    <svg
      ref={root}
      className={className}
      viewBox={`0 0 ${drawing.width} ${drawing.height}`}
      role="img"
      aria-label={alt}
      focusable="false"
      data-raster-drawing=""
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={drawing.width}
          height={drawing.height}
          style={{ maskType: 'luminance' }}
        >
          <rect width={drawing.width} height={drawing.height} fill="white" data-complete-mask="" />
          <g
            fill="none"
            stroke="white"
            strokeWidth={drawing.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {drawing.paths.map(({ d }, index) => (
              <path
                key={index}
                d={d}
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="0"
                data-draw=""
              />
            ))}
          </g>
        </mask>
      </defs>
      <image href={src} width={drawing.width} height={drawing.height} mask={`url(#${maskId})`} />
    </svg>
  );
}
