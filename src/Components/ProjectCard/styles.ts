import styled, { css } from 'styled-components'
import { GradientText } from '../../styles/GlobalStyle'
import { centralize } from '../../keyframes/Centralize'

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
  height: 100dvh;
  justify-content: center;
  padding: 0 4rem;
  gap: 2rem;
`

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.color.primary};
  width: 50%;

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
  width: 50%;
  height: 100%;
  position: relative;

  div {
    ${centralize}
    width: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: red;
    position: relative;
    z-index: 2;
    padding-top: 206%;

    /* Tablet */
    @media ${({ theme }) => theme.device.tablet} {
      padding-top: 130%; // Mantém igual se for o mesmo que mobile
    }

    /* Desktop */
    @media ${({ theme }) => theme.device.desktop} {
      padding-top: 56.25%; // 16:9
    }

    &.videoContainer {
      background-color: blue;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 1rem 1rem 0 0;
      aspect-ratio: 16 / 9;
      z-index: 1; // Alterado de -1 para 1

      @media ${({ theme }) => theme.device.mobile} {
        width: 92%;
        height: 90%;
      }

      /* Tablet */
      @media ${({ theme }) => theme.device.tablet} {
        width: 92%;
        height: 85%;
      }

      /* Desktop */
      @media ${({ theme }) => theme.device.desktop} {
        width: 74%;
        height: 86%;
      }
    }
  }
`
