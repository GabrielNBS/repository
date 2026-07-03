import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

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
  return (
    <section
      id="about"
      className="w-site gap-grid py-section mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] max-lg:grid-cols-2 max-md:grid-cols-1"
      aria-labelledby="about-title"
    >
      <div>
        <p className="text-accent text-label font-label mb-4 tracking-widest uppercase">Sobre</p>
        <ScrollReveal
          id="about-title"
          className="text-display font-heading max-w-[12ch] tracking-normal max-md:max-w-[11ch]"
          animation='word'
          as='h2'
        >
          Design limpo com base tecnica.
        </ScrollReveal>
      </div>
      <div className="self-end">
        <p className="text-muted text-body">
          Sou desenvolvedor front-end focado em construir interfaces consistentes, acessiveis e
          prontas para evoluir. Meus projetos exploram e-commerce, dashboards, landing pages e
          experiencias com estado global.
        </p>
      </div>

      <div className="col-span-full bg-line border-line gap-hairline grid grid-cols-3 border max-md:grid-cols-1 mt-6">
        {services.map((service) => (
          <article
            className="min-h-service-card p-card bg-[rgb(255,255,255,0.74)]"
            key={service.title}
          >
            <h3 className="mb-title-gap text-title font-title tracking-normal">
              {service.title}
            </h3>
            <p className="text-muted text-body">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="col-span-full border-t border-line pt-12 mt-10">
        <div className="grid grid-cols-4 gap-y-8 gap-x-4 max-sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-4">
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
