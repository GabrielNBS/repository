import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'
import SocialNavBar from '../../Components/SocialNavBar/SocialNavBar'
import AnimatedText from '../../motion/AnimatedText'
import FadeInText from '../../motion/FadeInText'
import TypingLoop from '../../motion/TypingLoop'

export default function Hero() {
  return (
    <S.HeroSection>
      <span className="children_names">真由美と沙織</span>
      <div className="container">
        <Text as="h2" $variant="hero">
          <AnimatedText />
        </Text>
        <Text as="p" $variant="h3">
          <FadeInText>
            Crio interfaces intuitivas e responsivas explorando as melhores
            praticas de:{' '}
            <strong>
              <TypingLoop
                texts={[
                  'Desenvolvimento.',
                  'UI/UX.',
                  'Acessibilidade.',
                  'Responsividade.',
                ]}
              />
            </strong>
          </FadeInText>
        </Text>
        <SocialNavBar />
      </div>
    </S.HeroSection>
  )
}
