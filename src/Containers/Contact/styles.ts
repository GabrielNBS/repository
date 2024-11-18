import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'

export const ContactContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${Text} {
    font-size: 5em;
    font-weight: 900;
  }

  div {
    display: flex;
    gap: 2rem;
  }
`
