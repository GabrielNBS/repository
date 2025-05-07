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
            'https://drive.google.com/file/d/1bRpQ3zr-xwYSj7WOrKoqUGCBlnRm_THC/view?usp=drive_link'
          }
          download
        >
          <HiDocumentMagnifyingGlass />
          Currículo
        </Button>
      </S.FooterContainer>
    </>
  );
}
