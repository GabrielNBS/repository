import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '../../assets/icons/icons'

export default function Footer() {
  return (
    <S.FooterContainer>
      <Text as="label">
        © 2024 Gabriel Nascimento. Todos os direitos reservados.
      </Text>
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
