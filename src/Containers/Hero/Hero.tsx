import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'
import { ReactSVG } from 'react-svg'
import PC from '../../Image/Vetores/ManInPc.svg'

export default function Hero() {
  return (
    <S.HeroSection>
      <ReactSVG src={PC} />
      <S.BlurFormElement />
      <div className="container">
        <Text as="h2">Ola, sou Gabriel Nascimento</Text>
        <Text as="h1">
          <strong>Desenvolvedor Front-end</strong>
        </Text>
        <SocialNavBar />
      </div>
    </S.HeroSection>
  )
}
