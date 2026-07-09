'use client';

import React from 'react';
import { MailIcon, PinIcon } from '@/components/ui/icons';

interface Social {
  label: string;
  href: string;
}

interface ContactDetailsProps {
  socials: Social[];
}

export default function ContactDetails({ socials }: ContactDetailsProps) {
  return (
    <div className="contact-info flex flex-col justify-between gap-6 pr-4">
      <div>
        <span className="contact-label text-accent text-label font-label mb-4 tracking-[0.1em] uppercase block">
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
          className="text-body text-ink hover:text-accent flex items-center gap-2 font-bold transition-colors w-fit"
        >
          <MailIcon />
          hello@gabrielnbs.dev
        </a>
        <div className="text-body text-muted flex items-center gap-2 select-none">
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
  );
}
