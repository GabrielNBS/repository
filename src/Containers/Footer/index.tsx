import React from 'react';
import * as S from './styles';
import { Text } from '../../Components/Text/styles';
import { Button } from '../../Components/Button/styles';
import { HiDocumentMagnifyingGlass } from 'react-icons/hi2';

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <S.FooterContainer>
        <Text as="label">
          © {getCurrentYear()} Gabriel Nascimento. Todos os direitos reservados.
        </Text>
        <Button
          as="a"
          href={
            'https://drive.google.com/file/d/1imdMjeR3JvDvgaC-wAOIj6a0K6yYu0O_/view?usp=drive_link'
          }
          download
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Currículo"
          title="Currículo"
        >
          <HiDocumentMagnifyingGlass />
          Currículo
        </Button>
      </S.FooterContainer>
    </>
  );
}
