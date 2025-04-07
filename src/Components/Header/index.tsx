import React, { useEffect, useState } from 'react'
import * as S from './styles'
import ThemeButtonChange from '../ThemeButtonChange/ThemeButtonChange'
import { ThemeToggleProps } from '../../types/ThemesProps'
import Logo from '../Logo/Index'

const NavBar: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  // Detecta o tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Reseta a expansão se houver scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsScrolled(true)
        if (isExpanded) setIsExpanded(false)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExpanded])

  const handleHeaderClick = () => {
    if (isMobileOrTablet) {
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <S.Header
      className={`${isScrolled ? 'scrolled' : ''} ${isExpanded ? 'expanded' : ''}`}
      onClick={handleHeaderClick}
    >
      <h1>
        <Logo />
      </h1>
      {(!isMobileOrTablet || isExpanded) && (
        <ThemeButtonChange toggleTheme={toggleTheme} />
      )}
    </S.Header>
  )
}

export default NavBar
