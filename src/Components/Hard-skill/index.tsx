import React from 'react'
import * as S from './styles'
export default function Skills() {
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Bootstrap',
    'HTML',
    'CSS',
    'Sass',
    'Cypress',
    'Styled',
    'Redux',
  ]

  return (
    <S.SkillContainer>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className={skill.toLowerCase()}>
            <span />
            {skill}
          </li>
        ))}
      </ul>
    </S.SkillContainer>
  )
}
