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
