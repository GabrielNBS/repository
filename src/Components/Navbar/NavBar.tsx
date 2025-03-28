import React, { useEffect, useState, useRef } from 'react'
import * as S from './styles'
import ThemeButtonChange from '../ThemeButtonChange/ThemeButtonChange'
import { ThemeToggleProps } from '../../types/ThemesProps'
import { Text } from '../Text/styles'
import { Button } from '../Button/styles'

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
                <S.MobileNav isOpen={isMenuOpen} ref={menuRef}>
                  <div>
                    <ul>
                      <li>
                        <Button as="a">Linkedin</Button>
                      </li>
                      <li>
                        <Button as="a">GitHub</Button>
                      </li>
                      <li>
                        <Button as="a">WhatsApp</Button>
                      </li>
                    </ul>
                  </div>
                  <ThemeButtonChange toggleTheme={toggleTheme} />
                </S.MobileNav>
              </>
            )}
          </>
        ) : (
          <>
            <Text as="h1">GNBS</Text>
            <S.Header></S.Header>
            <ThemeButtonChange toggleTheme={toggleTheme} />
          </>
        )}
      </S.Header>
    </>
  )
}

export default NavBar
