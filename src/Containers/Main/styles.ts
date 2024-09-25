import styled from 'styled-components'
import { Title } from '../../Components/Text/styles'
import { Card } from '../../Components/SkillCard/styles'

export const Main = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background.secondary};

  ${Title} {
    padding-top: 2rem;
    margin-bottom: 1rem;
  }
`
export const SkillsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10rem;

  ${Card}:nth-child(2) {
    transform: translateY(-20px);
  }
`
