import React from 'react'
import * as S from './styles'
import { AnchorProps } from '../../types/AnchorProps'

const Anchor: React.FC<AnchorProps> = ({ activeSection }) => {
  const sections = ['Hero', 'About', 'Projects', 'Contact']

  const scrollToSection = (index: number) => {
    const section = document.querySelectorAll('section')[index]
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <S.AnchorContainer>
      {sections.map((_, index) => (
        <S.AnchorDot
          key={index}
          active={activeSection === index}
          onClick={() => scrollToSection(index)}
        />
      ))}
    </S.AnchorContainer>
  )
}

export default Anchor
