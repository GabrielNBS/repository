import React, { useEffect, useRef, useState } from 'react'
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
import Anchor from './Components/Anchor'

const App: React.FC = () => {
  const [theme, setTheme] = useState(true)
  const [activeElement, setActiveElement] = useState<number>(0)
  const sectionsRef = useRef<HTMLElement[]>([])

  const currentTheme = theme ? lightTheme : darkTheme

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme)

    // Aguarda um pequeno tempo antes de atualizar o AOS para evitar flickering
    setTimeout(() => {
      AOS.refresh()
    }, 300)
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Evita que a animação seja repetida
    })

    const handleResize = () => {
      AOS.refresh() // Atualiza AOS ao redimensionar a tela
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Atualiza o AOS apenas quando o tema mudar
  useEffect(() => {
    AOS.refresh()
  }, [theme])

  useEffect(() => {
    const elements = document.querySelectorAll('main, section')
    sectionsRef.current = Array.from(elements) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(elements).indexOf(entry.target)
            if (index !== activeElement) {
              setActiveElement(index)
            }
          }
        })
      },
      {
        root: null,
        threshold: 0.6,
      },
    )

    elements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [activeElement])

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()
      if (event.deltaY > 0) {
        // Scroll down
        if (activeElement < sectionsRef.current.length - 1) {
          sectionsRef.current[activeElement + 1].scrollIntoView({
            behavior: 'smooth',
          })
        }
      } else {
        // Scroll ups
        if (activeElement > 0) {
          sectionsRef.current[activeElement - 1].scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [activeElement])

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
