'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

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
      className="data-[scrolled=true]:border-ink/15 data-[scrolled=true]:bg-paper/80 fixed top-4 left-1/2 z-11 flex w-[calc(100%-2rem)] max-w-328 -translate-x-1/2 items-center justify-between rounded-full border border-transparent py-2 pr-2 pl-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[scrolled=true]:max-w-126 data-[scrolled=true]:shadow-[0_1rem_3rem_rgb(37_34_31/0.08)] data-[scrolled=true]:backdrop-blur-[18px] max-[800px]:w-[calc(100%-1.5rem)] max-[800px]:data-[scrolled=true]:max-w-[calc(100%-1.5rem)]"
      aria-label="Navegação principal"
      onKeyDown={handleKeyDown}
      data-nav
    >
      <Link
        className="before:bg-peach text-meta inline-flex min-h-11 items-center gap-2 font-extrabold tracking-tight uppercase before:size-2.5 before:rounded-full before:content-['']"
        href="/"
        onClick={closeMenu}
      >
        GN / 26
      </Link>
      <div
        id={menuId}
        className={`nav-links max-[800px]:border-ink/15 max-[800px]:bg-paper flex items-center gap-1 max-[800px]:absolute max-[800px]:top-[calc(100%+0.5rem)] max-[800px]:right-0 max-[800px]:left-0 max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:rounded-[1.3rem] max-[800px]:border max-[800px]:p-2 max-[800px]:shadow-[0_1rem_2rem_rgb(37_34_31_/_0.1)] ${open ? 'max-[800px]:flex' : 'max-[800px]:hidden'}`}
      >
        <Link
          className="hover:bg-ink/7 focus-visible:bg-ink/7 text-nav inline-flex min-h-11 items-center rounded-full px-3.5 py-2.5 font-bold tracking-[0.04em] uppercase transition duration-200 focus-visible:outline-none max-[800px]:min-h-[2.9rem] max-[800px]:px-3.5"
          href="/#projetos"
          onClick={closeMenu}
        >
          Projetos
        </Link>
        <Link
          className="hover:bg-ink/7 focus-visible:bg-ink/7 text-nav inline-flex min-h-11 items-center rounded-full px-3.5 py-2.5 font-bold tracking-[0.04em] uppercase transition duration-200 focus-visible:outline-none max-[800px]:min-h-[2.9rem] max-[800px]:px-3.5"
          href="/#sobre"
          onClick={closeMenu}
        >
          Sobre
        </Link>
        <Link
          className="bg-ink text-paper hover:bg-peach hover:text-ink focus-visible:bg-peach focus-visible:text-ink text-nav inline-flex min-h-11 items-center rounded-full px-3.5 py-2.5 font-bold tracking-[0.04em] uppercase transition duration-200 focus-visible:outline-none max-[800px]:min-h-[2.9rem] max-[800px]:px-3.5"
          href="/#contato"
          onClick={closeMenu}
        >
          Vamos conversar
        </Link>
      </div>
      <button
        ref={menuButton}
        className="nav-menu bg-ink text-paper text-menu-icon hidden size-11 items-center justify-center rounded-full border-0 leading-none max-[800px]:inline-flex"
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
