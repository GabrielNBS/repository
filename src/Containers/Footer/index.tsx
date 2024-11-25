import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '../../styles/GlobalStyle'

export default function Footer() {
  return (
    <S.FooterContainer>
      <nav>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Sobre</a>
          </li>
          <li>
            <a href="">Projetos</a>
          </li>
        </ul>
      </nav>
      <Text>© 2024 Gabriel Nascimento. Todos os direitos reservados.</Text>
      <ul>
        <li>
          <a href="">
            <LinkedinIcon />
          </a>
        </li>
        <li>
          <a href="">
            <GithubIcon />
          </a>
        </li>
        <li>
          <a href="">
            <WhatsappIcon />
          </a>
        </li>
      </ul>
    </S.FooterContainer>
  )
}
