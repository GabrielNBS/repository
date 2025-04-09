import styled from 'styled-components'
import { centralize } from '../../keyframes/Centralize'

export const CardBox = styled.div`
  ${centralize}
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: 8px;
  box-shadow:
    6px 6px 12px ${(props) => props.theme.shadow.primary},
    -6px -6px 12px ${(props) => props.theme.shadow.secondary};
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

    h2 {
      font-size: 1.5rem;
      font-weight: 900;
      z-index: 5;
      margin-bottom: 0.5rem;
    }
  }
`
