import styled from 'styled-components';
import { Text } from '../../Components/Text/styles';
import { Button } from '../../Components/Button/styles';
import { centralize } from '../../keyframes/Centralize';
import { ShakeAnimation } from '../../keyframes/ShakeAnimation';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;

  .btn-container {
    display: none;
  }

  ${Button} {
    ${centralize}
    margin-bottom: 0.5rem;
    background-color: transparent;
    box-shadow: none;
    gap: 0.5rem;

    &:hover {
      svg {
        ${ShakeAnimation}
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column-reverse;
    gap: 1rem;
  }

  ${Text} {
    filter: opacity(0.5);
  }

  ul {
    display: flex;
    gap: 1rem;

    svg {
      color: ${(props) => props.theme.color.primary};
      font-size: 2rem;
      filter: opacity(0.5);
    }
  }
`;
