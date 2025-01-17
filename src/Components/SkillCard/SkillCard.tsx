import React from 'react'
import * as S from './styles'
import { FaCode } from 'react-icons/fa'
import { CardSkillsProps } from '../../types/CardSkillsProps'

export default function CardSkills({
  icon,
  title,
  description,
  background,
}: CardSkillsProps) {
  return (
    <S.CardBox
      style={{
        backgroundColor: `${background}`,
      }}
    >
      <div
        className="cardIcon"
        style={{
          backgroundColor: `${icon.iconBackground}`,
        }}
      >
        {React.createElement(icon.iconSymbol, { color: icon.iconColor })}
      </div>
      <div className="cardDescription">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </S.CardBox>
  )
}
