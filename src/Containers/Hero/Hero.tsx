import React from 'react'
import { HeroSection } from './styles'
import { Text, Title } from '../../Components/Text/styles'

export default function Hero() {
  return (
    <HeroSection>
      <Title $large as={'h2'}>
        Desenvolvedor Front-End
      </Title>
      <Text>Experiencia solida em React</Text>
    </HeroSection>
  )
}
