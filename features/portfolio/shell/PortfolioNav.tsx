'use client';

import AppIcon from '@/features/portfolio/shared/AppIcon';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { AppIconName } from '@/features/portfolio/shared/AppIcon';
import styles from './PortfolioNav.module.css';

gsap.registerPlugin(useGSAP);

type SectionId = 'inicio' | 'manifesto' | 'projetos' | 'sobre' | 'skills' | 'contato';

type NavigationItem = {
  href: `/#${SectionId}`;
  icon: AppIconName;
  id: SectionId;
  label: string;
};

const navigationItems: NavigationItem[] = [
  { href: '/#inicio', icon: 'home', id: 'inicio', label: 'Início' },
  { href: '/#manifesto', icon: 'book', id: 'manifesto', label: 'Manifesto' },
  { href: '/#projetos', icon: 'projects', id: 'projetos', label: 'Projetos' },
  { href: '/#sobre', icon: 'user', id: 'sobre', label: 'Sobre' },
  { href: '/#skills', icon: 'skills', id: 'skills', label: 'Habilidades' },
  { href: '/#contato', icon: 'email', id: 'contato', label: 'Contato' }
];

export default function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const nav = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const compactWidthBeforeChange = useRef<number | null>(null);

  const activeItem =
    navigationItems.find((item) => item.id === activeSection) ?? navigationItems[0];

  const closeMenu = () => setOpen(false);

  useGSAP(
    () => {
      const triggerElement = triggerRef.current;
      const previousWidth = compactWidthBeforeChange.current;
      compactWidthBeforeChange.current = null;

      if (!triggerElement || previousWidth === null) return;

      gsap.set(triggerElement, { width: 'fit-content' });
      const nextWidth = triggerElement.getBoundingClientRect().width;

      if (Math.abs(nextWidth - previousWidth) < 1) {
        gsap.set(triggerElement, { clearProps: 'width' });
        return;
      }

      gsap.set(triggerElement, { width: previousWidth });
      gsap.to(triggerElement, {
        width: nextWidth,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
        onComplete: () => gsap.set(triggerElement, { clearProps: 'width' })
      });
    },
    { dependencies: [activeSection], scope: nav, revertOnUpdate: true }
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nav.current && !nav.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => ({ ...item, element: document.getElementById(item.id) }))
      .filter((item): item is NavigationItem & { element: HTMLElement } => Boolean(item.element));

    if (!sections.length) return;

    let frameId = 0;
    const updateActiveSection = () => {
      frameId = 0;
      const viewportMarker = window.innerHeight * 0.46;
      const closestSection = sections.reduce(
        (closest, section) => {
          const rect = section.element.getBoundingClientRect();
          const distance =
            rect.top <= viewportMarker && rect.bottom >= viewportMarker
              ? 0
              : Math.min(
                  Math.abs(rect.top - viewportMarker),
                  Math.abs(rect.bottom - viewportMarker)
                );
          return distance < closest.distance ? { distance, id: section.id } : closest;
        },
        { distance: Number.POSITIVE_INFINITY, id: sections[0].id }
      );

      setActiveSection((current) => {
        if (current === closestSection.id) return current;

        const triggerElement = triggerRef.current;
        const canAnimate =
          triggerElement &&
          window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
          !open;

        if (canAnimate) {
          gsap.killTweensOf(triggerElement);
          compactWidthBeforeChange.current = triggerElement.getBoundingClientRect().width;
          triggerElement.style.width = `${compactWidthBeforeChange.current}px`;
        }

        return closestSection.id;
      });
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
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && open) {
      closeMenu();
      triggerRef.current?.focus();
    }
  }

  function handleNavigation(item: NavigationItem) {
    setActiveSection(item.id);
    closeMenu();
  }

  return (
    <nav
      ref={nav}
      className={styles.nav}
      aria-label="Navegação principal"
      data-active-section={activeSection}
      data-component="navigation"
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMenu();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Seção atual: ${activeItem.label}. ${open ? 'Fechar' : 'Abrir'} navegação de seções.`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.chapterIcon} aria-hidden="true">
          <AppIcon name={activeItem.icon} size="compact" />
        </span>
        <span key={activeItem.id} className={styles.chapterLabel}>
          {activeItem.label}
        </span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} aria-hidden="true">
          <AppIcon name="caretDown" />
        </span>
      </button>

      <div
        id={menuId}
        inert={!open}
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}
      >
        {navigationItems.map((item) => {
          const isCurrent = activeSection === item.id;

          return (
            <Link
              key={item.id}
              className={`${styles.dropdownItem} ${isCurrent ? styles.dropdownItemActive : ''}`}
              href={item.href}
              aria-current={isCurrent ? 'location' : undefined}
              onClick={() => {
                handleNavigation(item);
                const section = document.getElementById(item.id);
                if (section) {
                  section.tabIndex = -1;
                  section.focus({ preventScroll: true });
                }
              }}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                <AppIcon name={item.icon} size="compact" />
              </span>
              <span className={styles.itemLabel}>{item.label}</span>
              {isCurrent && <span className={styles.activeDot} aria-hidden="true" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
