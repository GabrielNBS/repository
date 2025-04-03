import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import Button from '../../Components/Button/Buttons'
import Footer from '../Footer'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  return (
    <S.ContactContainer>
      <Text as="h2" $variant="hero">
        ENTRE EM CONTATO
      </Text>
      <div data-aos="fade-up" data-aos-duration="1500">
        <Button
          as="a"
          href="mailto:gabrielnbs.dev@gmail.com?subject=Contato&body=Olá, Gabriel! Gostaria de entrar em contato com você."
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope /> Mande um E-mail
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/in/gabrielnascimento-dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </Button>
      </div>
      <Footer />
    </S.ContactContainer>
  )
}
