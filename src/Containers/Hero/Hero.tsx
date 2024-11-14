import React from 'react'
import { HeroSection } from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'
import Circle from '../../Components/VetoresAritmetcos'
import Rellax from 'rellax'

export default function Hero() {
  const rellax = new Rellax('.rellax')
  return (
    <HeroSection>
      <div className="container">
        <Text as="h2">Ola, sou Gabriel Nascimento</Text>
        <Text as="h1">Desenvolvedor Front-End</Text>
        <SocialNavBar />
        <Circle className="rellax" />
      </div>
    </HeroSection>
  )
}
