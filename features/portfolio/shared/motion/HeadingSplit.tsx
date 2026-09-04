'use client';

import { useMemo, useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { type HeadingSplitOptions, useHeadingSplitMotion } from './headingSplitMotion';

type HeadingTag = 'h1' | 'h2';

export interface HeadingSplitProps extends HTMLAttributes<HTMLHeadingElement>, HeadingSplitOptions {
  as: HeadingTag;
  children: ReactNode;
}

/**
 * Semantic heading with an opt-in, per-instance character reveal animation.
 * Set toggleActions to false when the ScrollTrigger default is preferred.
 */
export function HeadingSplit({
  as: Tag,
  children,
  trigger,
  start,
  end,
  endTrigger,
  pinnedContainer,
  duration,
  stagger,
  y,
  filter,
  toggleActions,
  ...headingProps
}: HeadingSplitProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  // O componente só organiza as opções por instância; a configuração GSAP e
  // o cleanup vivem em headingSplitMotion.ts. Assim ajustes de timing podem
  // ser feitos por props sem duplicar a implementação do reveal.
  const options = useMemo(
    () => ({
      duration,
      end,
      endTrigger,
      filter,
      pinnedContainer,
      stagger,
      start,
      toggleActions,
      trigger,
      y
    }),
    [duration, end, endTrigger, filter, pinnedContainer, stagger, start, toggleActions, trigger, y]
  );

  // O ref é o scope do hook, mantendo SplitText/ScrollTrigger limitados a este
  // heading e evitando que dois headings compartilhem os mesmos caracteres.
  useHeadingSplitMotion(headingRef, options);

  return (
    <Tag {...headingProps} ref={headingRef}>
      {children}
    </Tag>
  );
}

export default HeadingSplit;
