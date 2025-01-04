import styled from 'styled-components'

export const Box = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  column-gap: 100px;
  color: ${(props) => props.theme.color.primary};
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

  img {
    display: block;
    width: 100%;
    height: auto; /* Mantém proporção do mockup */
  }

  video {
    width: 80%;
    height: 354px;
    position: absolute;
  }
`
