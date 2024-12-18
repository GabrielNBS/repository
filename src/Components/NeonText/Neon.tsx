import React from 'react'
import styled, { keyframes } from 'styled-components'

// Animação de pulsação
const pulse = keyframes`
  0%, 100% {
    text-shadow:
      0 0 5px #0ff,
      0 0 10px #0ff,
      0 0 20px #0ff,
      0 0 40px #0ff,
      0 0 80px rgba(0, 255, 255, 0.5);
  }
  50% {
    text-shadow:
      0 0 5px #0ff,
      0 0 15px #0ff,
      0 0 30px #0ff,
      0 0 60px #0ff,
      0 0 120px rgba(0, 255, 255, 0.8);
  }
`

// Estilo do texto
const LedText = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2rem;

  /* Efeito de perspectiva */
  transform: perspective(200px) rotateX(-5deg);

  /* Brilho "LED" */
  text-shadow:
    0 0 5px #0ff,
    0 0 10px #0ff,
    0 0 20px #0ff,
    0 0 40px #0ff,
    0 0 80px rgba(0, 255, 255, 0.5);

  /* Animação de pulsação */
  animation: ${pulse} 2s infinite;
`

const Neon: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000',
      }}
    >
      <LedText>Portfolio</LedText>
    </div>
  )
}

export default Neon
