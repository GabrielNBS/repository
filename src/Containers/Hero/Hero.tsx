import React from 'react'
import { HeroSection } from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'
import Circle, { CloundVetor } from '../../Components/Vetores'
import OrientalBackground from '../../Image/Backgrounds/OrientalBackground.jpg'
import Rellax from 'rellax'

export default function Hero() {
  const rellax = new Rellax('.rellax')
  return (
    <HeroSection style={{ backgroundImage: `url(${OrientalBackground})` }}>
      <div className="container">
        <Text as="h1">
          Ola, sou <strong>Gabriel Nascimento</strong>
        </Text>
        <Text as="h2">Desenvolvedor Front-End</Text>
        <SocialNavBar />
        {/* <Circle className="rellax" data-rellax-speed="2" /> */}
        {/* <CloundVetor className="rellax" /> */}
      </div>
    </HeroSection>
  )
}
