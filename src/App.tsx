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
