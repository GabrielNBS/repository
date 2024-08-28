import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import Header from './Components/Header/Header'
import { ThemeProvider } from 'styled-components'
import darkTheme from './styles/themes/dark'
import lightTheme from './styles/themes/light'
import Hero from './Containers/Hero/Hero'
import Main from './Containers/Main/Main'

const App: React.FC = () => {
  const [theme, setTheme] = useState(true)

  const currentTheme = theme ? lightTheme : darkTheme

  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme)
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} />
      <Hero />
      <Main />
    </ThemeProvider>
  )
}

export default App
