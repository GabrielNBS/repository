import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blurReveal = {
  // Estado inicial compartilhado por todos os elementos que usam
  // data-motion="blur-reveal". O movimento usa transform + opacity para evitar
  // recalcular layout enquanto a seção entra na viewport.
  hidden: { autoAlpha: 0, filter: 'blur(14px)', y: 36 },
  // Estado final do reveal. O duration/ease aqui também define o ritmo da
  // entrada quando o ScrollTrigger dispara o batch.
  visible: { autoAlpha: 1, duration: 0.9, ease: 'power3.out', filter: 'blur(0px)', y: 0 }
};

export function createBlurReveals(scope?: HTMLElement | null) {
  const elements = gsap.utils.toArray<HTMLElement>(
    '[data-motion="blur-reveal"]',
    scope ?? document
  );
  if (!elements.length) return () => {};

  // Prepara todos os alvos antes do primeiro callback do ScrollTrigger.
  gsap.set(elements, blurReveal.hidden);
  // Um único trigger é criado para o conjunto; os itens que entram próximos
  // uns dos outros são revelados em lote, com stagger de 100ms.
  const trigger = ScrollTrigger.batch(elements, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { ...blurReveal.visible, stagger: 0.1 })
  });

  return () => trigger.forEach((item) => item.kill());
}
