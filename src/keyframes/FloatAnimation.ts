import { css, keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;
export const FloatAnimation = css`
  animation: ${float} 3s ease infinite;
`;
