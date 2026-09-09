'use client';

import { cn } from '@/lib/utils';
import ProjectShaderGradient from '@/features/portfolio/projects/ProjectShaderGradient';
import type { ProjectTone } from '@/features/portfolio/projects/data/projectTone';
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
  shaderTone?: ProjectTone;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc?: string;
  cards: ScrollSplitCardItem[];
  technologies?: { name: string; icon: React.ReactNode; tone?: string }[];
  containerRef?: React.RefObject<HTMLElement | null>;
  startLabel?: string;
  endLabel?: string;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  technologies = [],
  containerRef: externalContainerRef,
  startLabel = 'Scroll down',
  endLabel = 'So cool, right?'
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTechnology, setActiveTechnology] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ['start start', 'end end']
  });

  // Stage 1 to 2: Separation (0 to 0.32), then Stage 2 to 3: Overlap closer (0.32 to 0.72).
  // The shorter first stage makes the three-panel layout arrive sooner on scroll.
  const leftX = useTransform(scrollYProgress, [0, 0.32, 0.72], [0, -48, -24]);
  const rightX = useTransform(scrollYProgress, [0, 0.32, 0.72], [0, 48, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.32], [1, 0.9]);

  // Stage 2 to 3: Flip (0.32 to 0.72)
  const rotateY = useTransform(scrollYProgress, [0.32, 0.72], [0, 180]);
  // Due to 180deg Y flip, positive Z becomes visual counter-clockwise, negative Z becomes visual clockwise
  const rotateZLeft = useTransform(scrollYProgress, [0.32, 0.72], [0, 6]);
  const rotateZRight = useTransform(scrollYProgress, [0.32, 0.72], [0, -6]);

  // Dynamic borders/radii so it looks like ONE flat image initially
  const borderRadiusLeft = useTransform(
    scrollYProgress,
    [0, 0.16],
    ['16px 0px 0px 16px', '16px 16px 16px 16px']
  );
  const borderRadiusMiddle = useTransform(
    scrollYProgress,
    [0, 0.16],
    ['0px 0px 0px 0px', '16px 16px 16px 16px']
  );
  const borderRadiusRight = useTransform(
    scrollYProgress,
    [0, 0.16],
    ['0px 16px 16px 0px', '16px 16px 16px 16px']
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.16], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.16], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // Cards move up in the last viewport
  const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -200]);

  // Text appearance at the end in the sticky viewport
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);
  const textScale = useTransform(scrollYProgress, [0.8, 1], [1, 1.1]);

  // Indicator text appearance at the start
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className={cn('relative h-[500vh] w-full', className)}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px]">
        {/* Starting Text indicator */}
        <motion.div
          className="absolute top-[20%] right-0 left-0 text-center"
          style={{
            opacity: startTextOpacity,
            y: startTextY
          }}
        >
          <p className="text-muted text-label font-medium tracking-widest uppercase">
            {startLabel}
          </p>
        </motion.div>

        <motion.div
          style={{ scale, y: cardsY, transformStyle: 'preserve-3d' }}
          className="relative flex h-[clamp(22rem,52vh,38rem)] w-[64vw] max-w-[calc(100vw-2rem)] px-4"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i, // Ensures Left is under Middle, and Right is above Middle.
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Front Side: Original Image Split */}
              <motion.div
                className="absolute inset-0 overflow-hidden backface-hidden"
                style={{
                  zIndex: 2, // Ensure front stays above initially
                  borderRadius:
                    i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow
                }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: imageSrc
                      ? `url(${imageSrc})`
                      : 'linear-gradient(135deg, var(--color-peach), var(--color-cream))',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                  }}
                />
              </motion.div>

              {/* Back Side: New Content Card */}
              <motion.div
                className={cn(
                  'absolute inset-0 flex flex-col justify-end overflow-hidden p-8 will-change-transform [backface-visibility:hidden]',
                  'border border-white/5 bg-linear-to-br from-white/10 to-transparent',
                  'shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]'
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: 'rotateY(180deg)',
                  zIndex: 1, // Ensure back is behind before flip
                  borderRadius:
                    i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow
                }}
              >
                {/* Shader surface stays behind the readable card content. */}
                {card.shaderTone && (
                  <ProjectShaderGradient
                    tone={card.shaderTone}
                    className="pointer-events-none absolute inset-0 opacity-80"
                  />
                )}
                <div
                  className="bg-ink/15 pointer-events-none absolute inset-0"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256")`,
                    backgroundRepeat: 'repeat'
                  }}
                />

                {card.icon && (
                  <div
                    className="absolute top-6 left-6 z-10 grid size-12 place-items-center rounded-full border border-current/20 bg-black/10 backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>
                )}
                <h3 className="relative z-10 mb-4 text-2xl leading-tight font-medium">
                  {card.title}
                </h3>
                <p className="relative z-10 text-sm opacity-80">{card.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ending Text fixed in the sticky viewport */}
        <motion.div
          className="absolute right-0 bottom-[20%] left-0 text-center"
          style={{
            opacity: textOpacity,
            y: textY,
            scale: textScale
          }}
        >
          <p className="text-ink/80 font-serif text-3xl font-medium tracking-tight italic">
            {endLabel}
          </p>
        </motion.div>

        {/* Technologies are intentionally icon-only to keep the ending quiet and scannable. */}
        {technologies.length > 0 && (
          <motion.div
            className="absolute right-0 bottom-[7%] left-0 flex flex-wrap justify-center gap-2.5 px-6"
            style={{ opacity: textOpacity, y: textY }}
            aria-label="Tecnologias utilizadas"
          >
            {technologies.map((technology, index) => {
              const isActive = activeTechnology === index;
              const hasActiveTechnology = activeTechnology !== null;

              return (
                <motion.button
                  key={technology.name}
                  type="button"
                  aria-label={technology.name}
                  aria-describedby={isActive ? `technology-popover-${index}` : undefined}
                  className={cn(
                    'border-ink/15 bg-paper/45 relative grid size-10 place-items-center rounded-full border text-lg backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2',
                    technology.tone ?? 'text-ink'
                  )}
                  animate={{
                    scale: isActive ? 1.32 : hasActiveTechnology ? 0.78 : 1,
                    y: isActive ? -5 : 0,
                    opacity: isActive ? 1 : hasActiveTechnology ? 0.42 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.6 }}
                  onHoverStart={() => setActiveTechnology(index)}
                  onHoverEnd={() => setActiveTechnology(null)}
                  onFocus={() => setActiveTechnology(index)}
                  onBlur={() => setActiveTechnology(null)}
                  onClick={() =>
                    setActiveTechnology((current) => (current === index ? null : index))
                  }
                >
                  <span className="sr-only">{technology.name}</span>
                  {technology.icon}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        id={`technology-popover-${index}`}
                        role="tooltip"
                        className="bg-ink text-paper pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 z-30 -translate-x-1/2 rounded-full px-3 py-2 text-xs font-semibold whitespace-nowrap shadow-lg"
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.92 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        {technology.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
