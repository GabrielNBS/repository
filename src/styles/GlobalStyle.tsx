import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    /* Reset CSS */
    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Global Font and Body Settings */
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
  }



  /* Links and Lists */
  a, li {
    text-decoration: none;
    list-style: none;
    color: inherit;
    transition: color 0.2s ease-in;

    &:hover {
      color: #007bff;
    }
  }

  /* Buttons */
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
