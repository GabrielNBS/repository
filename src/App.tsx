import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GlobalStyle from './styles/GlobalStyle';
import Header from './Components/Header';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import darkTheme from './styles/themes/dark';
import lightTheme from './styles/themes/light';
import Hero from './Containers/Hero/Hero';
import Projects from './Containers/Projects/Projects';
import About from './Containers/About/About';
import Contact from './Containers/Contact';
import Anchor from './Components/Anchor';

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
  const [theme, setTheme] = useState(true);
  const [activeElement, setActiveElement] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(pointer: fine)').matches);

  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const activeIndexRef = useRef<number>(0);

  const currentTheme = theme ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
    setTimeout(() => AOS.refresh(), 300);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const handleResize = () => AOS.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [theme]);

  useEffect(() => {
    const updateIsDesktop = () => {
      const isNowDesktop = window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(isNowDesktop);
    };

    const mediaQuery = window.matchMedia('(pointer: fine)');
    mediaQuery.addEventListener('change', updateIsDesktop);

    updateIsDesktop();

    return () => mediaQuery.removeEventListener('change', updateIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const elements = document.querySelectorAll('main, section');
    sectionsRef.current = Array.from(elements) as HTMLElement[];

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

    const scrollToSection = (index: number) => {
      if (isScrolling.current || index < 0 || index >= sectionsRef.current.length) return;
      isScrolling.current = true;
      activeIndexRef.current = index;
      setActiveElement(index);
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling.current) return;
      if (event.deltaY > 30) {
        scrollToSection(activeIndexRef.current + 1);
      } else if (event.deltaY < -30) {
        scrollToSection(activeIndexRef.current - 1);
      }
    };

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

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDesktop]);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <ScrollLock disableScroll={isDesktop} />
      <Header toggleTheme={toggleTheme} />
      <Anchor activeSection={activeElement} />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </ThemeProvider>
  );
};

export default App;
