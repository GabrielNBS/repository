import styled, { css, keyframes } from 'styled-components'

const fly = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-5px) rotate(-2deg);
  }
  75% {
    transform: translateY(0) rotate(2deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
`

const flyAnimation = css`
  animation: ${fly} 3s ease-in-out infinite;
`

export const ProjectsContainer = styled.div`
  #EPlay {
    background-color: ${(props) => props.theme.projectBackground.project1};
  }

  #EFood {
    background-color: ${(props) => props.theme.projectBackground.project2};
  }

  #HojeTaDoce {
    background-color: ${(props) => props.theme.projectBackground.project3};
  }

  #ToDo {
    background-color: ${(props) => props.theme.projectBackground.project4};
  }

  #Spider-Verse {
    background-color: ${(props) => props.theme.projectBackground.project5};
  }

  #CloneDisney {
    background-color: ${(props) => props.theme.projectBackground.project6};
  }
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
  width: 100%; /* Controle de largura */
  max-width: 800px; /* Ajuste para mockup */
  margin: 0 auto;

  .transformContainer {
    display: block; /* Inicialmente em block para poder animar */
    position: absolute;
    width: 120px;
    opacity: 0; /* Começam invisíveis */
    visibility: hidden; /* Inicia invisível */
    transition:
      transform 1.5s ease-in-out,
      opacity 1.5s ease-in-out;
    z-index: 0;
  }

  /* Ajustes para hover */
  &:hover {
    .pizza,
    .chocolate,
    .poke,
    .sushi {
      display: block;
      ${flyAnimation}
      object-fit: cover;
      filter: drop-shadow(
        0 4px 8px rgba(0, 0, 0, 0.3)
      ); /* Aplicando sombra diretamente na imagem */
    }
    .transformContainer {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      transition:
        transform 1.5s ease-in-out,
        opacity 1.5s ease-in-out;
    }

    .transformContainer:nth-child(1) {
      transform: translateX(350px) translateY(-340px) rotateZ(-30deg);
      animation-delay: 0s;
    }
    .transformContainer:nth-child(2) {
      transform: translateX(-350px) translateY(-340px) rotateZ(-30deg);
      animation-delay: 2s;
    }
    .transformContainer:nth-child(3) {
      transform: translateX(-120px) translateY(-390px) rotateZ(-30deg);
      animation-delay: 4s;
    }
    .transformContainer:nth-child(4) {
      transform: translateX(120px) translateY(-390px) rotateZ(-30deg);
      animation-delay: 6s;
    }
  }

  /* Controle do vídeo */
  img {
    display: flex;
    width: 100%;
    height: auto; /* Mantém proporção do mockup */
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
