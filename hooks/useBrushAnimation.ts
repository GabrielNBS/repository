import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseBrushAnimationProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  pathRef: React.RefObject<SVGPathElement | null>;
  textRef: React.RefObject<HTMLSpanElement | null>;
}

export function useBrushAnimation({ triggerRef, pathRef, textRef }: UseBrushAnimationProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const path = pathRef.current;
    const text = textRef.current;

    if (!trigger || !path || !text) return;

    // Detecta preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Obtém o comprimento total do path do SVG
    const length = path.getTotalLength();

    // Define estado inicial
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0,
    });

    if (prefersReducedMotion) {
      // Comportamento estático caso reduced motion esteja ativo
      const onEnter = () => {
        gsap.set(path, { opacity: 1, strokeDashoffset: 0 });
        gsap.set(text, { color: 'var(--color-accent)' });
      };
      const onLeave = () => {
        gsap.set(path, { opacity: 0, strokeDashoffset: length });
        gsap.set(text, { color: '' });
      };

      trigger.addEventListener('mouseenter', onEnter);
      trigger.addEventListener('mouseleave', onLeave);

      return () => {
        trigger.removeEventListener('mouseenter', onEnter);
        trigger.removeEventListener('mouseleave', onLeave);
      };
    }

    const handleMouseEnter = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Animação de entrada fluida (0.65s, power3.out)
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
        0
      ).to(
        text,
        {
          color: 'var(--color-accent)',
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      );

      // Bônus: Micro oscilação de opacidade simulando tinta fresca molhada
      tl.to(
        path,
        {
          opacity: 0.85,
          duration: 0.15,
          yoyo: true,
          repeat: 3,
          ease: 'sine.inOut',
        },
        0.65
      ).to(
        path,
        {
          opacity: 1,
          duration: 0.2,
        }
      );
    };

    const handleMouseLeave = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Animação de saída rápida (0.45s, power2.in)
      tl.to(
        path,
        {
          strokeDashoffset: length,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
        },
        0
      ).to(
        text,
        {
          color: '',
          duration: 0.25,
          ease: 'power2.in',
        },
        0
      );
    };

    trigger.addEventListener('mouseenter', handleMouseEnter);
    trigger.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      trigger.removeEventListener('mouseenter', handleMouseEnter);
      trigger.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [triggerRef, pathRef, textRef]);
}
