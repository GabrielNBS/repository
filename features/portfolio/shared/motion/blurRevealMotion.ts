import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blurReveal = {
  hidden: { autoAlpha: 0, filter: 'blur(14px)', y: 36 },
  visible: { autoAlpha: 1, duration: 0.9, ease: 'power3.out', filter: 'blur(0px)', y: 0 }
};

export function createBlurReveals(scope?: HTMLElement | null) {
  const elements = gsap.utils.toArray<HTMLElement>('[data-blur-reveal]', scope ?? document);
  if (!elements.length) return () => {};

  gsap.set(elements, blurReveal.hidden);
  const trigger = ScrollTrigger.batch(elements, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { ...blurReveal.visible, stagger: 0.1 })
  });

  return () => trigger.forEach((item) => item.kill());
}
