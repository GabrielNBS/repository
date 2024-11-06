import styled from 'styled-components'

export const Box = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1280px;
`

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  h2 {
    font-size: clamp(32px, 4vw, 48px);
  }

  h3 {
    font-size: clamp(24px, 3vw, 36px);
  }

  p,
  li {
    font-size: clamp(16px, 1.5vw, 18px);
  }

  p {
    margin: 2rem 0;
  }

  ul {
    margin: 1rem 0;
    li {
      margin-left: 1rem;
    }
  }

  div {
    display: flex;
    gap: 1rem;
  }
`

export const ImageProjectBox = styled.div`
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
