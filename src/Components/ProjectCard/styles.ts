import styled from 'styled-components'
import { flyAnimation } from '../../keyframes/FlyAnimation'
import { GradientText } from '../../styles/GlobalStyle'

export const ProjectsContainer = styled.div`
  ${(props) => {
    const projectBackgrounds = [
      'EFood',
      'EPlay',
      'HojeTaDoce',
      'ToDo',
      'Spider-Verse',
      'CloneDisney',
    ]

    return projectBackgrounds
      .map(
        (project, index) => `
        #${project} {
          position: relative;
        }

        #${project}::after {
          content: '${index + 1}';
          position: absolute;
          top: 10%;
          right: 0;
          border-radius: 50% 0 0 50%;
          font-size: 10rem;
          width: 150px;
          height: 150px;
          color: transparent;
          -webkit-text-stroke: 2px rgba(${props.theme.shadow.primary});
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `,
      )
      .join('')
  }}
`

export const Box = styled.section`
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    height: 100vh;

    @media ${({ theme }) => theme.device.desktop},
      ${({ theme }) => theme.device.notebook} {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
`

export const DescriptionProjectBox = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;
  color: ${(props) => props.theme.color.primary};

  @media ${({ theme }) => theme.device.desktop},
    ${({ theme }) => theme.device.notebook} {
    display: flex;
  }

  h2 {
    ${GradientText}
  }

  p {
    filter: brightness(0.8);
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

  div {
    display: flex;
    gap: 1rem;
  }
`

export const VideoProjectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  img {
    display: flex;
    width: 100%;
    height: 600px;
    object-fit: contain;
  }

  video {
    background-color: inherit;
    max-width: 100%;
    width: 80%;
    height: 425px;
    object-fit: fill;
    position: absolute;
    transform: translateY(-16px);
    border-radius: 1rem 1rem 0 0;
  }
`
