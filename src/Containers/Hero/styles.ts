import styled from 'styled-components'
import { Gradient } from '../../styles/Animation'

export const HeroSection = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 5;

  h1 {
    font-size: 72px;
    position: relative;
    display: inline-block;

    strong {
      color: ${(props) => props.theme.color.primary}; /* Branco ou cor base */
      text-shadow:
        2px 2px 0 #000,
        /* Sombra preta base */ 4px 4px 0
          ${(props) => props.theme.background.secondary},
        /* Camada 1 - Rosa */ 6px 6px 0
          ${(props) => props.theme.background.tertiary}; /* Camada 2 - Verde Neon */
      transform: skew(-10deg); /* Inclinação simulando itálico distorcido */
      display: inline-block;
    }
  }

  h2 {
    font-size: 2rem;
  }

  div.container {
    display: flex;
    flex-direction: column;
    position: relative;
  }
`
