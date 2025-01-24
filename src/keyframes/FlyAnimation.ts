import { css, keyframes } from 'styled-components'

const fly = keyframes`
  0% {
    transform: translateY(10px) rotate(0);
  }
  25% {
    transform: translateY(-10px) rotate(-2deg);
  }
  50% {
    transform: translateY(10px) rotate(2deg);
  }
  75% {
    transform: translateY(-10px) rotate(-2deg);
  }
  100% {
    transform: translateY(10px) rotate(0);
  }
`
export const flyAnimation = css`
  animation: ${fly} 6s ease-in-out infinite;
`
