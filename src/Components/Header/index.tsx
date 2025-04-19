import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import ThemeButtonChange from '../ThemeButtonChange/ThemeButtonChange';
import { ThemeToggleProps } from '../../types/ThemesProps';
import Logo from '../Logo/Index';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleToggleMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const isClickInsideMenu = menuRef.current?.contains(target);
      const isClickOnMenuButton = document
        .querySelector('[aria-label="Menu mobile"]')
        ?.contains(target);

      if (!isClickInsideMenu && !isClickOnMenuButton) {
        setIsMobileMenuOpen(false);
      }
    }

    function handleScroll() {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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

      <AnimatePresence>
        {mobileMenuOpen && (
          <S.MobileNav
            ref={menuRef}
            as={motion.nav}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1>
              <Logo />
            </h1>
            <ThemeButtonChange toggleTheme={toggleTheme} />
          </S.MobileNav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
