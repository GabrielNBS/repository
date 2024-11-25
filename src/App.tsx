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

const App: React.FC = () => {
  const [theme, setTheme] = useState(true)

  const currentTheme = theme ? darkTheme : lightTheme

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme)
  }

  useEffect(() => {
    // Seleciona os elementos de seção apenas após o DOM ser carregado
    const elements = Array.from(document.querySelectorAll('section, main'))

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()
      const direction = event.deltaY > 0 ? 1 : -1 // Determina a direção do scroll
      const currentSectionIndex = Math.round(
        window.scrollY / window.innerHeight,
      ) // Calcula a seção atual
      const nextSectionIndex = currentSectionIndex + direction

      // Faz o scroll para a próxima seção, garantindo que não saia dos limites
      if (nextSectionIndex >= 0 && nextSectionIndex < elements.length) {
        elements[nextSectionIndex].scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false }) // Torna o evento preventivo

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, []) // Executa o efeito apenas uma vez, após o componente ser montado

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
