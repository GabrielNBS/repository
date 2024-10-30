import React from 'react'
import { HeroSection } from './styles'
import { Text, Title } from '../../Components/Text/styles'

export default function Hero() {
  return (
    <HeroSection>
      <div className="container">
        <Title $shadowLetter $large as={'h2'}>
          Desenvolvedor Front-End
        </Title>
        <Text>Experiencia solida em React</Text>
      </div>
      <div className="custom-shape-divider-bottom-1730261902">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M649.97 0L550.03 0 599.91 54.12 649.97 0z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </HeroSection>
  )
}
