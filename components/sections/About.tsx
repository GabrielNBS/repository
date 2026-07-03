'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText, animateShojiCards } from '@/animations';

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

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Animação do Label "Sobre"
    animateFadeIn(".about-label", {
      y: 20,
      scrollTrigger: {
        trigger: ".about-label",
        start: "top 90%",
      }
    });

    // 2. Animação do Subtítulo (SplitText)
    let splitInstance: { revert: () => void } | null = null;
    if (subtitleRef.current) {
      splitInstance = animateSplitText(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
          scrub: true
        }
      });
    }

    // 3. Animação da Descrição Principal
    animateFadeIn(".about-desc", {
      scrollTrigger: {
        trigger: ".about-desc",
      }
    });

    // 4. Animação dos Cards de Serviços (Estética Shoji de correr lateralmente/abrir)
    const cards = Array.from(containerRef.current.querySelectorAll<HTMLElement>(".service-card"));
    animateShojiCards(cards, {
      trigger: ".services-container",
    });

    // 5. Animação das Categorias de Competências (com Stagger)
    animateFadeIn(".skill-category", {
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".skills-container",
      }
    });

    return () => {
      if (splitInstance) splitInstance.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-site gap-grid py-section mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] max-lg:grid-cols-2 max-md:grid-cols-1"
      aria-labelledby="about-title"
    >
      <div>
        <p className="about-label text-accent text-label font-label mb-4 tracking-widest uppercase">Sobre</p>
        <h2
          id="about-title"
          ref={subtitleRef}
          className="text-display font-heading max-w-[12ch] tracking-normal max-md:max-w-[11ch]"
        >
          Design limpo com base tecnica.
        </h2>
      </div>
      <div className="self-end">
        <p className="about-desc text-muted text-body">
          Sou desenvolvedor front-end focado em construir interfaces consistentes, acessiveis e
          prontas para evoluir. Meus projetos exploram e-commerce, dashboards, landing pages e
          experiencias com estado global.
        </p>
      </div>

      <div className="services-container col-span-full border border-line divide-x divide-line max-md:divide-x-0 max-md:divide-y grid grid-cols-3 max-md:grid-cols-1 mt-6">
        {services.map((service) => (
          <article
            className="service-card min-h-service-card p-card bg-[rgb(255,255,255,0.74)]"
            key={service.title}
          >
            <h3 className="mb-title-gap text-title font-title tracking-normal">
              {service.title}
            </h3>
            <p className="text-muted text-body">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="skills-container col-span-full border-t border-line pt-12 mt-10">
        <div className="grid grid-cols-4 gap-y-8 gap-x-4 max-sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category flex flex-col gap-4">
              <h3 className="text-note font-label text-muted tracking-widest uppercase">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {category.items.map((item) => (
                  <li key={item} className="text-ui text-ink font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
