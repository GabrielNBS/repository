'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export interface HeadingSplitOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  endTrigger?: string | HTMLElement;
  pinnedContainer?: string | HTMLElement;
  duration?: number;
  stagger?: number;
  y?: number;
  filter?: string;
  /** Set to false to let ScrollTrigger use its default actions. */
  toggleActions?: string | false;
}

/**
 * Finds the nearest pinned container or stage for an element if one exists.
 */
export function findPinnedContainer(element: HTMLElement): HTMLElement | null {
  // 1. Explicitly marked pinned containers/stages
  const explicit = element.closest<HTMLElement>(
    '[data-motion="story-stage"], [data-layout="pin"], [data-layout="pinned"], [data-layout="pin-container"]'
  );
  if (explicit) return explicit;

  // 2. Check if element is inside a ScrollTrigger pin-spacer
  const pinSpacer = element.closest<HTMLElement>('.pin-spacer');
  if (pinSpacer) {
    const pinnedChild = pinSpacer.firstElementChild;
    if (pinnedChild instanceof HTMLElement) {
      return pinnedChild;
    }
    return pinSpacer;
  }

  // 3. Dynamic check against active ScrollTrigger pins
  if (typeof window !== 'undefined') {
    const allTriggers = ScrollTrigger.getAll();
    for (const st of allTriggers) {
      if (st.pin && st.pin instanceof HTMLElement && st.pin.contains(element)) {
        return st.pin;
      }
    }
  }

  return null;
}

/**
 * Creates letter-by-letter split animation with viewport enter/exit for a single element,
 * properly adapting when inside pinned containers so text is not removed prematurely.
 */
export function createHeadingSplitAnimation(
  target: HTMLElement | string,
  options?: HeadingSplitOptions
) {
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return () => {};

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return () => {};

  const split = SplitText.create(element, {
    aria: 'auto',
    type: 'words,chars',
    charsClass: 'inline-block'
  });

  const pinnedContainer =
    options?.pinnedContainer !== undefined
      ? typeof options.pinnedContainer === 'string'
        ? document.querySelector<HTMLElement>(options.pinnedContainer)
        : options.pinnedContainer
      : findPinnedContainer(element);

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    trigger: options?.trigger ?? element,
    start: options?.start ?? 'top 85%',
    end: options?.end ?? 'bottom 15%',
    ...(pinnedContainer
      ? {
          pinnedContainer,
          endTrigger: options?.endTrigger ?? pinnedContainer
        }
      : options?.endTrigger
        ? { endTrigger: options.endTrigger }
        : {}),
    ...(options?.toggleActions === false
      ? {}
      : { toggleActions: options?.toggleActions ?? 'restart reverse restart reverse' }),
    invalidateOnRefresh: true,
    refreshPriority: 1
  };

  gsap.set(split.chars, {
    autoAlpha: 0,
    y: options?.y ?? 40,
    filter: options?.filter ?? 'blur(8px)'
  });

  const timeline = gsap.timeline({ scrollTrigger: scrollTriggerConfig });
  timeline.to(split.chars, {
    autoAlpha: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: options?.duration ?? 0.6,
    stagger: options?.stagger ?? 0.02,
    ease: 'power3.out'
  });

  return () => {
    timeline.kill();
    split.revert();
  };
}

/**
 * React hook for a single heading. The heading component owns the target, so this
 * motion layer never has to infer which elements should be animated.
 */
export function useHeadingSplitMotion(
  scopeRef: RefObject<HTMLElement | null>,
  options?: HeadingSplitOptions
) {
  useGSAP(
    () => {
      const heading = scopeRef.current;
      if (!heading) return;

      return createHeadingSplitAnimation(heading, options);
    },
    { dependencies: [options], revertOnUpdate: true, scope: scopeRef }
  );
}
