'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText } from '@/animations';
import KoiBackground from '@/components/ui/Contact/KoiBackground';
import ContactDetails from '@/components/ui/Contact/ContactDetails';
import ContactForm from '@/components/ui/Contact/ContactForm';

const socials = [
  { label: 'GitHub', href: 'https://github.com/GabrielNBS' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Portfolio', href: '#projects' }
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Animação do Rótulo/Label
      animateFadeIn('.contact-label', {
        y: 20,
        scrollTrigger: {
          trigger: '.contact-label',
          start: 'top 90%'
        }
      });

      // 2. Animação do Título (SplitText)
      const titleEl = sectionRef.current.querySelector('#contact-title');
      let splitInstance: { revert: () => void } | null = null;
      if (titleEl) {
        splitInstance = animateSplitText(titleEl, {
          scrollTrigger: {
            trigger: titleEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            scrub: true
          }
        });
      }

      // 3. Animação das Colunas - Equilíbrio/Yin-Yang
      animateFadeIn('.contact-info', {
        x: -45,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 85%'
        }
      });

      animateFadeIn('.contact-form-container', {
        x: 45,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: 'top 85%'
        }
      });

      return () => {
        if (splitInstance) splitInstance.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-line w-site gap-grid py-section relative mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] overflow-hidden border-t max-lg:grid-cols-2 max-md:grid-cols-1"
      aria-labelledby="contact-title"
    >
      {/* Vídeo de Fundo Watercolor Koi Fish e gradientes */}
      <KoiBackground />

      {/* Detalhes de Contato e Redes Sociais */}
      <ContactDetails socials={socials} />

      {/* Formulário de Contato */}
      <ContactForm />
    </section>
  );
}
