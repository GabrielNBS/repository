import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'
import { centralize } from '../../keyframes/Centralize'

export const ContactContainer = styled.section`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${Text} {
    text-align: center;
    font-size: 5rem;
    font-weight: 900;
  }

  div {
    display: flex;
    gap: 2rem;
  }
`
