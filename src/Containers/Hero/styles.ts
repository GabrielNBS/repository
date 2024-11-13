import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'

export const HeroSection = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  div.container {
    ${Text}:first-child {
      font-weight: 100;
    }

    ${Text}:nth-child(2) {
      font-size: 4.5rem;
    }
  }
`
