import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'
import { Gradient, Levitate } from '../../styles/Animation'
import { CloundVetor } from '../../Components/Vetores'
import { Cloud1 } from '../../Components/Vetores/styles'

export const HeroSection = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 5;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    filter: opacity(0.9);
    z-index: -5;
  }

  div.container {
    ${Text}:first-child {
      font-weight: 700;

      strong {
        ${Gradient};
        background: rgb(247, 253, 45);
        background: linear-gradient(
          232deg,
          rgba(247, 253, 45, 1) 8%,
          rgba(195, 34, 60, 1) 96%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    ${Cloud1} {
      top: 0;
      left: 50%;
      ${Levitate}
    }
  }
`
