'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div
        className={styles.content}
        data-motion="blur-reveal"
      >
        <div>
          <p className={styles.eyebrow}>
            05 / Contato
          </p>
          <HeadingSplit
            as="h2"
            id="contact-title"
            className={styles.title}
            data-motion="text-split"
          >
            Vamos fazer algo vivo?
          </HeadingSplit>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label
            className={styles.label}
            htmlFor="contact-email"
          >
            Deixe seu melhor e-mail
          </label>
          <div className={styles.inputRow}>
            <input
              id="contact-email"
              className={styles.input}
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              aria-describedby="contact-status"
            />
            <button
              className={styles.submit}
              type="submit"
              aria-label="Enviar e-mail"
            >
              ↗
            </button>
          </div>
          <p id="contact-status" className={styles.status} aria-live="polite">
            {sent
              ? 'Recebido. Em breve a gente conversa.'
              : 'Sem newsletter. Só uma conversa quando fizer sentido.'}
          </p>
        </form>
      </div>
    </section>
  );
}
