import React from 'react'
import * as S from './styles'
import { Text } from '../Text/styles'
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
        <Text as="h3" $variant="h2">
          {title}
        </Text>
        <Text $variant="p">{description}</Text>
      </div>
    </S.CardBox>
  )
}
