import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.colors.primary};
    color: #333;
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

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: #0056b3;
    }
  }
`
export default GlobalStyle
