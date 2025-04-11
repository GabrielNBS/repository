import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import GlobalStyle from './styles/GlobalStyle'
import Header from './Components/Header'
import { ThemeProvider } from 'styled-components'
import darkTheme from './styles/themes/dark'
import lightTheme from './styles/themes/light'
import Hero from './Containers/Hero/Hero'
import Projects from './Containers/Projects/Projects'
import About from './Containers/About/About'
import Contact from './Containers/Contact'

const App: React.FC = () => {
  const [theme, setTheme] = useState(true)
  const currentTheme = theme ? lightTheme : darkTheme

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme)
    setTimeout(() => AOS.refresh(), 300)
  }

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })

    const handleResize = () => AOS.refresh()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [theme])

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
