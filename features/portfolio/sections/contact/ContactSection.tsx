'use client';

import SwipeToast from '@/features/portfolio/shared/SwipeToast';
import { createPortal } from 'react-dom';

import AppIcon from '@/features/portfolio/shared/AppIcon';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import styles from './ContactSection.module.css';
import { useEmailPlaceholder } from './useEmailPlaceholder';

const resumeHref = '/documents/Gabriel_Nascimento_Desenvolvedor_Frontend.pdf';

export default function ContactSection() {
  const [emailDraftOpened, setEmailDraftOpened] = useState(false);
  const [toastId, setToastId] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const emailInput = useRef<HTMLInputElement>(null);
  useEmailPlaceholder(emailInput);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const input = emailInput.current;
    if (!input) return;
    // Validate again before constructing the URL, including programmatic submissions.
    input.value = email;
    if (
      !email ||
      email.length > 254 ||
      /[\u0000-\u0020\u007f]/.test(email) ||
      !input.checkValidity()
    ) {
      setEmailDraftOpened(false);
      setEmailError('Digite um endereÃ§o de e-mail vÃ¡lido.');
      input.focus();
      return;
    }
    setEmailError('');
    const query = new URLSearchParams({
      subject: 'Contato pelo portfÃ³lio',
      body: `OlÃ¡, Gabriel!\n\nQuero conversar sobre um projeto.\n\nMeu e-mail: ${email}`
    });

    setEmailDraftOpened(true);
    setToastId(id => id + 1);
    setToastOpen(true);
    window.location.href = `mailto:gabrielnbs.dev@gmail.com?${query.toString()}`;
  }

  return (
    <>
    {toastOpen && createPortal(
      <SwipeToast
        key={toastId}
        title="Tudo pronto para enviar"
        description="Revise o rascunho e envie no seu aplicativo de e-mail."
        icon={<AppIcon name="email" />}
        duration={6000}
        closeButton
        onClose={() => setToastOpen(false)}
      />,
      document.body
    )}
    <section id="contato" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.artwork} aria-hidden="true">
        <Image
          src="/images/contact/contact-binocular-family-v3.png"
          alt=""
          className={styles.artworkImage}
          data-back-to-top-trigger
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
            <label className={styles.inputLabel} htmlFor="contact-email">Seu e-mail</label>
            <div className={styles.inputRow}>
              <input
                ref={emailInput}
                id="contact-email"
                className={styles.input}
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                required
                aria-describedby={`${emailError ? 'contact-email-error ' : ''}contact-status`}
                aria-invalid={emailError ? true : undefined}
                onBlur={(event) => {
                  if (event.currentTarget.value && !event.currentTarget.validity.valid) {
                    setEmailError('Digite um endereÃ§o de e-mail vÃ¡lido.');
                  }
                }}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) setEmailError('');
                }}
                onInvalid={(event) => {
                  event.preventDefault();
                  setEmailError('Digite um endereÃ§o de e-mail vÃ¡lido.');
                  event.currentTarget.focus();
                }}
              />
              <button
                className={styles.submit}
                type="submit"
                aria-label="Abrir aplicativo de e-mail"
              >
                <AppIcon name="arrowUpRight" />
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
                : 'Pode chegar com uma ideia inteira ou sÃ³ a ponta do fio.'}
            </p>
          </form>

          <nav className={styles.contactLinks} aria-label="Redes sociais e currÃ­culo">
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/gabrielnascimento-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <AppIcon name="linkedin" />
            </a>
            <a
              className={styles.contactLink}
              href="https://github.com/GabrielNBS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <AppIcon name="github" />
            </a>
            <a
              className={styles.contactLink}
              href={resumeHref}
              download="Gabriel_Nascimento_Desenvolvedor_Frontend.pdf"
              aria-label="Baixar currÃ­culo em PDF"
            >
              <span>CurrÃ­culo</span>
              <AppIcon name="download" />
            </a>
          </nav>
        </div>
      </div>
    </section>
    </>
  );
}
