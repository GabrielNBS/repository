import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import ThemeButtonChange from '../ThemeButtonChange';
import { ThemeToggleProps } from '../../types/ThemesProps';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo/Index';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../../assets/icons/icons';

const NavBar: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  // Define se o header deve ter estilo "scrolled"
  const [isScrolled, setIsScrolled] = useState(false);

  // Controla o estado do menu mobile (aberto ou fechado)
  const [mobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Referência ao container do menu mobile (para detectar cliques fora dele)
  const menuRef = useRef<HTMLDivElement>(null);

  // Alterna visibilidade do menu mobile
  function handleToggleMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  // Efeito para fechar o menu mobile ao clicar fora ou ao fazer scroll
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Verifica se o clique foi dentro do menu
      const isClickInsideMenu = menuRef.current?.contains(target);

      // Verifica se o clique foi no botão do menu
      const isClickOnMenuButton = document
        .querySelector('[aria-label="Menu mobile"]')
        ?.contains(target);

      // Fecha o menu se o clique foi fora do menu e do botão
      if (!isClickInsideMenu && !isClickOnMenuButton) {
        setIsMobileMenuOpen(false);
      }
    }

    // Define classe de scroll no header e fecha o menu ao rolar a página
    function handleScroll() {
      setIsScrolled(window.scrollY > 300);

      if (mobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <S.Header className={`${isScrolled ? 'scrolled' : ''}`}>
        <h1>
          <Logo />
        </h1>
        <ThemeButtonChange toggleTheme={toggleTheme} />

        {/* Botão de menu mobile com animação (hamburger -> X) */}
        <S.MenuButton onClick={handleToggleMenu} aria-label="Menu mobile">
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </S.MenuButton>
      </S.Header>

      {/* Menu mobile com animação de entrada/saída */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <S.MobileNav
            ref={menuRef}
            as={motion.nav}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Menu de navegação mobile"
          >
            <h1>
              <Logo />
            </h1>

            <nav>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/gabrielnascimento-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linkedin"
                    title="Linkedin"
                  >
                    <LinkedinIcon />
                    linkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.github.com/GabrielNBS"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Github"
                    title="Github"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/+5532984286600?text=Olá!%20Gostaria%20de%20entrar%20em%20contato."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Whatsapp"
                    title="Whatsapp"
                  >
                    <WhatsappIcon />
                    Whatsapp
                  </a>
                </li>
              </ul>
            </nav>

            <ThemeButtonChange toggleTheme={toggleTheme} />
          </S.MobileNav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
