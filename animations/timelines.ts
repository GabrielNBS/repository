import gsap from 'gsap';
import { EASES, DURATIONS } from './presets';
import { createScrollTrigger } from './scroll';

interface ShojiCardsOptions {
  trigger: gsap.DOMTarget;
  start?: string;
  duration?: number;
  ease?: string;
}

/**
 * Animação de painéis Shoji (porta de correr/abertura lateral complementar)
 * para uma lista de exatamente 3 elementos.
 */
export function animateShojiCards(cards: HTMLElement[], options: ShojiCardsOptions) {
  if (cards.length < 3) return null;

  const {
    trigger,
    start = 'top 80%',
    duration = DURATIONS.default,
    ease = EASES.power2Out
  } = options;

  const scrollTriggerConfig = createScrollTrigger({
    trigger,
    start,
    toggleActions: 'play none none reverse'
  });

  // Card Esquerdo (x: -50)
  const t1 = gsap.from(cards[0], {
    opacity: 0,
    x: -50,
    duration,
    ease,
    scrollTrigger: scrollTriggerConfig
  });

  // Card Centro (y: 40)
  const t2 = gsap.from(cards[1], {
    opacity: 0,
    y: 40,
    duration,
    ease,
    scrollTrigger: scrollTriggerConfig
  });

  // Card Direito (x: 50)
  const t3 = gsap.from(cards[2], {
    opacity: 0,
    x: 50,
    duration,
    ease,
    scrollTrigger: scrollTriggerConfig
  });

  return [t1, t2, t3];
}
