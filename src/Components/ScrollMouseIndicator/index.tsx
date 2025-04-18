import React from 'react'
import styled, { keyframes } from 'styled-components'

const drawMouse = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0.3);
    box-shadow: 0 0 0 transparent;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
    box-shadow: 0 0 12px ${({ theme }) => theme.color.secondary}55;
  }
`

const dropDot = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
`

const MouseContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 48px;
  border: 2px solid ${({ theme }) => theme.color.secondary};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 8px;
  opacity: 0;
  transform-origin: bottom;
  animation: ${drawMouse} 0.6s ease-out forwards;
  animation-delay: 0.2s;
`

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.secondary};
  animation: ${dropDot} 1.6s ease-in-out infinite;
  animation-delay: 0.8s;
`

export const ScrollMouseIndicator = () => {
  return (
    <MouseContainer>
      <Dot />
    </MouseContainer>
  )
}
