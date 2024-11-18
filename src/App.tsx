import React, { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import Header from './Components/Navbar/NavBar'
import { ThemeProvider } from 'styled-components'
import darkTheme from './styles/themes/dark'
import lightTheme from './styles/themes/light'
import Hero from './Containers/Hero/Hero'
import Projects from './Containers/Projects/Projects'
import About from './Containers/About/About'
import Contact from './Containers/Contact'

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
      <Contact />
    </ThemeProvider>
  )
}

export default App
