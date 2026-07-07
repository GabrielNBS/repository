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
      {/* Vídeo de Fundo (Koi Fish) integrado ao canvas */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.22] mix-blend-multiply transition-opacity duration-500"
      >
        <source src="/video/Stop_motion_watercolor_koi_fish.webm" type="video/webm" />
        <source src="/video/Stop_motion_watercolor_koi_fish.mp4" type="video/mp4" />
      </video>

      {/* Overlays de gradiente para suavizar e integrar o vídeo com as bordas do projeto */}
      <div className="from-canvas via-transparent to-canvas pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r" />
      <div className="from-canvas via-transparent to-canvas pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b" />

      <div className="contact-info flex flex-col justify-between gap-6 pr-4">
        <div>
          <span className="contact-label text-accent text-label font-label mb-4 tracking-[0.1em] uppercase">
            Contato
          </span>
          <h2
            id="contact-title"
            className="text-display font-heading max-w-[15ch] leading-[1.05] tracking-normal max-md:max-w-[11ch]"
          >
            Disponível para projetos e colaborações.
          </h2>
          <p className="text-muted text-body mt-4 max-w-[28rem]">
            Conte sobre a sua ideia e vamos construir algo claro e bem acabado.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <a
            href="mailto:hello@gabrielnbs.dev"
            className="text-body text-ink hover:text-accent flex items-center gap-2 font-bold transition-colors"
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
          <span className="text-note font-label text-muted mb-3 block tracking-widest uppercase">
            Redes
          </span>
          <div className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                className="border-line text-muted px-tag-x py-tag-y text-tag hover:text-ink hover:border-ink inline-flex items-center rounded-full border font-bold transition-colors"
              >
                {social.label} {social.href.startsWith('http') ? '↗' : ''}
              </a>
            ))}
          </div>
        </div>

        <div className="border-line mt-6 flex items-center gap-3 border-t pt-6">
          <span
            className="border-muted flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
          </span>
          <span className="text-ui text-muted font-medium">Resposta em até 48 horas.</span>
        </div>
      </div>

      <div className="contact-form-container border-line pl-contact-indent flex flex-col justify-center border-l max-md:border-t max-md:border-l-0 max-md:pt-8 max-md:pl-0">
        <div className="border-line bg-paper p-card shadow-soft rounded-md border">
          <form className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="text-note font-label text-ink mb-2 block tracking-wider uppercase"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                className="bg-canvas border-line text-ui text-ink placeholder-muted focus-visible:outline-accent w-full rounded-sm border px-4 py-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-note font-label text-ink mb-2 block tracking-wider uppercase"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="voce@empresa.com"
                className="bg-canvas border-line text-ui text-ink placeholder-muted focus-visible:outline-accent w-full rounded-sm border px-4 py-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-note font-label text-ink mb-2 block tracking-wider uppercase"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                placeholder="Conte sobre o projeto"
                rows={4}
                className="bg-canvas border-line text-ui text-ink placeholder-muted focus-visible:outline-accent w-full resize-none rounded-sm border px-4 py-3"
                required
              />
            </div>
            <Button
              type="submit"
              variant="filled"
              intent="primary"
              className="mt-2 w-fit self-start"
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
