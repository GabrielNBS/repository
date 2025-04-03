import { css, keyframes } from 'styled-components'

const scroll = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
`

export const ScrollAnimation = css`
  animation: ${scroll} 15s linear infinite;
`
