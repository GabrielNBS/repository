import React from 'react'
import * as S from './styles'
import cards from '../../cards/cards'
import CardSkills from '../../Components/SkillCard/SkillCard'

export default function About() {
  return (
    <S.AboutSection>
      <div className="card_title">
        <p>Skills</p>
        <h2>Oque eu faco</h2>
      </div>
      <div className="card_container">
        {cards.map((card, index) => (
          <CardSkills
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            background={card.background}
          />
        ))}
      </div>
      <S.SoftSkills>
        <ul>
          <li className="javascript">
            <span />
            JavaScript
          </li>
          <li className="typescript">
            <span />
            TypeScript
          </li>
          <li className="react">
            <span />
            React
          </li>
          <li className="bootstrap">
            <span />
            Bootstrap
          </li>
          <li className="html">
            <span />
            HTML
          </li>
          <li className="css">
            <span />
            CSS
          </li>
          <li className="sass">
            <span />
            Sass
          </li>
          <li className="cypress">
            <span />
            Cypress
          </li>
          <li className="styledComponent">
            <span />
            Styled
          </li>
          <li className="redux">
            <span />
            Redux
          </li>
        </ul>
      </S.SoftSkills>
    </S.AboutSection>
  )
}
