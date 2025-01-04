import React from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'
import { CardProps } from '../../types/CardProps'
import { Text } from '../Text/styles'
import MacBookMockup from '../../Image/Mockups/MacBook15_mockup.png'

function ProjectCard({
  id,
  title,
  description,
  techs,
  videoUrl,
  deploy,
  github,
}: CardProps) {
  return (
    <S.Box id={id} className="container">
      <S.DescriptionProjectBox>
        <h2>{title}</h2>
        <p>{description}</p>
        <Text as="h3">Tecnologias:</Text>
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
      <S.VideoProjectBox>
        <img src={MacBookMockup} alt="" />
        <video src={videoUrl} autoPlay loop muted></video>
      </S.VideoProjectBox>
    </S.Box>
  )
}

export default ProjectCard
