import React from 'react'
import * as S from './styles'
import { FaCode } from 'react-icons/fa'
import { CardSkillsProps } from '../../types/CardSkillsProps'

export default function CardSkills({
  icon,
  title,
  description,
}: CardSkillsProps) {
  return (
    <S.CardBox>
      <div className="cardIcon">{React.createElement(icon)}</div>
      <div className="cardDescription">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </S.CardBox>
  )
}
