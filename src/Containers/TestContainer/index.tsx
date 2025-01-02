import React, { useEffect, useState } from 'react'
import * as S from './styles'

// Functional Component
const TestNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false) // Controla se a página foi rolada
  const [activeSection, setActiveSection] = useState('') // Controla a seção ativa

  useEffect(() => {
    const handleScroll = () => {
      // Verifica se o scroll passou de 100px
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Identifica qual seção está visível
      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (
          rect.top <= window.innerHeight / 3 &&
          rect.bottom >= window.innerHeight / 3
        ) {
          setActiveSection(section.id)
        }
      })
    }

    // Adiciona evento de scroll
    window.addEventListener('scroll', handleScroll)

    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <S.Header className={isScrolled ? 'scrolled' : ''}>
        <h1>Logo</h1>
        <nav>
          <ul>
            {/* Renderiza apenas os itens ativos se o navbar estiver "scrolled" */}
            <li
              className={
                isScrolled && activeSection === 'projetos' ? 'active' : ''
              }
              style={{ pointerEvents: isScrolled ? 'auto' : 'none' }} // Garante que não interage fora do scroll
            >
              <a href="#projetos">Projetos</a>
            </li>
            <li
              className={
                isScrolled && activeSection === 'servicos' ? 'active' : ''
              }
              style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
            >
              <a href="#servicos">Serviços</a>
            </li>
            <li
              className={
                isScrolled && activeSection === 'contatos' ? 'active' : ''
              }
              style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
            >
              <a href="#contatos">Contatos</a>
            </li>
          </ul>
        </nav>
      </S.Header>
      <S.Section>Seção: Projetos</S.Section>
      <S.Section id="projetos">Seção: Projetos</S.Section>
      <S.Section id="servicos">Seção: Serviços</S.Section>
      <S.Section id="contatos">Seção: Contatos</S.Section>
    </>
  )
}

export default TestNavBar
