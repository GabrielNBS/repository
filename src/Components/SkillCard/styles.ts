import styled from 'styled-components'
import { centralize } from '../../keyframes/Centralize'

export const CardBox = styled.div`
  ${centralize}
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  border-radius: 8px;
  backdrop-filter: blur(5px) brightness(1.1) saturate(1.5);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);

    &::before {
      top: 0;
      left: 0;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, #ff5f6d, #ff9671);
    transform: rotate(-45deg);
    transition: all 0.3s ease;
    z-index: -1;
  }

  .cardIcon {
    align-self: flex-start;
    margin: 15px 15px 0;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    ${centralize}
    font-size: 2.5rem;
    z-index: 1;
    transition:
      background-color 0.3s ease,
      width 0.3s ease,
      height 0.3s ease;
  }

  .cardDescription {
    display: flex;
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
      margin-bottom: 1em;
      font-weight: 900;
      z-index: 5;
    }
  }
`
