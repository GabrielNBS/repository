import React from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'
import { CardProps } from '../../types/CardProps'

function ProjectCard({
  title,
  description,
  techs,
  imageUrl,
  deploy,
  github,
}: CardProps) {
  return (
    <S.Box className="container">
      <S.DescriptionProjectBox>
        <h2>{title}</h2>
        <p>{description}</p>
        <ul>
          {techs.map((tech, index) => (
            <li key={index}>
              <i>{React.createElement(tech.techIcon)}</i>
              <span>{tech.name}</span>
            </li>
          ))}
        </ul>

        <div>
          <Button href={deploy}>Deploy</Button>
          <Button href={github}>Código</Button>
        </div>
      </S.DescriptionProjectBox>

      <S.ImageProjectBox style={{ backgroundImage: `url(${imageUrl})` }} />
    </S.Box>
  )
}

export default ProjectCard
