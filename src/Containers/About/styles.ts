import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'

export const AboutSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.background.primary} 50%,
    white 50%
  );

  span:nth-child(1) {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px rgba(264, 264, 264, 0.1); /* Define o contorno */
    left: 0;
    bottom: 1em;
    pointer-events: none;
  }

  span:nth-child(2) {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px rgba(0, 0, 0, 0.1); /* Define o contorno */
    right: 0;
    top: 1em;
    pointer-events: none;
  }

  h2 {
    color: white;
  }

  b {
    color: purple;
  }

  p {
    letter-spacing: 1px;
    line-height: 2rem;
    font-weight: 100;
  }

  div.container {
    display: grid;
    max-width: 1280px;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'container1 .'
      '. container2';
    column-gap: 8em;
  }

  ${Text} {
    justify-content: flex-start;
    padding-top: 2rem;
    margin-left: 2rem;
  }
`

export const AboutContainer = styled.div`
  grid-area: container1;
  color: white;
  position: relative;

  &::before {
    content: '';
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 10%;
    right: -40%;
  }
`

export const ServicesContainer = styled.div`
  grid-area: container2;
  color: black;
  position: relative;

  h2 {
    justify-self: center;
    color: black;
  }

  &::before {
    content: '';
    width: 50px;
    height: 50px;
    background-color: black;
    border-radius: 50%;
    position: absolute;
    bottom: 10%;
    left: -40%;
  }

  li {
    margin: 1rem 0;
  }
`

export const ListBox = styled.li`
  margin: 1rem 0;
  box-shadow: 8px 5px 12px 2px rgba(0, 0, 0, 0.3);

  &:nth-child(1) {
    transform: translateX(-1rem);
  }
  &:nth-child(2) {
    transform: translateX(1rem);
    box-shadow: -8px 5px 12px 2px rgba(0, 0, 0, 0.3);
  }
  &:nth-child(3) {
    transform: translateX(-1rem);
  }
  &:nth-child(4) {
    transform: translateX(1rem);
    box-shadow: -8px 5px 12px 2px rgba(0, 0, 0, 0.3);
  }
`
