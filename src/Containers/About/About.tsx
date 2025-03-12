import React from 'react'
import * as S from './styles'
import cards from '../../cards/cards'
import CardSkills from '../../Components/SkillCard/SkillCard'

export default function About() {
  return (
    <S.AboutSection>
      <div className="card_description">
        <h2>Como eu te ajudo</h2>
        <p>
          <strong>✨ Tudo começa com uma necessidade</strong>
          Eu a transformo em interfaces que conectam, inspiram e entregam
          resultados. Combinando tecnologia e design, crio experiências digitais
          que fazem a diferença.
        </p>
      </div>
      <div className="card_container">
        {cards.map((card, index) => (
          <CardSkills
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </S.AboutSection>
  )
}
