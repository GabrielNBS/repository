import PortfolioNav from './PortfolioNav';
import PortfolioFooter from './PortfolioFooter';
import AboutSection from '../sections/about/AboutSection';
import ContactSection from '../sections/contact/ContactSection';
import HeroSection from '../sections/hero/HeroSection';
import ManifestoSection from '../sections/manifesto/ManifestoSection';
import ProjectsSection from '../sections/projects/ProjectsSection';
import SkillsSection from '../sections/skills/SkillsSection';
import PortfolioExperience from './PortfolioExperience';

export default function PortfolioHome() {
  return (
    <PortfolioExperience>
      <PortfolioNav />
      <HeroSection />
      <ManifestoSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <PortfolioFooter />
    </PortfolioExperience>
  );
}
