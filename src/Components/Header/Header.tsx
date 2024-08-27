import React from 'react'
import * as S from './styles'

function Header() {
  return (
    <S.Header>
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
    </S.Header>
  )
}

export default Header
