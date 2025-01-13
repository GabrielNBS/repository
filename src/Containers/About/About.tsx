import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import CardHardSkill_1 from '../../Image/AboutCards/HardSkill_1.svg'
import CardHardSkill_2 from '../../Image/AboutCards/HardSkill_2.svg'
import CardHardSkill_3 from '../../Image/AboutCards/HardSkill_3.svg'
import CardHardSkill_4 from '../../Image/AboutCards/HardSkill_4.svg'

export default function About() {
  return (
    <S.AboutSection>
      <span>真由美</span>
      <span>沙織</span>
      <div>
        <div>
          <Text as="h2">Hard Skills</Text>
        </div>
        <S.CardsSection>
          <img src={CardHardSkill_1} alt="Card com trechos de códigos" />
          <img src={CardHardSkill_2} alt="Card com trechos de códigos" />
          <img src={CardHardSkill_3} alt="Card com trechos de códigos" />
          <img src={CardHardSkill_4} alt="Card com trechos de códigos" />
        </S.CardsSection>
      </div>
    </S.AboutSection>
  )
}
