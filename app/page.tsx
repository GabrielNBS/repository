'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import Header from '@/components/layout/Header';
import SocialNavBar from '@/components/ui/SocialNavBar';
import Anchor from '@/components/layout/Anchor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export default function Home() {
  const [activeElement, setActiveElement] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const activeIndexRef = useRef<number>(0);

  // Detect desktop via pointer type
  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches);
    };
    const mediaQuery = window.matchMedia('(pointer: fine)');
    mediaQuery.addEventListener('change', updateIsDesktop);
    updateIsDesktop();
    return () => mediaQuery.removeEventListener('change', updateIsDesktop);
  }, []);

  // Section-based scroll navigation and snapping using GSAP (desktop only)
  useGSAP(() => {
    if (!isDesktop) {
      document.body.style.overflowY = '';
      return;
    }

    document.body.style.overflowY = 'auto';
    document.body.style.scrollbarWidth = 'none';

    // 1. Seções Verticais (unidades de snap e background)
    const verticalSections = gsap.utils.toArray(
      '#home, #about, .project-section, #contact'
    ) as HTMLElement[];
    sectionsRef.current = verticalSections;

    verticalSections.forEach((section, index) => {
      // Atualizar menu ativo
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            activeIndexRef.current = index;
            setActiveElement(index);
          }
        }
      });
    });

    // 2. Configuração do Snap
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: (value) => value,
        duration: { min: 0.2, max: 0.8 },
        delay: 0.1,
        ease: 'power1.inOut'
      }
    });

    return () => {
      document.body.style.overflowY = '';
      document.body.style.scrollbarWidth = '';
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isDesktop]);

  return (
    <>
      <Header />
      <SocialNavBar />
      <Anchor activeSection={activeElement} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <ScrollToTopButton />
    </>
  );
}
