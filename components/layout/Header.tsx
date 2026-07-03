import React from 'react';
import TransitionLink from '@/components/ui/TransitionLink';

export default function Header() {
  return (
    <header className="w-site sticky top-0 z-30 mx-auto flex items-center justify-between py-4 backdrop-blur-[18px]">
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
        className="gap-nav-gap p-nav-pad max-sm:p-nav-pad-sm inline-flex items-center rounded-full border border-[rgb(222,219,212,0.82)] bg-[rgb(255,255,255,0.72)] shadow-[0_10px_30px_rgb(24,24,27,0.05)] max-md:grid max-md:w-full max-md:grid-cols-3 max-md:gap-1 max-sm:gap-0.5"
        aria-label="Navegacao principal"
      >
        <TransitionLink
          href="/#about"
          className="text-muted hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper px-nav-x py-nav-y text-nav font-nav max-sm:px-nav-x-sm max-sm:py-nav-y-sm max-sm:text-nav-mobile rounded-full transition-all duration-180 max-md:min-w-0 max-md:justify-center max-md:text-center"
        >
          Sobre
        </TransitionLink>
        <TransitionLink
          href="/#projects"
          className="text-muted hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper px-nav-x py-nav-y text-nav font-nav max-sm:px-nav-x-sm max-sm:py-nav-y-sm max-sm:text-nav-mobile rounded-full transition-all duration-180 max-md:min-w-0 max-md:justify-center max-md:text-center"
        >
          Projetos
        </TransitionLink>
        <TransitionLink
          href="/#contact"
          className="text-muted hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper px-nav-x py-nav-y text-nav font-nav max-sm:px-nav-x-sm max-sm:py-nav-y-sm max-sm:text-nav-mobile rounded-full transition-all duration-180 max-md:min-w-0 max-md:justify-center max-md:text-center"
        >
          Contato
        </TransitionLink>
      </nav>
    </header>
  );
}

