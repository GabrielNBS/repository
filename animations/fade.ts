import gsap from 'gsap';
import { EASES, DURATIONS } from './presets';
import { createScrollTrigger, ScrollAnimationOptions } from './scroll';

interface FadeOptions {
  y?: number;
  x?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: ScrollAnimationOptions;
}

export function animateFadeIn(target: gsap.DOMTarget, options: FadeOptions = {}) {
  const {
    y = 30,
    x = 0,
    duration = DURATIONS.default,
    ease = EASES.power2Out,
    stagger,
    scrollTrigger
  } = options;

  const config: gsap.TweenVars = {
    opacity: 0,
    y,
    x,
    duration,
    ease,
    stagger
  };

  if (scrollTrigger) {
    config.scrollTrigger = createScrollTrigger(scrollTrigger);
  }

  return gsap.from(target, config);
}
