import styled from 'styled-components'
import { centralize } from '../../keyframes/Centralize'

export const CardBox = styled.div`
  ${centralize}
  width: 100%;
  flex-direction: column;
  border-radius: 8px;
  backdrop-filter: blur(5px) brightness(1.1) saturate(1.5);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  .cardIcon {
    ${centralize}

    align-self: center;
    background-color: ${(props) => props.theme.background.primary};
    width: 75px;
    height: 75px;
    border-radius: 50%;
    font-size: 2.5rem;
    z-index: 1;
    transition:
      background-color 0.3s ease,
      width 0.3s ease,
      height 0.3s ease;

    svg {
      color: ${(props) => props.theme.color.secondary};
    }
  }

  .cardDescription {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    color: ${(props) => props.theme.color.primary};
    height: 255px;
    width: 90%;

    p {
      filter: contrast(0.6);
      font-weight: 300;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 900;
      z-index: 5;
    }
  }
`
