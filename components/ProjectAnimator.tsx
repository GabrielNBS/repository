'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { animateFadeIn, animateSplitText } from '@/animations';

interface ProjectAnimatorProps {
  children: React.ReactNode;
}

export default function ProjectAnimator({ children }: ProjectAnimatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Animação de entrada inicial (Back link, meta e botões de ação)
    animateFadeIn('.back-link', {
      y: -15,
      duration: 0.7,
      ease: 'power2.out'
    });

    animateFadeIn('.project-meta', {
      y: 15,
      duration: 0.7,
      ease: 'power2.out'
    });

    // 2. Animação do título principal (Zen SplitText)
    const titleEl = containerRef.current.querySelector('.project-title');
    let splitInstance: { revert: () => void } | null = null;
    if (titleEl) {
      splitInstance = animateSplitText(titleEl, {
        stagger: 0.05,
        duration: 0.9,
        ease: 'power2.out'
      });
    }

    animateFadeIn('.project-desc', {
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });

    animateFadeIn('.project-actions', {
      y: 15,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 3. Animação de Scroll: Cover do Projeto (Crescimento sutil / Shoji)
    gsap.from('.project-cover', {
      opacity: 0,
      scale: 0.97,
      y: 40,
      duration: 1.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.project-cover',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    // 4. Animação de Scroll: Sidebar
    animateFadeIn('.project-sidebar', {
      y: 30,
      scrollTrigger: {
        trigger: '.project-sidebar',
        start: 'top 85%'
      }
    });

    // 5. Animação de Scroll: Blocos de Conteúdo (Problema e Solução)
    const blocks = Array.from(containerRef.current.querySelectorAll('.project-content-block'));
    blocks.forEach((block) => {
      animateFadeIn(block, {
        y: 30,
        scrollTrigger: {
          trigger: block,
          start: 'top 85%'
        }
      });
    });

    // 6. Animação de Scroll: Galeria (Stagger dos itens)
    const galleryItems = Array.from(containerRef.current.querySelectorAll('.gallery-item'));
    if (galleryItems.length > 0) {
      animateFadeIn(galleryItems, {
        y: 40,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 85%'
        }
      });
    }

    return () => {
      if (splitInstance) splitInstance.revert();
    };
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
