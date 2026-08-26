'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contato"
      className="bg-paper relative z-10 scroll-mt-24 px-[clamp(1.25rem,3vw,3.75rem)] py-32 pt-48 pb-20 max-[800px]:pt-28 max-[480px]:py-22"
      aria-labelledby="contact-title"
    >
      <div
        className="border-ink/15 grid grid-cols-[0.75fr_1.25fr] gap-8 border-t pt-5 max-[800px]:grid-cols-1"
        data-blur-reveal
      >
        <div>
          <p className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
            05 / Contato
          </p>
          <h2
            id="contact-title"
            className="text-display-xl m-0 max-w-[8ch] leading-[0.84] font-normal -tracking-widest"
            data-split="lines"
          >
            Vamos fazer algo vivo?
          </h2>
        </div>
        <form className="self-end" onSubmit={handleSubmit}>
          <label
            className="text-muted text-label mb-3 block font-bold tracking-widest uppercase"
            htmlFor="contact-email"
          >
            Deixe seu melhor e-mail
          </label>
          <div className="border-ink flex items-center border-b max-[480px]:gap-2">
            <input
              id="contact-email"
              className="placeholder:text-ink/35 text-contact-input min-w-0 flex-1 border-0 bg-transparent py-3 tracking-[-0.07em] outline-none"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              aria-describedby="contact-status"
            />
            <button
              className="bg-peach hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper text-action-icon grid size-12 shrink-0 place-items-center rounded-full border-0 transition duration-200 hover:rotate-45 focus-visible:rotate-45 focus-visible:outline-none"
              type="submit"
              aria-label="Enviar e-mail"
            >
              ↗
            </button>
          </div>
          <p id="contact-status" className="text-muted text-meta m-0 mt-3" aria-live="polite">
            {sent
              ? 'Recebido. Em breve a gente conversa.'
              : 'Sem newsletter. Só uma conversa quando fizer sentido.'}
          </p>
        </form>
      </div>
    </section>
  );
}
