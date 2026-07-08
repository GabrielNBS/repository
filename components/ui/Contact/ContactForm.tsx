'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactForm() {
  return (
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
  );
}
