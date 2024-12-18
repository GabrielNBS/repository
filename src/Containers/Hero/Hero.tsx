import React from 'react'
import { HeroSection } from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'
import Circle, { CloundVetor } from '../../Components/Vetores'
import OrientalBackground from '../../Image/Backgrounds/OrientalBackground.jpg'
import Rellax from 'rellax'
import Neon from '../../Components/NeonText/Neon'

export default function Hero() {
  const rellax = new Rellax('.rellax')
  return (
    <HeroSection>
      <div className="container">
        <Text as="h2">
          Ola, sou <strong>Gabriel Nascimento</strong>
        </Text>
        <Text as="h1">Desenvolvedor Front-end</Text>
        <Text as="h3">criando experiências impactantes e escaláveis.</Text>
        <SocialNavBar />
        {/* <Circle className="rellax" data-rellax-speed="2" /> */}
        {/* <CloundVetor className="rellax" /> */}
      </div>
    </HeroSection>
  )
}

// style={{ backgroundImage: `url(${OrientalBackground})` }}
