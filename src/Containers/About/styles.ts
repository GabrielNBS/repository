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
    gap: 20px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  }
  &:nth-child(3) {
    transform: translateX(-1rem);
  }
  &:nth-child(4) {
    transform: translateX(1rem);
  }
`
