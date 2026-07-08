'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText, animateShojiCards } from '@/animations';
import ServiceCard from '@/components/ui/About/ServiceCard';
import SkillCategory from '@/components/ui/About/SkillCategory';

const services = [
  {
    title: 'Interfaces precisas',
    description: 'Componentes limpos, responsivos e alinhados ao objetivo de cada produto.'
  },
  {
    title: 'Estado e fluxos',
    description: 'Experiencias com carrinho, formularios, dashboards e interacoes reais.'
  },
  {
    title: 'Entrega front-end',
    description: 'Implementacao com TypeScript, acessibilidade, performance e acabamento visual.'
  }
];

const skillCategories = [
  {
    title: 'Linguagens',
    items: ['TypeScript', 'JavaScript', 'HTML', 'CSS']
  },
  {
    title: 'Frameworks',
    items: ['React', 'Next.js', 'Remix', 'Astro']
  },
  {
    title: 'Estilo & UI',
    items: ['Tailwind CSS', 'Radix UI', 'ShadCN/UI', 'Framer Motion']
  },
  {
    title: 'Ferramentas',
    items: ['Vite', 'Vitest', 'Playwright', 'Storybook']
  }
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. Animação do Label "Sobre"
      animateFadeIn('.about-label', {
        y: 20,
        scrollTrigger: {
          trigger: '.about-label',
          start: 'top 90%'
        }
      });

      // 2. Animação do Subtítulo (SplitText)
      let splitInstance: { revert: () => void } | null = null;
      if (subtitleRef.current) {
        splitInstance = animateSplitText(subtitleRef.current, {
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            scrub: true
          }
        });
      }

      // 3. Animação da Descrição Principal
      animateFadeIn('.about-desc', {
        scrollTrigger: {
          trigger: '.about-desc'
        }
      });

      // 4. Animação dos Cards de Serviços (Estética Shoji de correr lateralmente/abrir)
      const cards = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.service-card'));
      animateShojiCards(cards, {
        trigger: '.services-container'
      });

      // 5. Animação das Categorias de Competências (com Stagger)
      animateFadeIn('.skill-category', {
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-container'
        }
      });

      return () => {
        if (splitInstance) splitInstance.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-site gap-grid py-section-tight mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] max-lg:grid-cols-2 max-md:grid-cols-1"
      aria-labelledby="about-title"
    >
      <div>
        <span className="about-label text-accent text-label font-label mb-4 tracking-widest uppercase">
          Sobre
        </span>
        <h2
          id="about-title"
          ref={subtitleRef}
          className="text-display font-heading max-w-[12ch] tracking-normal max-md:max-w-[11ch]"
        >
          Design <br />
          limpo com base tecnica.
        </h2>
      </div>
      <div className="self-end">
        <p className="about-desc text-muted text-body">
          Sou desenvolvedor front-end focado em construir interfaces consistentes, acessiveis e
          prontas para evoluir. Meus projetos exploram e-commerce, dashboards, landing pages e
          experiencias com estado global.
        </p>
      </div>

      <div className="services-container border-line divide-line col-span-full mt-6 grid grid-cols-3 divide-x border max-md:grid-cols-1 max-md:divide-x-0 max-md:divide-y">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>

      <div className="skills-container border-line col-span-full mt-8 border-t pt-8">
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 max-sm:grid-cols-2">
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} title={category.title} items={category.items} />
          ))}
        </div>
      </div>
    </section>
  );
}
