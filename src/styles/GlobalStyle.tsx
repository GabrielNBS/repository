import {
  FaReact,
  FaBootstrap,
  FaGithub,
  FaLinkedin,
  FaJs,
} from 'react-icons/fa'
import {
  SiStyledcomponents,
  SiTypescript,
  SiCypress,
  SiRedux,
} from 'react-icons/si'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');


    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${(props) => props.theme.background.primary};
    line-height: 1.6;
  }

  a, li {
    text-decoration: none;
    list-style: none;
    color: inherit;
    transition: color 0.2s ease-in;

    &:hover {
      color: #007bff;
    }
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  .centralized {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i {
    font-size: 2rem;
    border-radius: 8px;
  }
`

export const ReactIcon = styled(FaReact)`
  color: #61dafb;
`

export const BootstrapIcon = styled(FaBootstrap)`
  color: #7952b3;
`

export const GithubIcon = styled(FaGithub)`
  color: #181717;
`

export const LinkedinIcon = styled(FaLinkedin)`
  color: #0a66c2;
`

export const StyledComponentsIcon = styled(SiStyledcomponents)`
  color: #db7093;
`

export const JavaScriptIcon = styled(FaJs)`
  color: #f7df1e;
`

export const TypeScriptIcon = styled(SiTypescript)`
  color: #3178c6;
`

export const CypressIcon = styled(SiCypress)`
  color: #17202c;
`

export const ReduxIcon = styled(SiRedux)`
  color: #764abc;
`

export default GlobalStyle
