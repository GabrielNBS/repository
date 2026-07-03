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
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'scale' | 'word' | 'letter';
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  stagger,
  once = true,
  className = '',
  as: Component = 'div',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

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
    <Component ref={containerRef} className={className}>
      {renderContent()}
    </Component>
  );
}

// Subcomponentes auxiliares estáticos
ScrollReveal.FadeUp = function ScrollRevealFadeUp(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="fade-up" />;
};

ScrollReveal.FadeDown = function ScrollRevealFadeDown(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="fade-down" />;
};

ScrollReveal.Scale = function ScrollRevealScale(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="scale" />;
};

ScrollReveal.Word = function ScrollRevealWord(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="word" />;
};

ScrollReveal.Letter = function ScrollRevealLetter(props: Omit<ScrollRevealProps, 'animation'>) {
  return <ScrollReveal {...props} animation="letter" />;
};
