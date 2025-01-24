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
  margin: 2rem 0;
  color: ${(props) => props.theme.color.primary};

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

  .transformContainer img {
    display: flex;
    ${flyAnimation}
    object-fit: cover;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  .transformContainer {
    visibility: visible;
    opacity: 1;
    animation: transformAnimation 1.5s ease-in-out forwards;
  }

  .transformContainer:nth-child(1) {
    --translateX: 30px;
    --translateY: -330px;

    img {
      animation-delay: 0s;
    }
  }
  .transformContainer:nth-child(2) {
    --translateX: 100px;
    --translateY: -300px;
    img {
      animation-delay: 0.4s;
    }
  }
  .transformContainer:nth-child(3) {
    --translateX: -100px;
    --translateY: -300px;
    animation-delay: 0.6s;
  }
  .transformContainer:nth-child(4) {
    --translateX: -30px;
    --translateY: -330px;
    img {
      animation-delay: 0.8s;
    }
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
