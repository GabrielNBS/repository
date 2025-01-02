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
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.color.primary};

  h2 {
    justify-self: center;
    color: ${(props) => props.theme.color.secondary};
  }

  span:nth-child(1) {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px rgba(264, 264, 264, 0.1);
    left: 0;
    bottom: 1em;
    pointer-events: none;
  }

  span:nth-child(2) {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px rgba(264, 264, 264, 0.1);
    right: 0;
    top: 1em;
    pointer-events: none;
  }

  b {
    color: #fca311;
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
`

export const ServicesContainer = styled.div`
  grid-area: container2;

  li {
    margin: 1rem 0;
  }
`

export const ListBox = styled.li`
  margin: 1rem 0;
  box-shadow: 8px 5px 12px 2px rgba(${(props) => props.theme.shadow.primary});

  &:nth-child(1) {
    transform: translateX(-1rem);
  }
  &:nth-child(2) {
    transform: translateX(1rem);
    box-shadow: 8px 5px 12px 2px rgba(${(props) => props.theme.shadow.primary});
  }
  &:nth-child(3) {
    transform: translateX(-1rem);
  }
  &:nth-child(4) {
    transform: translateX(1rem);
    box-shadow: 8px 5px 12px 2px rgba(${(props) => props.theme.shadow.primary});
  }
`
