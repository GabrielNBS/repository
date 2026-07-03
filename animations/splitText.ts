import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { EASES, DURATIONS } from './presets';
import { createScrollTrigger, ScrollAnimationOptions } from './scroll';

gsap.registerPlugin(SplitText);

interface SplitTextOptions {
  type?: 'chars' | 'words' | 'lines' | 'words,chars' | 'lines,words' | 'lines,words,chars';
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  scrollTrigger?: ScrollAnimationOptions;
}

export function animateSplitText(target: gsap.DOMTarget, options: SplitTextOptions = {}) {
  const {
    type = 'words',
    y = 30,
    opacity = 0,
    stagger = 0.08,
    duration = DURATIONS.default,
    ease = EASES.power2Out,
    scrollTrigger
  } = options;

  const split = new SplitText(target, { type });

  const config: gsap.TweenVars = {
    opacity,
    y,
    stagger,
    duration,
    ease
  };

  if (scrollTrigger) {
    config.scrollTrigger = createScrollTrigger(scrollTrigger);
  }

  const tween = gsap.from(split.words, config);

  return {
    split,
    tween,
    revert: () => split.revert()
  };
}
