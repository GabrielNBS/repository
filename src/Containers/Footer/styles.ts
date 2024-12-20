import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'

export const FooterContainer = styled.footer`
  width: 100%;
  height: 3em;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.color.primary};

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
`
