import styled from 'styled-components';
import { Text } from '../../Components/Text/styles';

export const HeroSection = styled.main`
  display: flex;
  height: 100dvh;
  align-items: center;
  position: relative;

  .children_names {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px ${(props) => props.theme.shadow.tertiary};
    pointer-events: none;
    right: 50px;
    top: 1em;
  }

  strong {
    ${Text} {
      font-weight: 700;
      color: ${(props) => props.theme.color.secondary};
      z-index: 1;
    }
  }

  @keyframes wave {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    .container {
      width: 90%;
      align-items: center;
      text-align: center;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .container {
      width: 90%;
      align-items: center;
      text-align: center;
    }

    .children_names {
      font-size: 4rem;
    }
  }
`;
