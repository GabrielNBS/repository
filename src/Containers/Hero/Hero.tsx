import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'

export default function Hero() {
  return (
    <S.HeroSection>
      <span className="children_names">真由美と沙織</span>
      <div className="container">
        <Text as="h2" $variant="hero">
          Olá, me chamo Gabriel
        </Text>
        <Text as="p" $variant="p">
          Crio interfaces intuitivas e responsivas explorando o melhor do
          <strong> desenvolvimento web</strong>.
        </Text>
        <SocialNavBar />
      </div>
    </S.HeroSection>
  )
}
