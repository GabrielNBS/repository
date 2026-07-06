'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateFadeIn, animateSplitText } from '@/animations';
import { MailIcon, PinIcon } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';

const socials = [
  { label: 'GitHub', href: 'https://github.com/GabrielNBS' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Portfolio', href: '#projects' }
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
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
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-line w-site gap-grid py-section mx-auto grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] border-t max-lg:grid-cols-2 max-md:grid-cols-1"
      aria-labelledby="contact-title"
    >
      <div className="contact-info flex flex-col gap-6 justify-between pr-4">
        <div>
          <p className="contact-label text-accent text-label font-label mb-4 tracking-[0.1em] uppercase">
            Contato
          </p>
          <h2
            id="contact-title"
            className="text-display font-heading tracking-normal max-w-[15ch] max-md:max-w-[11ch] leading-[1.05]"
          >
            Disponível para projetos e colaborações.
          </h2>
          <p className="text-muted text-body mt-4 max-w-[28rem]">
            Conte sobre a sua ideia e vamos construir algo claro e bem acabado.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <a
            href="mailto:hello@gabrielnbs.dev"
            className="text-body text-ink font-bold flex items-center gap-2 hover:text-accent transition-colors"
          >
            <MailIcon />
            hello@gabrielnbs.dev
          </a>
          <div className="text-body text-muted flex items-center gap-2">
            <PinIcon />
            São Paulo, Brasil — Remoto
          </div>
        </div>

        <div className="mt-4">
          <span className="text-note font-label text-muted tracking-widest uppercase mb-3 block">
            Redes
          </span>
          <div className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                className="border border-line rounded-full text-muted px-tag-x py-tag-y text-tag font-bold inline-flex items-center hover:text-ink hover:border-ink transition-colors"
              >
                {social.label} {social.href.startsWith('http') ? '↗' : ''}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-line mt-6 pt-6 flex items-center gap-3">
          <span className="w-5 h-5 rounded-full border border-muted flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          </span>
          <span className="text-ui text-muted font-medium">Resposta em até 48 horas.</span>
        </div>
      </div>

      <div className="contact-form-container border-line pl-contact-indent border-l max-md:border-t max-md:border-l-0 max-md:pt-8 max-md:pl-0 flex flex-col justify-center">
        <div className="border border-line bg-paper rounded-md p-card shadow-soft">
          <form className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="text-note font-label text-ink mb-2 block uppercase tracking-wider">
                Nome
              </label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                className="w-full bg-canvas border border-line rounded-sm px-4 py-3 text-ui text-ink placeholder-muted focus-visible:outline-accent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-note font-label text-ink mb-2 block uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="voce@empresa.com"
                className="w-full bg-canvas border border-line rounded-sm px-4 py-3 text-ui text-ink placeholder-muted focus-visible:outline-accent"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-note font-label text-ink mb-2 block uppercase tracking-wider">
                Mensagem
              </label>
              <textarea
                id="message"
                placeholder="Conte sobre o projeto"
                rows={4}
                className="w-full bg-canvas border border-line rounded-sm px-4 py-3 text-ui text-ink placeholder-muted resize-none focus-visible:outline-accent"
                required
              />
            </div>
            <Button
              type="submit"
              variant="filled"
              intent="primary"
              className="w-fit self-start mt-2"
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
