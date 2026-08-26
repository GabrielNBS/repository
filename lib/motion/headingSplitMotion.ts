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
  toggleActions?: string;
}

/**
 * Finds the nearest pinned container or stage for an element if one exists.
 */
export function findPinnedContainer(element: HTMLElement): HTMLElement | null {
  // 1. Explicitly marked pinned containers/stages
  const explicit = element.closest<HTMLElement>(
    '[data-scroll-text-reveal-stage], [data-story-stage], [data-pin], [data-pinned], [data-pin-container]'
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
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  const scrollTriggerConfig: ScrollTrigger.Vars = pinnedContainer
    ? {
        trigger: options?.trigger ?? element,
        pinnedContainer,
        start: options?.start ?? 'top 85%',
        endTrigger: options?.endTrigger ?? pinnedContainer,
        end: options?.end ?? 'bottom 15%',
        toggleActions: options?.toggleActions ?? 'play reverse play reverse',
        invalidateOnRefresh: true,
        refreshPriority: 1
      }
    : {
        trigger: options?.trigger ?? element,
        start: options?.start ?? 'top 85%',
        end: options?.end ?? 'bottom 15%',
        toggleActions: options?.toggleActions ?? 'play reverse play reverse',
        invalidateOnRefresh: true,
        refreshPriority: 1
      };

  const tween = gsap.fromTo(
    split.chars,
    {
      autoAlpha: 0,
      y: options?.y ?? 40,
      filter: options?.filter ?? 'blur(8px)'
    },
    {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: options?.duration ?? 0.6,
      stagger: options?.stagger ?? 0.02,
      ease: 'power3.out',
      scrollTrigger: scrollTriggerConfig
    }
  );

  return () => {
    tween.kill();
    split.revert();
  };
}

/**
 * Applies letter-by-letter split animation with viewport enter/exit to all h1 and h2 elements within a scope,
 * automatically handling pinned stages and containers.
 */
export function createAllHeadingsSplitAnimation(
  scope?: HTMLElement | Document | null,
  options?: HeadingSplitOptions
) {
  const root = scope ?? (typeof document !== 'undefined' ? document : null);
  if (!root) return () => {};

  const headings = gsap.utils.toArray<HTMLElement>('h1, h2', root);
  if (!headings.length) return () => {};

  const cleanups = headings.map((heading) => createHeadingSplitAnimation(heading, options));

  // Refresh ScrollTrigger so all pin spacers and positions are accurately synchronized
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

/**
 * React hook to apply letter-by-letter split animation to headings within a container ref.
 */
export function useHeadingSplitMotion(
  scopeRef?: RefObject<HTMLElement | null>,
  options?: HeadingSplitOptions
) {
  useGSAP(
    () => {
      return createAllHeadingsSplitAnimation(scopeRef?.current, options);
    },
    { scope: scopeRef }
  );
}
