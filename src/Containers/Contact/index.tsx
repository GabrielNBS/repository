import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import Button from '../../Components/Button/Buttons'
import Footer from '../Footer'

export default function Contact() {
  return (
    <S.ContactContainer>
      <Text as="hero">ENTRE EM CONTATO</Text>
      <div>
        <Button as="a">
          <Text>Mande um E-mail</Text>
        </Button>
        <Button as="a">
          <Text>LinkedIn</Text>
        </Button>
      </div>
      <Footer />
    </S.ContactContainer>
  )
}
