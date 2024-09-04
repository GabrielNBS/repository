import styled from 'styled-components'
import { Title } from '../../Components/Text/styles'

export const Main = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.secondary};

  ${Title} {
    padding-top: 2rem;
    margin-bottom: 1rem;
  }
`
export const SkillsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10rem;
`
