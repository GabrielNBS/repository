import React from 'react';
import * as S from './styles';
import { Text } from '../../Components/Text/styles';

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <S.FooterContainer>
        <Text as="label">
          © {getCurrentYear()} Gabriel Nascimento. Todos os direitos reservados.
        </Text>
        {/* <div className="btn-container">
          <Button
            as="a"
            href={
              'https://drive.google.com/file/d/1bRpQ3zr-xwYSj7WOrKoqUGCBlnRm_THC/view?usp=drive_link'
            }
            download
          >
            📄 Currículo
          </Button>
        </div> */}
      </S.FooterContainer>
    </>
  );
}
