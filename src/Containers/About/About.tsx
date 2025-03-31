import React from 'react'
import * as S from './styles'
import cards from '../../cards/cards'
import CardSkills from '../../Components/SkillCard/SkillCard'
import { Text } from '../../Components/Text/styles'

import {
  SiNextdotjs,
  SiRedux,
  SiTypescript,
  SiStyledcomponents,
  SiTailwindcss,
  SiSass,
  SiPostman,
  SiGit,
} from 'react-icons/si'
import { FaReact, FaNodeJs } from 'react-icons/fa'

const techs = [
  { icon: <SiNextdotjs size={20} />, name: 'Next.js' },
  { icon: <SiRedux size={20} />, name: 'Redux' },
  { icon: <SiTypescript size={20} />, name: 'TypeScript' },
  { icon: <FaReact size={20} />, name: 'React.js' },
  { icon: <SiStyledcomponents size={20} />, name: 'Styled-Components' },
  { icon: <SiTailwindcss size={20} />, name: 'Tailwind' },
  { icon: <SiSass size={20} />, name: 'Sass' },
  { icon: <SiPostman size={20} />, name: 'Rest' },
  { icon: <FaNodeJs size={20} />, name: 'Node.js' },
  { icon: <SiGit size={20} />, name: 'Git' },
]

export default function About() {
  return (
    <S.AboutSection>
      <S.DescriptionContainer>
        <S.TextContainer>
          <Text as="h2" $variant="h2">
            Como eu te ajudo
          </Text>
          <Text>
            <strong>✨ Tudo começa com uma necessidade</strong> <br />
            Eu a transformo em interfaces que conectam, inspiram e entregam
            resultados. Combinando tecnologia e design, crio experiências
            digitais que fazem a diferença utilizando tecnologias modernas como:
          </Text>
        </S.TextContainer>
        <S.TechsContainer>
          <ul>
            {techs.map((tech, index) => (
              <li key={index}>
                {tech.icon}
                {tech.name}
              </li>
            ))}
          </ul>
        </S.TechsContainer>
      </S.DescriptionContainer>
      <S.CardContainer>
        {cards.map((card, index) => (
          <CardSkills
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </S.CardContainer>
    </S.AboutSection>
  )
}
