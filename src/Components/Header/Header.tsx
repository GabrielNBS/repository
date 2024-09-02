import React from 'react'
import * as S from './styles'
import ThemeButtonChange from '../ThemeButtonChange/ThemeButtonChange'
import { ThemeToggleProps } from '../../types/ThemesProps'

const Header: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  return (
    <>
      <S.Header className="container">
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
