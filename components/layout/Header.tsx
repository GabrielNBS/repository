'use client';

import React, { useState, useEffect } from 'react';
import TransitionLink from '@/components/ui/TransitionLink';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({
    opacity: 0,
    left: 0,
    width: 0,
    height: 0,
    top: 0
  });
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    setHoverStyle({
      opacity: 1,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
      top: el.offsetTop
    });

    if (!isNavHovered) {
      setIsNavHovered(true);
      setTransitionEnabled(false);
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 20);
    }
  };

  const handleMouseLeave = () => {
    setHoverStyle((prev) => ({
      ...prev,
      opacity: 0
    }));
    setIsNavHovered(false);
    setTransitionEnabled(false);
  };

  return (
    <header
      className={`w-site sticky top-0 z-30 mx-auto flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? 'top-4 rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm'
          : 'py-4 backdrop-blur-sm'
      }`}
    >
      <TransitionLink
        href="/#top"
        className="gap-brand-gap text-ui inline-flex items-center font-bold tracking-normal"
        aria-label="Voltar ao topo"
      >
        <span
          className="border-accent h-5 w-5 rounded-full border-2 border-l-transparent"
          aria-hidden="true"
        />
        <span>Gabriel NBS</span>
      </TransitionLink>
      <nav
        className="gap-nav-gap p-nav-pad max-sm:p-nav-pad-sm relative inline-flex items-center rounded-full border border-[rgb(222,219,212,0.82)] bg-[rgb(255,255,255,0.72)] shadow-[0_10px_30px_rgb(24,24,27,0.05)] max-md:grid max-md:w-full max-md:grid-cols-3 max-md:gap-1 max-sm:gap-0.5"
        aria-label="Navegacao principal"
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="bg-ink pointer-events-none absolute rounded-full"
          style={{
            ...hoverStyle,
            transition: transitionEnabled
              ? 'left 240ms cubic-bezier(0.25, 1, 0.5, 1), width 240ms cubic-bezier(0.25, 1, 0.5, 1), opacity 240ms cubic-bezier(0.25, 1, 0.5, 1), height 240ms cubic-bezier(0.25, 1, 0.5, 1), top 240ms cubic-bezier(0.25, 1, 0.5, 1)'
              : 'opacity 240ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />
        <TransitionLink
          href="/#about"
          onMouseEnter={handleMouseEnter}
          className="text-muted hover:text-paper focus-visible:text-paper px-nav-x py-nav-y text-nav font-nav max-sm:px-nav-x-sm max-sm:py-nav-y-sm max-sm:text-nav-mobile relative z-10 rounded-full transition-colors duration-180 max-md:min-w-0 max-md:justify-center max-md:text-center"
        >
          Sobre
        </TransitionLink>
        <TransitionLink
          href="/#projects"
          onMouseEnter={handleMouseEnter}
          className="text-muted hover:text-paper focus-visible:text-paper px-nav-x py-nav-y text-nav font-nav max-sm:px-nav-x-sm max-sm:py-nav-y-sm max-sm:text-nav-mobile relative z-10 rounded-full transition-colors duration-180 max-md:min-w-0 max-md:justify-center max-md:text-center"
        >
          Projetos
        </TransitionLink>

        <TransitionLink
          href="/#contact"
          onMouseEnter={handleMouseEnter}
          className="text-muted hover:text-paper focus-visible:text-paper px-nav-x py-nav-y text-nav font-nav max-sm:px-nav-x-sm max-sm:py-nav-y-sm max-sm:text-nav-mobile relative z-10 rounded-full transition-colors duration-180 max-md:min-w-0 max-md:justify-center max-md:text-center"
        >
          Contato
        </TransitionLink>
      </nav>
    </header>
  );
}
