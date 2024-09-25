import React, { useEffect, useState } from 'react'
import * as S from './styles'
import ThemeButtonChange from '../ThemeButtonChange/ThemeButtonChange'
import { ThemeToggleProps } from '../../types/ThemesProps'

const Header: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <S.Header className={`container ${isScrolled ? 'scrolled' : ''}`}>
        <h1>GNBS</h1>
        <nav>
          <ul>
            <li>
              <a href="">Projetos</a>
            </li>
            <li>
              <a href="">Servicos</a>
            </li>
            <li>
              <a href="">Contatos</a>
            </li>
          </ul>
        </nav>
        <ThemeButtonChange toggleTheme={toggleTheme} />
      </S.Header>
    </>
  )
}

export default Header
