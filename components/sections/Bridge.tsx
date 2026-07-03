'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateFadeIn } from '@/animations';
import SectionLink from '@/components/ui/SectionLink';

export default function Bridge() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const links = Array.from(containerRef.current.children);

    animateFadeIn(links, {
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="border-line w-site mx-auto grid grid-cols-3 border-y max-md:grid-cols-1"
      aria-label="Navegacao rapida"
    >
      <SectionLink label="Sobre" href="#about" />
      <SectionLink label="Projetos" href="#projects" />
      <SectionLink label="Contato" href="#contact" />
    </section>
  );
}
