'use client';

import React, { useState, useEffect, useRef } from 'react';
import TransitionLink from '@/components/ui/TransitionLink';

interface NavCardProps {
  href: string;
  kanji: string;
  jpTitle: string;
  title: string;
  desc: string;
  delayClass: string;
  isOpen: boolean;
}

function NavCard({ href, kanji, jpTitle, title, desc, delayClass, isOpen }: NavCardProps) {
  return (
    <TransitionLink
      href={href}
      className={`group relative border border-line bg-canvas/30 rounded-md p-4 overflow-hidden block transition-all duration-300 hover:border-accent hover:bg-canvas/80 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${delayClass} transition-all duration-500 ease-out`}
    >
      {/* Kanji de Fundo / Marca d'água */}
      <span className="absolute -right-2 -bottom-6 text-7xl font-serif font-bold text-line/20 select-none pointer-events-none group-hover:text-accent/10 transition-colors duration-300">
        {kanji}
      </span>
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <span className="text-[0.62rem] font-bold text-accent tracking-[0.15em] uppercase block mb-1">
            {jpTitle}
          </span>
          <h3 className="text-[1.05rem] font-heading font-bold text-ink group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
        </div>
        <p className="text-[0.78rem] text-muted mt-2 leading-relaxed max-w-[22ch]">
          {desc}
        </p>
      </div>
    </TransitionLink>
  );
}

function RecruiterCard({ isOpen, delayClass }: { isOpen: boolean; delayClass: string }) {
  return (
    <TransitionLink
      href="/recrutadores"
      className={`group relative border border-accent/30 bg-accent/[0.02] rounded-md p-4 overflow-hidden block transition-all duration-300 hover:border-accent hover:bg-accent/[0.06] ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${delayClass} transition-all duration-500 ease-out`}
    >
      {/* Kanji de Fundo */}
      <span className="absolute -right-2 -bottom-6 text-7xl font-serif font-bold text-accent/5 select-none pointer-events-none group-hover:text-accent/12 transition-colors duration-300">
        招
      </span>
      <div className="relative z-10">
        <span className="text-[0.62rem] font-bold text-accent tracking-[0.15em] uppercase block mb-1">
          Saitō / 採用
        </span>
        <h3 className="text-[1.05rem] font-heading font-bold text-accent group-hover:text-accent-dark transition-colors duration-200 flex items-center gap-1.5">
          Para Recrutadores 
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </h3>
        <p className="text-[0.78rem] text-muted mt-2 leading-relaxed max-w-[24ch]">
          Resumo profissional, competências e download de CV.
        </p>
      </div>
    </TransitionLink>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Monitora scroll para ajustar opacidade fora do Hero
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar no clique fora do menu ou gatilho
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fechar ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 280); // Tolerância de transição
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Botão de Controle (Kanji "和" - Harmonia) no canto superior direito */}
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleMenu}
        className={`fixed top-6 right-6 sm:right-8 z-50 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-paper/60 backdrop-blur-sm border border-line/40 select-none cursor-pointer transition-all duration-300 shadow-sm ${
          isOpen
            ? 'opacity-100 scale-105 border-accent/40'
            : isScrolled
            ? 'opacity-35 hover:opacity-100 hover:scale-105'
            : 'opacity-100 hover:scale-105'
        }`}
        aria-label="Menu de Navegação"
        aria-expanded={isOpen}
      >
        <span className="text-xl sm:text-2xl font-serif font-bold text-ink select-none tracking-normal leading-none">
          和
        </span>
        <span className="text-[0.62rem] font-bold text-muted tracking-[0.1em] uppercase select-none pr-1">
          Menu
        </span>
      </div>

      {/* Backdrop de Fundo com Blur sutil */}
      <div
        className={`fixed inset-0 bg-ink/15 backdrop-blur-xs z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sheet Lateral (Painel de Navegação) */}
      <div
        ref={sheetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-paper border-l border-line/80 shadow-2xl flex flex-col justify-between p-6 sm:p-8 z-45 transition-transform duration-500 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Topo do Sheet: Nome e Descrição */}
        <div
          className={`transition-all duration-500 ease-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } delay-100`}
        >
          <div className="flex justify-between items-start">
            <TransitionLink
              href="/#top"
              className="inline-block hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <h2 className="text-xl font-heading font-bold text-ink tracking-tight">
                Gabriel NBS
              </h2>
            </TransitionLink>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-ink transition-colors p-1"
              aria-label="Fechar menu"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current stroke-[1.8] fill-none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-[0.8rem] text-muted mt-2 leading-relaxed max-w-[280px]">
            Interfaces com clareza, ritmo e precisão. Desenvolvedor Front-end & Designer.
          </p>
        </div>

        {/* Centro do Sheet: Cards de Seção */}
        <div className="flex-1 my-auto py-8">
          <span
            className={`text-[0.62rem] font-bold text-muted tracking-[0.15em] uppercase mb-4 block transition-all duration-500 ease-out ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } delay-120`}
          >
            Navegação / 導
          </span>

          <div className="grid grid-cols-1 gap-3.5" onClick={() => setIsOpen(false)}>
            <NavCard
              href="/#about"
              kanji="私"
              jpTitle="Watashi / 経歴"
              title="Sobre"
              desc="Filosofia, história e percurso zen."
              delayClass="delay-150"
              isOpen={isOpen}
            />
            <NavCard
              href="/#projects"
              kanji="作"
              jpTitle="Sakuhin / 作品"
              title="Projetos"
              desc="Portfólio de experimentos e produtos reais."
              delayClass="delay-200"
              isOpen={isOpen}
            />
            <NavCard
              href="/#contact"
              kanji="信"
              jpTitle="Renraku / 連絡"
              title="Contato"
              desc="Vamos conversar e construir algo juntos."
              delayClass="delay-250"
              isOpen={isOpen}
            />
            <RecruiterCard isOpen={isOpen} delayClass="delay-300" />
          </div>
        </div>

        {/* Base do Sheet: Redes Sociais */}
        <div
          className={`flex items-center justify-between border-t border-line/60 pt-6 transition-all duration-500 ease-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } delay-350`}
        >
          <div className="flex gap-4">
            <a
              href="https://github.com/GabrielNBS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.78rem] font-bold text-muted hover:text-accent transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.78rem] font-bold text-muted hover:text-accent transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
          <span className="text-[0.68rem] text-muted font-medium">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </>
  );
}
