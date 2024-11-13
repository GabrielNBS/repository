import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import Header from './Components/Header/Header'
import { ThemeProvider } from 'styled-components'
import darkTheme from './styles/themes/dark'
import lightTheme from './styles/themes/light'
import Hero from './Containers/Hero/Hero'
import SocialNavBar from './Components/SocialNavBar/SocialNavBar'
import Projects from './Containers/Projects/Projects'
import About from './Containers/Main/About'

const App: React.FC = () => {
  const [theme, setTheme] = useState(true)

  const currentTheme = theme ? darkTheme : lightTheme

  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme)
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Projects />
      <SocialNavBar />
    </ThemeProvider>
  )
}

export default App
