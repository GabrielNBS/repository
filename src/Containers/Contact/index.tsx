import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import Button from '../../Components/Button/Buttons'

export default function Contact() {
  return (
    <S.ContactContainer>
      <Text>ENTRE EM CONTATO</Text>
      <div>
        <Button>gabrielnbs.dev@gmail.com</Button>
        <Button>Currículo</Button>
      </div>
    </S.ContactContainer>
  )
}
