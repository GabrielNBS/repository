'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './PortfolioNav.module.css';

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setOpen(false);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Escape' || !open) return;
    closeMenu();
    menuButton.current?.focus();
  }

  return (
    <nav
      className={styles.nav}
      aria-label="Navegação principal"
      onKeyDown={handleKeyDown}
      data-component="navigation"
    >
      <Link
        className={styles.brand}
        href="/"
        onClick={closeMenu}
      >
        Portfólio / 26
      </Link>
      <div
        id={menuId}
        className={`${styles.links} ${open ? styles.linksOpen : ''}`}
      >
        <Link
          className={styles.link}
          href="/#projetos"
          onClick={closeMenu}
        >
          Projetos
        </Link>
        <Link
          className={styles.link}
          href="/#sobre"
          onClick={closeMenu}
        >
          Sobre
        </Link>
        <Link
          className={`${styles.link} ${styles.linkPrimary}`}
          href="/#contato"
          onClick={closeMenu}
        >
          Acesse o curriculo
        </Link>
      </div>
      <button
        ref={menuButton}
        className={styles.menuButton}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? '×' : '＋'}
      </button>
    </nav>
  );
}
