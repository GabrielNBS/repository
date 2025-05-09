import React from 'react';
import * as S from './styles';
import { AnchorProps } from '../../types/AnchorProps';

const Anchor: React.FC<AnchorProps> = ({ activeSection }) => {
  const sections = [
    'Hero',
    'About',
    'Contact',
    'EFood',
    'EPlay',
    'HojeTaDoce',
    'ToDo',
    'Spider-Verse',
    'CloneDisney'
  ];

  // Função que realiza o scroll suave até a seção correspondente ao índice clicado
  const scrollToSection = (index: number) => {
    const section = document.querySelectorAll('section, main')[index];
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <S.AnchorContainer>
      {sections.map((sectionName, index) => (
        <S.AnchorDot
          as="button"
          key={index}
          $active={activeSection === index}
          aria-label={`Ir para a seção ${sectionName}`}
          onClick={() => scrollToSection(index)}
        />
      ))}
    </S.AnchorContainer>
  );
};

export default Anchor;
