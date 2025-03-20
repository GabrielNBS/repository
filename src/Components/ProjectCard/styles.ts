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
  top: 5%;
  right: -8%;
  border-radius: 50% 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  font-size: 7rem;
  color: transparent;

  @media ${({ theme }) => theme.device.tablet} {
    right: 0;
    font-size: 8rem;
  }
  @media ${({ theme }) => theme.device.desktop} {
    top: 10%;
    right: 0;
    font-size: 10rem;
  }
`

export const ProjectsContainer = styled.div`
  height: 100dvh;
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
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100%;
  justify-content: center;
  padding: 0 4rem;
  gap: 2rem;

  h2 {
    ${GradientText}
  }

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    h2 {
      margin-top: 2rem;
    }
  }
`

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.color.primary};
  width: 100%;

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
  ${centralize}
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 70%;
    object-fit: contain;
  }

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    > div {
      display: flex;
      gap: 2rem;
    }
  }
`
