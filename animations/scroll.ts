import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollAnimationOptions {
  trigger: gsap.DOMTarget;
  start?: string | number;
  toggleActions?: string;
  scrub?: boolean | number;
  [key: string]: unknown;
}

export function createScrollTrigger(options: ScrollAnimationOptions) {
  const { trigger, start = 'top 85%', toggleActions = 'play none none reverse', scrub, ...rest } = options;
  return {
    trigger,
    start,
    toggleActions,
    scrub,
    ...rest
  };
}
