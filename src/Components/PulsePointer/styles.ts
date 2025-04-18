// Pulse.js
import styled, { keyframes } from 'styled-components'
import { PulseAnimation } from '../../keyframes/PulseAnimation'

export const PulseWrapper = styled.div`
  position: relative;
  width: 0.7rem;
  height: 0.7rem;
`

export const PulseCircle = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.secondary};
  box-shadow: 0 0 6px ${({ theme }) => theme.color.secondary};
`

export const PulseRing = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.secondary};
  opacity: 0.6;
  ${PulseAnimation}
`
