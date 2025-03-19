import styled, { css } from 'styled-components'
import { GradientText } from '../../styles/GlobalStyle'

// Constantes reutilizáveis
const PROJECT_IDS = [
  'EFood',
  'EPlay',
  'HojeTaDoce',
  'ToDo',
  'Spider-Verse',
  'CloneDisney',
]

// Estilos comuns para números de projeto
const projectNumberStyle = css`
  position: absolute;
  top: 10%;
  right: 0;
  border-radius: 50% 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  font-size: 10rem;
  color: transparent;
`

export const ProjectsContainer = styled.div`
  ${({ theme }) =>
    PROJECT_IDS.map(
      (project, index) => css`
        #${project} {
          position: relative;

          &::after {
            ${projectNumberStyle};
            content: '${index + 1}';
            -webkit-text-stroke: 2px rgba(${theme.shadow.primary});
          }
        }
      `,
    )}
`

export const Box = styled.section`
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    height: 100vh;
    align-items: center;

    @media ${({ theme }) => theme.device.desktop},
      ${({ theme }) => theme.device.notebook} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 4rem;
      gap: 2rem;
    }
  }
`

export const DescriptionProjectBox = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;
  color: ${({ theme }) => theme.color.primary};

  @media ${({ theme }) => theme.device.desktop},
    ${({ theme }) => theme.device.notebook} {
    display: flex;
  }

  h2 {
    ${GradientText}
  }

  p {
    opacity: 0.8;
  }

  ul {
    margin: 0 0 3rem 0;

    li {
      display: flex;
      margin: 1rem 0;
      gap: 0.5rem;
      font-style: italic;
      font-weight: 600;
    }
  }

  > div {
    display: flex;
    gap: 1rem;
  }
`

export const VideoProjectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 90vh; // Ocupa 90% da altura da tela

  picture {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      max-width: 90vw; // Limita a largura máxima
      max-height: 75vh; // Limita a altura máxima
    }
  }

  video {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 81%;
    height: 44%;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
    z-index: 2;
    aspect-ratio: 16 / 9;

    // Ajustes para mobile
    @media ${({ theme }) => theme.device.mobile} {
      width: 96%;
      height: 82%;
      top: 50%;
      border-radius: 4rem;
    }

    // Ajustes para tablet
    @media ${({ theme }) => theme.device.tablet} {
      width: 95%;
      height: 81%;
      top: 50%;
      border-radius: 2rem;
    }
  }
`
