// CardBox.ts
import styled from 'styled-components';

interface CardBoxProps {
  $delay?: string;
}

export const CardBox = styled.div<CardBoxProps>`
  h2 {
    font-size: clamp(2rem, 3vw, 1.75rem);
    color: ${(props) => props.theme.color.primary};
  }

  p {
    color: ${(props) => props.theme.color.primary};
  }

  .e-card {
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
  }

  .playing .wave {
    border-radius: 40%;
    animation: wave 4s infinite linear;
  }

  .wave {
    position: absolute;
    width: 1200px;
    height: 1600px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(
      744deg,
      ${(props) => props.theme.color.secondary},
      ${(props) => props.theme.background.secondary} 60%,
      #00ddeb
    );
    border-radius: 40%;
    animation: wave 55s infinite linear;
    animation-delay: ${(props) => props.$delay || '0s'};
  }

  .playing .wave:nth-child(2) {
    animation-duration: 6s;
  }

  .wave:nth-child(2) {
    top: 210px;
    animation-duration: 50s;
    animation-delay: ${(props) => props.$delay || '0s'};
  }

  .playing .wave:nth-child(3) {
    animation-duration: 8s;
  }
  .wave:nth-child(3) {
    top: 210px;
    animation-duration: 45s;
    animation-delay: ${(props) => props.$delay || '0s'};
  }

  .infotop {
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 5.6em;
    left: 0;
    right: 0;
    color: rgb(255, 255, 255);
    font-weight: 600;

    svg {
      width: 3.5rem;
      height: 3.5rem;
      margin-bottom: 1rem;
      color: ${(props) => props.theme.color.primary};
    }
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
