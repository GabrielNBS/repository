import React from 'react'
import * as S from './styles'
import { Title } from '../../Components/Text/styles'
import SkillCard from '../../Components/SkillCard/SkillCard'

export default function Main() {
  return (
    <S.Main>
      <Title className="centralized" as={'h2'} $medium>
        Oque eu faco
      </Title>
      <S.SkillsContainer>
        <SkillCard />
        <SkillCard />
        <SkillCard />
      </S.SkillsContainer>
    </S.Main>
  )
}
