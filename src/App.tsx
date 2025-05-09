import React, { useEffect, useRef, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Header from './Components/Header';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import darkTheme from './styles/themes/dark';
import lightTheme from './styles/themes/light';
import Main from './Containers/Main';
import Projects from './Containers/Projects';
import About from './Containers/About';
import Contact from './Containers/Contact';
import Anchor from './Components/Anchor';
import AOS from 'aos';

// Estilo global condicional para bloquear o scroll vertical (usado para scroll por seção em desktop)
const ScrollLock = createGlobalStyle<{ disableScroll: boolean }>`
  body {
    ${({ disableScroll }) =>
      disableScroll &&
      `
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
      `}
  }
`;

const App: React.FC = () => {
  // Estado para alternar entre temas claro/escuro
  const [theme, setTheme] = useState(true);

  // Estado que armazena o índice da seção ativa (para indicar onde o usuário está)
  const [activeElement, setActiveElement] = useState<number>(0);

  // Detecta se o dispositivo é desktop com base no tipo de ponteiro
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(pointer: fine)').matches);

  // Refs para armazenar as seções, controlar se está rolando, e rastrear o índice atual
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const activeIndexRef = useRef<number>(0);

  // Tema atual com base no booleano `theme`
  const currentTheme = theme ? lightTheme : darkTheme;

  // Função para alternar o tema e atualizar o AOS após a transição
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
    setTimeout(() => AOS.refresh(), 300);
  };

  // Inicializa o AOS uma vez ao montar o componente
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Atualiza o AOS ao redimensionar a janela
    const handleResize = () => AOS.refresh();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualiza o AOS ao mudar o tema
  useEffect(() => {
    AOS.refresh();
  }, [theme]);

  // Atualiza o estado `isDesktop` dinamicamente se o tipo de ponteiro mudar
  useEffect(() => {
    const updateIsDesktop = () => {
      const isNowDesktop = window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(isNowDesktop);
    };

    const mediaQuery = window.matchMedia('(pointer: fine)');
    mediaQuery.addEventListener('change', updateIsDesktop);
    updateIsDesktop(); // chamada inicial

    return () => mediaQuery.removeEventListener('change', updateIsDesktop);
  }, []);

  // Lógica de scroll customizado por seção (só é ativada em desktop)
  useEffect(() => {
    if (!isDesktop) return;

    // Coleta os elementos <main> e <section> para monitorar via IntersectionObserver
    const elements = document.querySelectorAll('main, section');
    sectionsRef.current = Array.from(elements) as HTMLElement[];

    // Observa qual seção está visível na tela
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = Array.from(elements).indexOf(entry.target);
            if (index !== activeIndexRef.current) {
              activeIndexRef.current = index;
              setActiveElement(index);
            }
          }
        });
      },
      { root: null, threshold: 0.6 }
    );

    elements.forEach((section) => observer.observe(section));

    // Scroll suave para uma seção específica com debounce
    const scrollToSection = (index: number) => {
      if (isScrolling.current || index < 0 || index >= sectionsRef.current.length) return;

      isScrolling.current = true;
      activeIndexRef.current = index;
      setActiveElement(index);

      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });

      // Libera o scroll depois de um tempo (duração da animação)
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    // Captura rolagem do mouse para navegar entre seções
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling.current) return;

      if (event.deltaY > 30) {
        scrollToSection(activeIndexRef.current + 1);
      } else if (event.deltaY < -30) {
        scrollToSection(activeIndexRef.current - 1);
      }
    };

    // Captura teclas de seta para navegação por seção
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrolling.current) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        scrollToSection(activeIndexRef.current + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        scrollToSection(activeIndexRef.current - 1);
      }
    };

    // Adiciona os eventos
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Limpa os eventos ao desmontar
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDesktop]);

  return (
    <ThemeProvider theme={currentTheme}>
      {/* Estilos globais gerais do projeto */}
      <GlobalStyle />

      {/* Bloqueia o scroll padrão em modo desktop */}
      <ScrollLock disableScroll={isDesktop} />

      {/* Header com botão para alternar tema */}
      <Header toggleTheme={toggleTheme} />

      {/* Navegação lateral (anchor) sincronizada com seção ativa */}
      <Anchor activeSection={activeElement} />

      {/* Seções principais da página */}
      <Main />
      <About />
      <Projects />
      <Contact />
    </ThemeProvider>
  );
};

export default App;
