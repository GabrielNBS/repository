'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  FiBookOpen,
  FiDownload,
  FiGrid,
  FiHome,
  FiMail,
  FiSliders,
  FiUser
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import styles from './PortfolioNav.module.css';

type SectionId = 'inicio' | 'manifesto' | 'projetos' | 'sobre' | 'skills' | 'contato';

type NavigationItem = {
  href: `/#${SectionId}`;
  icon: IconType;
  id: SectionId;
  label: string;
};

const navigationItems: NavigationItem[] = [
  { href: '/#inicio', icon: FiHome, id: 'inicio', label: 'Início' },
  { href: '/#manifesto', icon: FiBookOpen, id: 'manifesto', label: 'Manifesto' },
  { href: '/#projetos', icon: FiGrid, id: 'projetos', label: 'Projetos' },
  { href: '/#sobre', icon: FiUser, id: 'sobre', label: 'Sobre' },
  { href: '/#skills', icon: FiSliders, id: 'skills', label: 'Habilidades' },
  { href: '/#contato', icon: FiMail, id: 'contato', label: 'Contato' }
];

const resumeHref = '/curriculo.pdf';

export default function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const activeItem = navigationItems.find((item) => item.id === activeSection) ?? navigationItems[0];
  const ActiveIcon = activeItem.icon;
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => ({ ...item, element: document.getElementById(item.id) }))
      .filter((item): item is NavigationItem & { element: HTMLElement } => Boolean(item.element));

    if (!sections.length) return;

    let frameId = 0;
    const updateActiveSection = () => {
      frameId = 0;
      const viewportMarker = window.innerHeight * 0.46;
      const closestSection = sections.reduce((closest, section) => {
        const rect = section.element.getBoundingClientRect();
        const distance =
          rect.top <= viewportMarker && rect.bottom >= viewportMarker
            ? 0
            : Math.min(Math.abs(rect.top - viewportMarker), Math.abs(rect.bottom - viewportMarker));
        return distance < closest.distance ? { distance, id: section.id } : closest;
      }, { distance: Number.POSITIVE_INFINITY, id: sections[0].id });

      setActiveSection((current) => (current === closestSection.id ? current : closestSection.id));
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('hashchange', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('hashchange', requestUpdate);
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Escape' || !open) return;
    closeMenu();
    menuButton.current?.focus();
  }

  function handleNavigation(item: NavigationItem) {
    setActiveSection(item.id);
    closeMenu();
  }

  return (
    <nav
      className={styles.nav}
      aria-label="Navegação principal"
      data-active-section={activeSection}
      data-component="navigation"
      onKeyDown={handleKeyDown}
    >
      <Link
        className={styles.brand}
        href="/#inicio"
        onClick={closeMenu}
        aria-label="Gabriel do Nascimento — início"
      >
        <span aria-hidden="true">GN</span>
        <span className={styles.brandLabel}>Gabriel Nascimento</span>
        <span className={styles.mobileBrandLabel}>Portfólio / 26</span>
      </Link>

      <div
        key={activeItem.id}
        className={styles.chapterCue}
        aria-label={`Seção atual: ${activeItem.label}`}
        tabIndex={0}
      >
        <span className={styles.chapterIcon} aria-hidden="true">
          <ActiveIcon />
        </span>
        <span>{activeItem.label}</span>
      </div>

      <div id={menuId} className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            className={`${styles.link} ${activeSection === item.id ? styles.linkActive : ''}`}
            href={item.href}
            aria-current={activeSection === item.id ? 'page' : undefined}
            onClick={() => handleNavigation(item)}
          >
            {item.label}
          </Link>
        ))}
        <a className={`${styles.link} ${styles.mobileResume}`} href={resumeHref} download onClick={closeMenu}>
          Baixar currículo <FiDownload aria-hidden="true" />
        </a>
      </div>

      <a className={styles.desktopResume} href={resumeHref} download onClick={closeMenu}>
        <span>Baixar currículo</span>
        <FiDownload aria-hidden="true" />
      </a>

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
