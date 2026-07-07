'use client';

import { useState, useEffect, useRef } from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import { BrushStroke } from '@/components/ui/BrushStroke';
import { useBrushAnimation } from '@/hooks/useBrushAnimation';

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
      className={`group border-line bg-canvas/30 hover:border-accent hover:bg-canvas/80 relative block overflow-hidden rounded-md border p-4 transition-all duration-300 ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${delayClass} transition-all duration-500 ease-out`}
    >
      {/* Kanji de Fundo / Marca d'água */}
      <span className="text-line/20 group-hover:text-accent/10 pointer-events-none absolute -right-2 -bottom-6 font-serif text-7xl font-bold transition-colors duration-300 select-none">
        {kanji}
      </span>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <span className="text-accent mb-1 block text-[0.62rem] font-bold tracking-[0.15em] uppercase">
            {jpTitle}
          </span>
          <h3 className="font-heading text-ink group-hover:text-accent text-[1.05rem] transition-colors duration-200">
            {title}
          </h3>
        </div>
        <p className="text-muted text-label mt-2 max-w-[22ch] leading-relaxed">{desc}</p>
      </div>
    </TransitionLink>
  );
}

function RecruiterCard({ isOpen, delayClass }: { isOpen: boolean; delayClass: string }) {
  return (
    <TransitionLink
      href="/recrutadores"
      className={`group border-accent/30 bg-accent/2 hover:border-accent hover:bg-accent/6 relative block overflow-hidden border p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      } ${delayClass} transition-all duration-500 ease-out`}
    >
      {/* Kanji de Fundo */}
      <span className="text-accent/5 group-hover:text-accent/12 pointer-events-none absolute -right-2 -bottom-6 font-serif text-7xl font-bold transition-colors duration-300 select-none">
        招
      </span>
      <div className="relative z-10">
        <span className="text-accent mb-1 block text-[0.62rem] font-bold tracking-[0.15em] uppercase">
          Saitō / 採用
        </span>
        <h3 className="font-heading text-accent group-hover:text-accent-dark flex items-center gap-1.5 text-[1.05rem] transition-colors duration-200">
          Para Recrutadores
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </h3>
        <p className="text-muted text-label mt-2 max-w-[24ch] leading-relaxed">
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
  const textRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Hook de animação Sumi-e no botão de controle do menu
  useBrushAnimation({
    triggerRef,
    pathRef,
    textRef
  });

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
      {/* Botão de Controle (Kanji "和" - Harmonia) no canto superior esquerdo com Sumi-e */}
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleMenu}
        className={`bg-paper/60 border-line/40 fixed top-6 left-6 z-40 flex cursor-pointer items-center gap-2.5 border px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 select-none ${
          isOpen
            ? 'border-accent/40 scale-105 opacity-100'
            : isScrolled
              ? 'opacity-35 hover:scale-105 hover:opacity-100'
              : 'opacity-100 hover:scale-105'
        }`}
        aria-label="Menu de Navegação"
        aria-expanded={isOpen}
      >
        <span
          ref={textRef}
          className="text-ink font-serif text-xl leading-none font-bold tracking-normal transition-colors duration-300 select-none sm:text-2xl"
        >
          和
        </span>
        <span className="text-muted pr-1 text-[0.62rem] font-bold tracking-widest uppercase select-none">
          Menu
        </span>
        <BrushStroke ref={pathRef} className="text-accent/90" />
      </div>

      {/* Backdrop de Fundo com Blur sutil */}
      <div
        className={`bg-ink/15 fixed inset-0 z-40 backdrop-blur-xs transition-opacity duration-500 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sheet Lateral (Painel de Navegação) */}
      <div
        ref={sheetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`bg-paper border-line/80 fixed top-0 left-0 z-45 flex h-screen w-full transform flex-col justify-between border-l p-6 shadow-2xl transition-transform duration-500 ease-out sm:w-[420px] sm:p-8 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Topo do Sheet: Nome e Descrição */}
        <div
          className={`transition-all duration-500 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } delay-100`}
        >
          <div className="flex items-start justify-between">
            <TransitionLink
              href="/#top"
              className="hover:text-accent inline-block transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <h2 className="font-heading text-ink text-xl tracking-tight">Gabriel NBS</h2>
            </TransitionLink>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-ink p-1 transition-colors"
              aria-label="Fechar menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-muted mt-2 max-w-[280px] text-[0.8rem] leading-relaxed">
            Interfaces com clareza, ritmo e precisão. Desenvolvedor Front-end & Designer.
          </p>
        </div>

        {/* Centro do Sheet: Cards de Seção */}
        <div className="my-auto flex-1 py-8">
          <span
            className={`text-muted mb-4 block text-[0.62rem] font-bold tracking-[0.15em] uppercase transition-all duration-500 ease-out ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
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
          className={`border-line/60 flex items-center justify-between border-t pt-6 transition-all duration-500 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } delay-350`}
        >
          <div className="flex gap-4">
            <a
              href="https://github.com/GabrielNBS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent text-label font-bold transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent text-label font-bold transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
          <span className="text-muted text-[0.68rem] font-medium">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </>
  );
}
