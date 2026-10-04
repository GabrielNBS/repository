import PortfolioNav from './PortfolioNav';
import PortfolioFooter from './PortfolioFooter';
import AboutSection from '../sections/about/AboutSection';
import ContactSection from '../sections/contact/ContactSection';
import HeroSection from '../sections/hero/HeroSection';
import HeroPaperEdge from '../sections/hero/HeroPaperEdge';
import ManifestoSection from '../sections/manifesto/ManifestoSection';
import ProjectsSection from '../sections/projects/ProjectsSection';
import SkillsSection from '../sections/skills/SkillsSection';
import PortfolioExperience from './PortfolioExperience';
import BackToTop from './BackToTop';

export default function PortfolioHome({ returnToProjects = false }: { returnToProjects?: boolean }) {
  return (
    <>
      <PortfolioExperience returnToProjects={returnToProjects}>
        <PortfolioNav />
        <HeroSection />
        <HeroPaperEdge />
        <ManifestoSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
        <PortfolioFooter />
      </PortfolioExperience>
      <BackToTop />
    </>
  );
}
