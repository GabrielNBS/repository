'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin no client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  /** Conteúdo ou string a ser animada. Se for string e a animação for 'word' ou 'letter', ela será dividida dinamicamente. */
  children: React.ReactNode;
  /** Identificador único opcional para o elemento DOM. */
  id?: string;
  /** Tipo de animação predefinida:
   * - 'fade-up': Desliza para cima com fade-in.
   * - 'fade-down': Desliza para baixo com fade-in.
   * - 'scale': Aumenta a escala levemente com fade-in.
   * - 'word': Divide o texto e revela palavra por palavra (com máscara).
   * - 'letter': Divide o texto e revela caractere por caractere.
   */
  animation?: 'fade-up' | 'fade-down' | 'scale' | 'word' | 'letter';
  /** Duração total da animação em segundos (padrão: 0.8). */
  duration?: number;
  /** Atraso inicial antes da animação começar em segundos (padrão: 0). */
  delay?: number;
  /** Intervalo/atraso (stagger) entre a animação de cada palavra ou letra (em segundos). */
  stagger?: number;
  /** Se for `true` (padrão), a animação roda apenas uma vez quando o elemento entra na tela. Se `false`, reverte a animação ao sair do viewport. */
  once?: boolean;
  /** Classes CSS de estilização do elemento que irá hospedar o texto. */
  className?: string;
  /** A tag HTML que envelopa o conteúdo (padrão: 'div'). Ex: 'h2', 'p', 'span', etc. */
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function ScrollReveal({
  children,
  id,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  stagger,
  once = true,
  className = '',
  as: Component = 'div',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const triggerElement = containerRef.current;
    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {};
    let target: gsap.DOMTarget = containerRef.current;

    const toggleActions = once ? 'play none none none' : 'play reverse play reverse';

    if (animation === 'fade-up') {
      fromVars = { opacity: 0, y: 25 };
      toVars = { opacity: 1, y: 0, duration, delay, ease: 'power2.out' };
    } else if (animation === 'fade-down') {
      fromVars = { opacity: 0, y: -25 };
      toVars = { opacity: 1, y: 0, duration, delay, ease: 'power2.out' };
    } else if (animation === 'scale') {
      fromVars = { opacity: 0, scale: 0.96 };
      toVars = { opacity: 1, scale: 1, duration, delay, ease: 'power2.out' };
    } else if (animation === 'word') {
      target = containerRef.current.querySelectorAll('.reveal-word');
      fromVars = { opacity: 0, y: '100%' };
      toVars = { opacity: 1, y: '0%', duration, delay, stagger: stagger || 0.04, ease: 'power3.out' };
    } else if (animation === 'letter') {
      target = containerRef.current.querySelectorAll('.reveal-letter');
      fromVars = { opacity: 0, y: 12 };
      toVars = { opacity: 1, y: 0, duration: duration * 0.6, delay, stagger: stagger || 0.015, ease: 'power2.out' };
    }

    gsap.fromTo(target, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 88%',
        end: 'bottom 12%',
        toggleActions: toggleActions,
      },
    });
  }, { scope: containerRef, dependencies: [animation, duration, delay, stagger, once] });

  const renderContent = () => {
    if (typeof children !== 'string') {
      return children;
    }

    if (animation === 'word') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-middle">
          <span className="reveal-word inline-block">
            {word}
          </span>
          {i < children.split(' ').length - 1 && '\u00A0'}
        </span>
      ));
    }

    if (animation === 'letter') {
      return children.split('').map((char, i) => (
        <span key={i} className="reveal-letter inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    return children;
  };

  return (
    <Component id={id} ref={containerRef} className={className}>
      {renderContent()}
    </Component>
  );
}

// Subcomponentes auxiliares estáticos
/** Revela o conteúdo deslizando para cima com fade-in ao rolar a página. */
ScrollReveal.FadeUp = function ScrollRevealFadeUp(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="fade-up" />;
};

/** Revela o conteúdo deslizando para baixo com fade-in ao rolar a página. */
ScrollReveal.FadeDown = function ScrollRevealFadeDown(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="fade-down" />;
};

/** Revela o conteúdo aplicando um zoom suave com fade-in ao rolar a página. */
ScrollReveal.Scale = function ScrollRevealScale(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="scale" />;
};

/** Divide a string e revela o conteúdo palavra por palavra (com máscara) ao rolar a página. */
ScrollReveal.Word = function ScrollRevealWord(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="word" />;
};

/** Divide a string e revela o conteúdo caractere por caractere ao rolar a página. */
ScrollReveal.Letter = function ScrollRevealLetter(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="letter" />;
};
