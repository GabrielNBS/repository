import { css, keyframes, styled } from 'styled-components'

export const GradientAnimation = keyframes`
  0%{background-position:92% 0%}
  50%{background-position:9% 100%}
  100%{background-position:92% 0%}
  `
export const Gradient = css`
  background: linear-gradient(
    115deg,
    #000000,
    ${(props) => props.theme.background.primary}
  );
  background-size: 400% 400%;

  animation: ${GradientAnimation} 9s ease infinite;
`
export const LevitateAnimation = keyframes`
  0% {transform: translateY(0px)}
  50% {transform: translateY(10px)}
  100% {transform: translateY(0)}
`

export const Levitate = css`
  animation: ${LevitateAnimation} 3s ease-in-out infinite;
`
