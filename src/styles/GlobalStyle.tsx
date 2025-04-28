import { createGlobalStyle, css } from 'styled-components';

// Importando as fontes
import Black from '../assets/fonts/Black.ttf';
import BlackItalic from '../assets/fonts/BlackItalic.ttf';
import BoldItalic from '../assets/fonts/BoldItalic.ttf';
import Heavy from '../assets/fonts/Heavy.ttf';
import HeavyItalic from '../assets/fonts/HeavyItalic.ttf';
import Italic from '../assets/fonts/Italic.ttf';
import Light from '../assets/fonts/Light.ttf';
import LightItalic from '../assets/fonts/LightItalic.ttf';
import Medium from '../assets/fonts/Medium.ttf';
import MediumItalic from '../assets/fonts/MediumItalic.ttf';
import RegularItalic from '../assets/fonts/RegularItalic.ttf';
import SemiBold from '../assets/fonts/SemiBold.ttf';
import SemiBoldItalic from '../assets/fonts/SemiBoldItalic.ttf';
import ThinItalic from '../assets/fonts/ThinItalic.ttf';
import UltraLightItalic from '../assets/fonts/UltraLightItalic.ttf';

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


html, body {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  height: 100%;
  overscroll-behavior-y: contain;
  font-family: "SF Pro Display";
  background: ${(props) => props.theme.background.primary};
  }

  main {
    scroll-snap-type: y mandatory;
    scroll-snap-stop: always;
    overflow-y: auto;
    height: 100vh;
  }

  section {
    scroll-snap-align: start;
    height: 100vh;
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

.active {
  display: flex;
}
`;

export const GradientText = css`
  color: ${(props) => props.theme.color.secondary};
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.color.primary},
    ${(props) => props.theme.color.secondary}
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 3s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default GlobalStyle;
