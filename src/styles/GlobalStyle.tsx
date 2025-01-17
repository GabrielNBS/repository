import styled, { createGlobalStyle } from 'styled-components'

// Importando as fontes
import Black from '../assets/fonts/Black.ttf'
import BlackItalic from '../assets/fonts/BlackItalic.ttf'
import BoldItalic from '../assets/fonts/BoldItalic.ttf'
import Heavy from '../assets/fonts/Heavy.ttf'
import HeavyItalic from '../assets/fonts/HeavyItalic.ttf'
import Italic from '../assets/fonts/Italic.ttf'
import Light from '../assets/fonts/Light.ttf'
import LightItalic from '../assets/fonts/LightItalic.ttf'
import Medium from '../assets/fonts/Medium.ttf'
import MediumItalic from '../assets/fonts/MediumItalic.ttf'
import RegularItalic from '../assets/fonts/RegularItalic.ttf'
import SemiBold from '../assets/fonts/SemiBold.ttf'
import SemiBoldItalic from '../assets/fonts/SemiBoldItalic.ttf'
import ThinItalic from '../assets/fonts/ThinItalic.ttf'
import UltraLightItalic from '../assets/fonts/UltraLightItalic.ttf'

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'SF Pro Display';
  src: url(${Black}) format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${BlackItalic}) format('truetype');
  font-weight: 900;
  font-style: italic;
}


@font-face {
  font-family: 'SF Pro Display';
  src: url(${BoldItalic}) format('truetype');
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${Heavy}) format('truetype');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${HeavyItalic}) format('truetype');
  font-weight: 800;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${Italic}) format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${Light}) format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${LightItalic}) format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${Medium}) format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${MediumItalic}) format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${RegularItalic}) format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${SemiBold}) format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${SemiBoldItalic}) format('truetype');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${ThinItalic}) format('truetype');
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: 'SF Pro Display';
  src: url(${UltraLightItalic}) format('truetype');
  font-weight: 200;
  font-style: italic;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: ${(props) => props.theme.background.primary};
  line-height: 1.6;
  color: #fff;
  height: 100vh;
  font-family: "SF Pro Display";
  overflow: hidden;

  h2 {
    font-size: clamp(32px, 4vw, 48px);
  }

  h3 {
    font-size: clamp(24px, 3vw, 36px);
  }

  p,
  li {
    font-size: clamp(16px, 1.5vw, 18px);
  }
}

a, li {
  text-decoration: none;
  list-style: none;
  color: inherit;
}

.container {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.centralized {
  display: flex;
  justify-content: center;
  align-items: center;
}

i {
  font-size: 1.2rem;
  border-radius: 8px;
}
`

export default GlobalStyle
