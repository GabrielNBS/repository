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
  const [theme, setTheme] = useState(true) // Estado do tema (true = light, false = dark)
  const [activeElement, setActiveElement] = useState<number>(0) // Índice da seção visível no momento
  const sectionsRef = useRef<HTMLElement[]>([]) // Referência das seções para scroll automático
  const touchStartY = useRef<number | null>(null) // Armazena a posição inicial do toque no mobile

  const currentTheme = theme ? lightTheme : darkTheme // Seleciona tema baseado no estado

  // Alterna entre tema claro e escuro
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme)
    setTimeout(() => AOS.refresh(), 300) // Atualiza as animações após mudança de tema
  }

  // Inicializa AOS (animações) e escuta redimensionamentos de tela
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
    const handleResize = () => AOS.refresh()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Atualiza AOS quando o tema mudar
  useEffect(() => {
    AOS.refresh()
  }, [theme])

  // Prepara as seções e observa qual está visível com IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll('main, section')
    sectionsRef.current = Array.from(elements) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(elements).indexOf(entry.target)
            if (index !== activeElement) {
              setActiveElement(index) // Atualiza índice da seção atual
            }
          }
        })
      },
      { root: null, threshold: 0.6 }, // 60% visível para considerar a seção ativa
    )

    elements.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [activeElement])

  // Adiciona lógica de scroll por seção via mouse e toque (mobile)
  useEffect(() => {
    // Função para rolar até uma seção com base no índice
    const scrollToSection = (index: number) => {
      if (index >= 0 && index < sectionsRef.current.length) {
        sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Scroll via mouse (desktop)
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()
      if (event.deltaY > 0) {
        scrollToSection(activeElement + 1)
      } else {
        scrollToSection(activeElement - 1)
      }
    }

    // Captura o início do swipe (mobile)
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY
    }

    // Captura o fim do swipe (mobile) e decide direção
    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current === null) return
      const touchEndY = event.changedTouches[0].clientY
      const deltaY = touchStartY.current - touchEndY

      if (deltaY > 50) {
        scrollToSection(activeElement + 1) // Swipe para cima = próxima seção
      } else if (deltaY < -50) {
        scrollToSection(activeElement - 1) // Swipe para baixo = seção anterior
      }

      touchStartY.current = null
    }

    // Adiciona os event listeners
    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    // Remove os listeners ao desmontar
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
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
