import React from 'react';
import * as S from './styles';
import { Text } from '../../Components/Text/styles';
import Button from '../../Components/Button/Buttons';
import Footer from '../Footer';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import AnimatedText from '../../motion/AnimatedText';

export default function Contact() {
  return (
    <S.ContactContainer>
      <Text as="h2" $variant="hero">
        <AnimatedText text="Entre em contato" />
      </Text>
      <div>
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
  );
}
