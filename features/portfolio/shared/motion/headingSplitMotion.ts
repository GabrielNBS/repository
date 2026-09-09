'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { RefObject } from 'react';
import { SPLIT_TEXT_CHAR_INSET } from './splitTextSafety';

// Registro único dos plugins necessários para dividir headings e disparar
// seus reveals quando entram na viewport.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Um heading pode ser montado pelo componente e também descoberto por uma
// timeline de seção. Guardar a instância ativa evita que dois SplitText e dois
// ScrollTriggers disputem os mesmos nós, especialmente durante um pin.
const activeHeadingSplits = new WeakMap<HTMLElement, () => void>();

export interface HeadingSplitOptions {
  // Estes valores são pontos de controle da entrada. O trigger/start/end
  // podem ser trocados por uma seção pinada sem alterar o componente visual.
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
  // 1. Primeiro respeita containers declarados no markup: são a fonte mais
  // confiável para alinhar o ScrollTrigger com uma história pinada.
  const explicit = element.closest<HTMLElement>(
    '[data-motion="story-stage"], [data-story-stage], [data-layout="pin"], [data-layout="pinned"], [data-layout="pin-container"]'
  );
  if (explicit) return explicit;

  // 2. Depois identifica o pin-spacer criado automaticamente pelo GSAP.
  const pinSpacer = element.closest<HTMLElement>('.pin-spacer');
  if (pinSpacer) {
    const pinnedChild = pinSpacer.firstElementChild;
    if (pinnedChild instanceof HTMLElement) {
      return pinnedChild;
    }
    return pinSpacer;
  }

  // 3. Como fallback, consulta pins ativos para casos em que o DOM foi
  // alterado depois da criação do trigger.
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

  // O mesmo heading pode ser registrado pelo componente e por uma motion
  // orchestration da página. Reutilizar a primeira instância mantém o estado
  // dos caracteres e o progresso do ScrollTrigger determinísticos.
  if (activeHeadingSplits.has(element)) return () => {};

  // Divide o heading em palavras e caracteres. A máscara evita que cada
  // caractere apareça fora do seu recorte enquanto sobe e perde o blur.
  const split = SplitText.create(element, {
    aria: 'auto',
    type: 'words,chars',
    charsClass: 'split-motion-char'
  });

  const pinnedContainer =
    options?.pinnedContainer !== undefined
      ? typeof options.pinnedContainer === 'string'
        ? document.querySelector<HTMLElement>(options.pinnedContainer)
        : options.pinnedContainer
      : findPinnedContainer(element);

  // Um ScrollTrigger filho com `pinnedContainer` + `endTrigger` pode calcular
  // o intervalo depois do pin pai e deixar os chars presos em autoAlpha: 0.
  // Em vez de aninhar dois intervalos, o split acompanha a geometria renderizada
  // do próprio heading. O pin continua sendo controlado pela timeline pai.
  const isInsidePinnedContainer = Boolean(pinnedContainer);
  const defaultToggleActions = isInsidePinnedContainer
    ? 'play none none none'
    : 'restart reverse restart reverse';
  const scrollTriggerConfig: ScrollTrigger.Vars = {
    // Mede a posição renderizada do heading. Isso continua funcionando quando
    // o ancestor está pinado e recebe transform, sem depender da ordem em que
    // o React cria o pin-spacer e o hook do heading.
    trigger: options?.trigger ?? element,
    start: options?.start ?? 'top 85%',
    end: options?.end ?? 'bottom 15%',
    ...(options?.endTrigger ? { endTrigger: options.endTrigger } : {}),
    ...(options?.toggleActions === false
      ? {}
      : { toggleActions: options?.toggleActions ?? defaultToggleActions }),
    invalidateOnRefresh: true,
    refreshPriority: 1
  };

  // Estado inicial dos caracteres. SPLIT_TEXT_CHAR_INSET preserva acentos e
  // bordas giradas; y/filter são transform e paint local, sem mudar layout.
  gsap.set(split.chars, {
    autoAlpha: 0,
    ...SPLIT_TEXT_CHAR_INSET,
    y: options?.y ?? 40,
    filter: options?.filter ?? 'blur(8px)'
  });

  // O ScrollTrigger fica na timeline raiz, conforme a regra de composição do
  // GSAP; assim todos os caracteres compartilham o mesmo progresso.
  const timeline = gsap.timeline({ scrollTrigger: scrollTriggerConfig });
  timeline.to(split.chars, {
    autoAlpha: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: options?.duration ?? 0.6,
    stagger: options?.stagger ?? 0.02,
    ease: 'power3.out'
  });

  const cleanup = () => {
    timeline.kill();
    split.revert();
    activeHeadingSplits.delete(element);
  };

  activeHeadingSplits.set(element, cleanup);
  return cleanup;
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
      // O componente dono do heading fornece o scope e centraliza o cleanup
      // quando as opções mudam ou o componente sai da árvore.
      const heading = scopeRef.current;
      if (!heading) return;

      return createHeadingSplitAnimation(heading, options);
    },
    { dependencies: [options], revertOnUpdate: true, scope: scopeRef }
  );
}
