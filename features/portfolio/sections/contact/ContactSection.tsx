'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import styles from './ContactSection.module.css';

const resumeHref = '/documents/Gabriel_Nascimento_Desenvolvedor_Frontend.pdf';

export default function ContactSection() {
  const [emailDraftOpened, setEmailDraftOpened] = useState(false);
  const [emailError, setEmailError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const query = new URLSearchParams({
      subject: 'Contato pelo portfólio',
      body: `Olá, Gabriel!\n\nQuero conversar sobre um projeto.\n\nMeu e-mail: ${email}`
    });

    setEmailDraftOpened(true);
    window.location.href = `mailto:gabrielnbs.dev@gmail.com?${query.toString()}`;
  }

  return (
    <section id="contato" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.artwork} aria-hidden="true">
        <Image
          src="/images/contact/contact-binocular-family-v3.png"
          alt=""
          className={styles.artworkImage}
          fill
          loading="lazy"
          sizes="(max-width: 800px) 110vw, (max-width: 1024px) 60vw, 56vw"
        />
      </div>
      <div className={styles.content} data-motion="blur-reveal">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>05 / Contato</p>
          <HeadingSplit
            as="h2"
            id="contact-title"
            className={styles.title}
            data-motion="text-split"
          >
            Vamos fazer algo vivo?
          </HeadingSplit>
        </div>
        <div className={styles.interaction}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="contact-email">
              Seu e-mail (obrigatório)
            </label>
            <div className={styles.inputRow}>
              <input
                id="contact-email"
                className={styles.input}
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                inputMode="email"
                required
                aria-describedby={`${emailError ? 'contact-email-error ' : ''}contact-status`}
                aria-invalid={emailError ? true : undefined}
                onBlur={(event) => {
                  if (event.currentTarget.value && !event.currentTarget.validity.valid) {
                    setEmailError('Digite um endereço de e-mail válido.');
                  }
                }}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) setEmailError('');
                }}
                onInvalid={(event) => {
                  event.preventDefault();
                  setEmailError('Digite um endereço de e-mail válido.');
                }}
              />
              <button
                className={styles.submit}
                type="submit"
                aria-label="Abrir aplicativo de e-mail"
              >
                <FiArrowUpRight aria-hidden="true" />
              </button>
            </div>
            {emailError ? (
              <p id="contact-email-error" className={styles.error} role="alert">
                {emailError}
              </p>
            ) : null}
            <p id="contact-status" className={styles.status} aria-live="polite">
              {emailDraftOpened
                ? 'Rascunho aberto no seu aplicativo de e-mail. Revise e envie quando quiser.'
                : 'Abre seu aplicativo de e-mail. Nada é enviado automaticamente.'}
            </p>
          </form>

          <nav className={styles.contactLinks} aria-label="Redes sociais e currículo">
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/gabrielnascimento-dev/"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <FiLinkedin aria-hidden="true" />
            </a>
            <a
              className={styles.contactLink}
              href="https://github.com/GabrielNBS"
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <FiGithub aria-hidden="true" />
            </a>
            <a
              className={styles.contactLink}
              href={resumeHref}
              download="Gabriel_Nascimento_Desenvolvedor_Frontend.pdf"
              aria-label="Baixar currículo em PDF"
            >
              <span>Currículo</span>
              <FiDownload aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
