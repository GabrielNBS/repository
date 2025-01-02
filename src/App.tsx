import React, { useEffect, useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import Header from './Components/Navbar/NavBar'
import { ThemeProvider } from 'styled-components'
import darkTheme from './styles/themes/dark'
import lightTheme from './styles/themes/light'
import Hero from './Containers/Hero/Hero'
import Projects from './Containers/Projects/Projects'
import About from './Containers/About/About'
import Contact from './Containers/Contact'
import Anchor from './Components/Anchor'

const App: React.FC = () => {
  const [theme, setTheme] = useState(true)
  const [activeElement, setActiveElement] = useState<number>(0)

  const currentTheme = theme ? darkTheme : lightTheme

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme)
  }

  useEffect(() => {
    const elements = document.querySelectorAll('section, main')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(elements).indexOf(entry.target)
            setActiveElement(index) // Atualiza o estado com a seção ativa
          }
        })
      },
      {
        root: null, // Viewport como referência
        threshold: 0.5, // Seção deve estar 50% visível
      },
    )

    elements.forEach((section) => observer.observe(section))

    return () => observer.disconnect() // Cleanup para evitar vazamento de memória
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} />
      <Anchor activeSection={activeElement} />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </ThemeProvider>
  )
}

export default App
