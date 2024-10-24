import React from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'
import CardProps from '../../types/CardProps'

export default function ProjectCard({
  img,
  title,
  description,
  techs,
  deploy,
  github,
}: CardProps) {
  return (
    <S.Box>
      <S.ImgBox style={{ backgroundImage: `url(${img})` }}></S.ImgBox>
      <S.TextBox>
        <div className="centralized">
          <h3>{title}</h3>
          <p>{description}</p>
          <ul>
            {techs.map((tech, id) => (
              <li key={id}>{tech}</li>
            ))}
          </ul>
          <S.ButtonBox>
            <Button href={deploy}>Deploy</Button>
            <Button href={github}>Código</Button>
          </S.ButtonBox>
        </div>
      </S.TextBox>
    </S.Box>
  )
}
