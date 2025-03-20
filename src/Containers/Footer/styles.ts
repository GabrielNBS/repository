import styled from 'styled-components'
import { Text } from '../../Components/Text/styles'

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 3em;
  position: absolute;
  left: 0;
  bottom: 0;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column-reverse;
    gap: 1rem;
  }

  ${Text} {
    font-size: 0.8em;
    filter: opacity(0.5);
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
