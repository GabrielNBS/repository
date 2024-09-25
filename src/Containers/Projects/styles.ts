import styled from 'styled-components'

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  nav {
    margin: 0 auto;
    width: 380px;
    padding: 2rem 0;

    ul {
      display: flex;
      justify-content: space-between;
    }
  }

  > div {
    max-width: 1280px;
    height: 60%;
    margin-top: 2rem;
  }
`
