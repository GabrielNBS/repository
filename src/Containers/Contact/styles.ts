import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'
import { FooterContainer } from '../Footer/styles'
import { StyledWrapper } from '../../Components/SocialNavBar/styles'

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
    font-size: 5em;
    font-weight: 900;
  }

  div {
    display: flex;
    gap: 2rem;
  }

  ${FooterContainer} {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    ${Text} {
      font-size: 0.8em;
    }

    ul {
      display: flex;
      gap: 1rem;

      svg {
        color: ${(props) => props.theme.color.primary};
        font-size: 2rem;
      }
    }
  }
`
