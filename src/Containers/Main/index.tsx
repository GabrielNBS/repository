import React from 'react';
import * as S from './styles';
import { Text } from '../../Components/Text/styles';
import SocialNavBar from '../../Components/SocialNavBar';
import AnimatedText from '../../motion/AnimatedText';
import FadeInText from '../../motion/FadeInText';
import TypingLoop from '../../motion/TypingLoop';
import { ScrollMouseIndicator } from '../../Components/ScrollMouseIndicator';

export default function Main() {
  return (
    <S.HeroSection>
      <span className="children_names">真由美と沙織</span>
      <div className="container">
        <Text as="h2" $variant="hero">
          <AnimatedText text="Olá, sou o Gabriel" />
        </Text>
        <FadeInText>
          <Text $variant="h3">
            Crio interfaces intuitivas e responsivas, explorando as melhores práticas de:
          </Text>
        </FadeInText>
        <strong>
          <TypingLoop texts={['desenvolvimento.', 'performance.', 'UI/UX.', 'acessibilidade.']} />
        </strong>
        <SocialNavBar />
      </div>
      <ScrollMouseIndicator />
    </S.HeroSection>
  );
}
