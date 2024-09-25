import { createGlobalStyle } from 'styled-components'

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

`
export default GlobalStyle
