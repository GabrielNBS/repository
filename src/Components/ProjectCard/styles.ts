import styled from 'styled-components'
import { flyAnimation } from '../../keyframes/FlyAnimation'

export const ProjectsContainer = styled.div`
  ${(props) => {
    const projectBackgrounds = [
      'EPlay',
      'EFood',
      'HojeTaDoce',
      'ToDo',
      'Spider-Verse',
      'CloneDisney',
    ]

    return projectBackgrounds
      .map(
        (project, index) => `
        #${project} {
          background-color: ${props.theme.projectBackground[`project${index + 1}`]};
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
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100vh;
    column-gap: 100px;
    max-width: 1280px;
  }
`

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: ${(props) => props.theme.color.secondary};
  }

  p {
    margin: 2rem 0;
  }

  ul {
    margin: 0 0 3rem 0;
    li {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      gap: 0.5rem;
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

  .transformContainer {
    display: block;
    position: absolute;
    width: 60px;
    opacity: 0;
    visibility: hidden;
    transition:
      transform 1.5s ease-in-out,
      opacity 1.5s ease-in-out;
    z-index: 0;
  }

  @keyframes transformAnimation {
    0% {
      transform: translateX(0) translateY(0) rotateZ(0deg);
    }
    100% {
      transform: translateX(var(--translateX)) translateY(var(--translateY))
        rotateZ(-30deg);
    }
  }

  /* Removendo o hover e aplicando as animações diretamente */
  .pizza,
  .chocolate,
  .poke,
  .sushi {
    display: flex;
    ${flyAnimation}
    object-fit: cover;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  .pizza {
    animation-delay: 0s;
  }
  .chocolate {
    animation-delay: 0.5s;
  }
  .poke {
    animation-delay: 1s;
  }
  .sushi {
    animation-delay: 1.5s;
  }

  .transformContainer {
    visibility: visible;
    opacity: 1;
    animation: transformAnimation 1.5s ease-in-out forwards;
  }

  .transformContainer:nth-child(1) {
    --translateX: 30px;
    --translateY: -330px;
    animation-delay: 0s;
  }
  .transformContainer:nth-child(2) {
    --translateX: 100px;
    --translateY: -300px;
    animation-delay: 0.4s;
  }
  .transformContainer:nth-child(3) {
    --translateX: -100px;
    --translateY: -300px;
    animation-delay: 0.6s;
  }
  .transformContainer:nth-child(4) {
    --translateX: -30px;
    --translateY: -330px;
    animation-delay: 0.8s;
  }

  img {
    display: flex;
    width: 100%;
    height: auto;
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
