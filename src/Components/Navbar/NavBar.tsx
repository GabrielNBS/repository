import React, { useEffect, useState, useRef } from 'react'
import * as S from './styles'
import ThemeButtonChange from '../ThemeButtonChange/ThemeButtonChange'
import { ThemeToggleProps } from '../../types/ThemesProps'
import { Text } from '../Text/styles'

const NavBar: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 450)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const renderMenuItems = () => (
    <ul>
      <li>
        <a href="">Projetos</a>
      </li>
      <li>
        <a href="">Serviços</a>
      </li>
      <li>
        <a href="">Contatos</a>
      </li>
    </ul>
  )

  return (
    <>
      <S.Header className={isScrolled ? 'scrolled' : ''}>
        {isMobile ? (
          <>
            <S.HamburgerMenu onClick={toggleMenu}>
              <span />
              <span />
              <span />
            </S.HamburgerMenu>
            {isMenuOpen && (
              <>
                <S.MobileNav
                  style={{ right: isMenuOpen ? '0' : '-300px' }}
                  ref={menuRef}
                >
                  {renderMenuItems()}
                  <ThemeButtonChange toggleTheme={toggleTheme} />
                </S.MobileNav>
              </>
            )}
          </>
        ) : (
          <>
            <Text as="h1">GNBS</Text>
            <S.Header>{renderMenuItems()}</S.Header>
            <ThemeButtonChange toggleTheme={toggleTheme} />
          </>
        )}
      </S.Header>
    </>
  )
}

export default NavBar
