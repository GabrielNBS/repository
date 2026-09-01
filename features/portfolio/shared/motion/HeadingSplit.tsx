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

  useHeadingSplitMotion(headingRef, options);

  return (
    <Tag {...headingProps} ref={headingRef}>
      {children}
    </Tag>
  );
}

export default HeadingSplit;
