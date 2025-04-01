import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import Button from '../../Components/Button/Buttons'
import Footer from '../Footer'

export default function Contact() {
  return (
    <S.ContactContainer>
      <Text as="h2" $variant="hero">
        ENTRE EM CONTATO
      </Text>
      <div data-aos="fade-up" data-aos-duration="1500">
        <Button as="a">Mande um E-mail</Button>
        <Button as="a">LinkedIn</Button>
      </div>
      <Footer />
    </S.ContactContainer>
  )
}
