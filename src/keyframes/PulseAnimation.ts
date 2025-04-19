// pulseKeyframes.js
import { css, keyframes } from 'styled-components';

const pulseRing = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.8);
    opacity: 0;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
`;

export const PulseAnimation = css`
  animation: ${pulseRing} 1.8s ease-out infinite;
`;
