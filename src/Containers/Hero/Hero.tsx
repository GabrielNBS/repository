import React from 'react'
import { HeroSection } from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'

export default function Hero() {
  return (
    <HeroSection>
      <div className="container">
        <Text as="h2">Ola, sou Gabriel Nascimento</Text>
        <Text as="h1">
          <strong>Desenvolvedor Front-end</strong>
        </Text>
        <SocialNavBar />
      </div>
    </HeroSection>
  )
}
