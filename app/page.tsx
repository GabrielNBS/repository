"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import Header from "@/components/layout/Header";
import Anchor from "@/components/layout/Anchor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

export default function Home() {
  const [activeElement, setActiveElement] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const activeIndexRef = useRef<number>(0);

  // Detect desktop via pointer type
  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    const mediaQuery = window.matchMedia("(pointer: fine)");
    mediaQuery.addEventListener("change", updateIsDesktop);
    updateIsDesktop();
    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  // Section-based scroll navigation and snapping using GSAP (desktop only)
  useGSAP(() => {
    if (!isDesktop) {
      document.body.style.overflowY = "";
      return;
    }

    // Certifique-se de que a página pode rolar normalmente no desktop
    document.body.style.overflowY = "auto";
    document.body.style.scrollbarWidth = "none";

    const elements = gsap.utils.toArray("main, section") as HTMLElement[];
    sectionsRef.current = elements;

    const isDark = document.documentElement.classList.contains("dark");
    const defaultColor = isDark ? "#191716" : "#fffbf5";

    // ScrollTrigger para atualizar o menu ativo (Anchor) e alterar as cores organicamente
    elements.forEach((section, index) => {
      // 1. Atualizar menu ativo
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            activeIndexRef.current = index;
            setActiveElement(index);
          }
        },
      });

      // 2. Transição Orgânica (Scrub) de Cores de Fundo
      if (index > 0) {
        const bgColor = section.getAttribute("data-bg-color") || defaultColor;
        const prevSection = elements[index - 1];
        const prevBgColor = prevSection ? (prevSection.getAttribute("data-bg-color") || defaultColor) : defaultColor;

        gsap.fromTo(
          document.documentElement,
          { "--color-background": prevBgColor },
          {
            "--color-background": bgColor,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 65%", // Começa a transição quando a seção chega a 65% da altura da tela
              end: "top 35%",   // Termina a transição quando chega a 35%
              scrub: true,
              immediateRender: false,
            },
          }
        );
      }
    });

    // Configuração do Snap nativo do GSAP para as seções
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: "main, section",
        duration: { min: 0.2, max: 0.8 },
        delay: 0.1,
        ease: "power1.inOut",
      },
    });

    return () => {
      document.body.style.overflowY = "";
      document.body.style.scrollbarWidth = "";
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isDesktop]);

  return (
    <>
      <Header />
      <Anchor activeSection={activeElement} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <ScrollToTopButton />
    </>
  );
}
