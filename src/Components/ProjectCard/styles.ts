import styled from 'styled-components'

export const Box = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  max-width: 90vw;
  color: ${(props) => props.theme.color.primary};
`

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

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

export const ImageProjectBox = styled.div`
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
