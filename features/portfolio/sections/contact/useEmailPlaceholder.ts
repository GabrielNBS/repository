'use client';

import { useEffect, type RefObject } from 'react';

const examples = [
  'seu@email.com',
  'oi@ideia.com',
  'bora@criar.com',
  'cafe@papo.com',
  'ola@projeto.com',
  'vamos@inventar.com'
];

export function useEmailPlaceholder(inputRef: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let index = 0;
    let length = examples[0].length;
    let deleting = true;

    const stop = () => clearTimeout(timer);
    const canAnimate = () =>
      visible && !document.hidden && !reducedMotion.matches && document.activeElement !== input && !input.value;

    const tick = () => {
      if (!canAnimate()) return;

      length += deleting ? -1 : 1;
      input.placeholder = examples[index].slice(0, length);
      let delay = deleting ? 45 : 80 + Math.random() * 45;

      if (length === 0) {
        const next = Math.floor(Math.random() * (examples.length - 1));
        index = next >= index ? next + 1 : next;
        deleting = false;
        delay = 350;
      } else if (length === examples[index].length) {
        deleting = true;
        delay = 1800;
      }

      timer = setTimeout(tick, delay);
    };

    const sync = () => {
      stop();
      if (canAnimate()) {
        timer = setTimeout(tick, 1400);
      } else {
        input.placeholder = examples[0];
        index = 0;
        length = examples[0].length;
        deleting = true;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(input);
    input.addEventListener('focus', sync);
    input.addEventListener('blur', sync);
    input.addEventListener('input', sync);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      stop();
      observer.disconnect();
      input.removeEventListener('focus', sync);
      input.removeEventListener('blur', sync);
      input.removeEventListener('input', sync);
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      input.placeholder = examples[0];
    };
  }, [inputRef]);
}
