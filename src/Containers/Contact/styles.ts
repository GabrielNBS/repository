import styled from 'styled-components';
import { Text } from '../../Components/Text/styles';
import { Button } from '../../Components/Button/styles';
import { centralize } from '../../keyframes/Centralize';
import { ShakeAnimation } from '../../keyframes/ShakeAnimation';

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
  }

  div:nth-child(2) {
    display: flex;
    gap: 2rem;

    @media ${({ theme }) => theme.device.mobile} {
      gap: 1rem;
    }

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
      background-color: ${(props) => props.theme.background.primary};
    }

    ${Button}:nth-child(2) {
      border: #0077b5;
      background-color: #0077b5;
      color: #fff;
    }
  }
`;
