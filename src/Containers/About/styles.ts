import styled from 'styled-components'
import { centralize } from '../../keyframes/Centralize'

export const AboutSection = styled.section`
  height: 100vh;
  width: 100vw;
  ${centralize}
  position: relative;
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.color.primary};

  div {
    display: flex;
    max-width: 1480px;
    width: 100%;
    flex-direction: row-reverse;
    justify-content: center;

    h2 {
      color: ${(props) => props.theme.color.secondary};
    }
  }

  span:nth-child(1),
  span:nth-child(2) {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px rgba(264, 264, 264, 0.1);
    pointer-events: none;

    &:nth-child(1) {
      left: 0;
      bottom: 1em;
    }

    &:nth-child(2) {
      right: 0;
      top: 1em;
    }
  }
`
export const CardsSection = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
  img {
    width: 700px;
    height: 250px;
    border-radius: 10px;

    &:nth-child(1) {
      position: absolute;
      left: 50px;
      top: 300px;
    }
    &:nth-child(2) {
      position: absolute;
      left: 0;
      top: 450px;
    }
    &:nth-child(3) {
      position: absolute;
      left: 50px;
      top: 0;
    }
    &:nth-child(4) {
      position: absolute;
      left: 0;
      top: 150px;
    }
  }
`
