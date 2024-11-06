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

        <h3>Techs Utilizadas</h3>
        <ul>
          {techs.map((tech, index) => (
            <li key={index}>
              {typeof tech === 'string' ? tech : React.createElement(tech)}
            </li>
          ))}
        </ul>

        <div>
          <Button as="a" href={deploy} target="_blank">
            Site
          </Button>
          <Button as="a" href={github} target="_blank">
            Github
          </Button>
        </div>
      </S.DescriptionProjectBox>

      <S.ImageProjectBox style={{ backgroundImage: `url(${imageUrl})` }} />
    </S.Box>
  )
}

export default ProjectCard
