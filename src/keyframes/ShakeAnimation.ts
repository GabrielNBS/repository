import { css, keyframes } from 'styled-components';

export const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

export const ShakeAnimation = css`
  animation: ${shake} 1s linear infinite;
`;
