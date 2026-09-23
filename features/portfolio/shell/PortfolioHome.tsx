'use client';

import { useRef } from 'react';
import PortfolioNav from './PortfolioNav';
import PortfolioFooter from './PortfolioFooter';
import { ProjectCursorProvider } from '../projects/cursor/ProjectCursorProvider';
import { usePortfolioMotion } from './portfolioHomeMotion';
import AboutSection from '../sections/about/AboutSection';
import ContactSection from '../sections/contact/ContactSection';
import HeroSection from '../sections/hero/HeroSection';
import ManifestoSection from '../sections/manifesto/ManifestoSection';
import ProjectsSection from '../sections/projects/ProjectsSection';
import SkillsSection from '../sections/skills/SkillsSection';
import TransitionCascade from '../sections/transition/TransitionCascade';
import styles from './PortfolioHome.module.css';

export default function PortfolioHome() {
  const root = useRef<HTMLElement>(null);
  usePortfolioMotion(root);

  return (
    <ProjectCursorProvider>
      <main ref={root} className={styles.main} tabIndex={-1}>
        <a
          className={styles.skipLink}
          href="#hero-title"
        >
          Pular para o conteúdo
        </a>
        <PortfolioNav />
        <HeroSection />
        <TransitionCascade />
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
