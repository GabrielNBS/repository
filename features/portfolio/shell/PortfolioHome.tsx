'use client';

import { useRef } from 'react';
import PortfolioNav from './PortfolioNav';
import PortfolioFooter from './PortfolioFooter';
import ProjectAboutTransition from './transitions/ProjectAboutTransition';
import { ProjectCursorProvider } from '../projects/cursor/ProjectCursorProvider';
import { usePortfolioMotion } from './portfolioHomeMotion';
import AboutSection from '../sections/about/AboutSection';
import ContactSection from '../sections/contact/ContactSection';
import HeroSection from '../sections/hero/HeroSection';
import ManifestoSection from '../sections/manifesto/ManifestoSection';
import ProjectsSection from '../sections/projects/ProjectsSection';
import SkillsSection from '../sections/skills/SkillsSection';

export default function PortfolioHome() {
  const root = useRef<HTMLElement>(null);
  usePortfolioMotion(root);

  return (
    <ProjectCursorProvider>
      <main ref={root} className="overflow-x-clip focus:outline-none" tabIndex={-1}>
        <a
          className="bg-ink text-paper focus:outline-peach fixed top-3 left-1/2 z-100 -translate-x-1/2 translate-y-[-160%] rounded-full px-4 py-3 text-label font-extrabold tracking-[0.06em] uppercase transition-transform duration-200 focus:translate-y-0 focus:outline-3 focus:outline-offset-3"
          href="#hero-title"
        >
          Pular para o conteúdo
        </a>
        <PortfolioNav />
        <ProjectAboutTransition />
        <HeroSection />
        <ManifestoSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
        <PortfolioFooter />
      </main>
    </ProjectCursorProvider>
  );
}
