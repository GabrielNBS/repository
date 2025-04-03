import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'

export default function Footer() {
  return (
    <S.FooterContainer>
      <Text as="label">
        © 2024 Gabriel Nascimento. Todos os direitos reservados.
      </Text>
    </S.FooterContainer>
  )
}
