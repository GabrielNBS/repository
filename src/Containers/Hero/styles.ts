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

    /* strong {
      ${Gradient};
      background: rgb(247, 253, 45);
      background: linear-gradient(
        232deg,
        rgba(247, 253, 45, 1) 8%,
        rgba(195, 34, 60, 1) 96%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 900;
    } */
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
