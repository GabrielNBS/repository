import React from 'react';
import SectionLink from '@/components/ui/SectionLink';

export default function Bridge() {
  return (
    <section
      className="border-line w-site mx-auto grid grid-cols-3 border-y max-md:grid-cols-1"
      aria-label="Navegacao rapida"
    >
      <SectionLink label="Sobre" href="#about" />
      <SectionLink label="Projetos" href="#projects" />
      <SectionLink label="Contato" href="#contact" />
    </section>
  );
}
