import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'
import { Button } from '../../Components/Button/styles'
import { centralize } from '../../keyframes/Centralize'
import { FloatAnimation } from '../../keyframes/FloatAnimation'
import { ShakeAnimation } from '../../keyframes/ShakeAnimation'

export const ContactContainer = styled.section`
  display: flex;
  position: relative;
  width: 100%;
  height: 100dvh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${Text} {
    text-align: center;
  }

  div:nth-child(2) {
    display: flex;
    gap: 2rem;

    a {
      ${centralize}
      gap: .5rem;

      &:hover {
        svg {
          ${ShakeAnimation}
        }
      }
    }

    ${Button}:nth-child(1) {
      &:hover {
        border: #d14836;
      }

      &::after {
        background-color: #d14836;
      }
    }

    ${Button}:nth-child(2) {
      &:hover {
        border: #0077b5;
      }
      &::after {
        background-color: #0077b5;
      }
    }
  }
`
