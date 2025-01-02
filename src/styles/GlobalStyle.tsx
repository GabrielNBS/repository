import {
  FaReact,
  FaBootstrap,
  FaGithub,
  FaLinkedinIn,
  FaJs,
  FaWhatsapp,
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');



    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    font-style: normal;
  }

  body {
    background-color: ${(props) => props.theme.background.primary};
    line-height: 1.6;
    color: #fff;
    height: 100vh;

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
  }

  a, li {
    text-decoration: none;
    list-style: none;
    color: inherit;
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
    font-size: 1.2rem;
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

export const LinkedinIcon = styled(FaLinkedinIn)`
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

export const WhatsappIcon = styled(FaWhatsapp)`
  color: #25d366;
`

export default GlobalStyle
