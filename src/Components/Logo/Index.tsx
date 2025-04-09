import React from 'react'
import styled, { keyframes } from 'styled-components'

// === Animações ===

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

// === Componentes ===

const LogoText = styled.h1`
  position: relative;
  z-index: 10;
  font-weight: 900;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  color: ${(props) => props.theme.color.primary};
`

const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    ${LogoText} {
      color: ${(props) => props.theme.color.secondary};
      transition: color 0.3s ease-in-out;
    }
  }
`

const Orbit = styled.div<{ $delay?: string; $hue?: string }>`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  animation: ${rotate} 4s linear infinite;
  animation-delay: ${(props) => props.$delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to top,
      transparent,
      ${(props) => props.theme.color.secondary}
    );
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }

  span {
    position: absolute;
    inset: 12px;
    background: ${(props) => props.theme.background.primary};
    border-radius: 50%;
    z-index: 1;
  }

  i {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: ${(props) => props.theme.color.secondary};
    box-shadow:
      0 0 10px ${(props) => props.theme.color.secondary},
      0 0 20px ${(props) => props.theme.color.secondary},
      0 0 30px ${(props) => props.theme.color.secondary},
      0 0 40px ${(props) => props.theme.color.secondary};
    border-radius: 50%;
    z-index: 100;
  }
`

// === Componente Principal ===

export default function Logo() {
  return (
    <Container>
      <Orbit>
        <span />
        <i />
      </Orbit>
      <Orbit $delay="-2s" $hue="290deg">
        <span />
        <i />
      </Orbit>
      <LogoText>GN</LogoText>
    </Container>
  )
}
