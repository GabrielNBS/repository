import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'
import { Gradient, Levitate } from '../../styles/Animation'
import { CloundVetor } from '../../Components/Vetores'
import { Cloud1 } from '../../Components/Vetores/styles'
import { StyledWrapper } from '../../Components/SocialNavBar/styles'

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

  h1 {
    font-size: 5em;
    white-space: nowrap;
  }

  ${StyledWrapper} {
    .wrapper {
      &::before {
        content: ' ';
        position: absolute;
        left: 27%;
        top: 55%;
        border-radius: 3em;
        background-color: ${(props) => props.theme.background.secondary};
        height: 8px;
        width: 120px;
      }

      &::after {
        content: ' ';
        position: absolute;
        right: 27%;
        top: 55%;
        border-radius: 3em;
        background-color: ${(props) => props.theme.background.secondary};
        height: 8px;
        width: 120px;
      }
    }
  }

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
