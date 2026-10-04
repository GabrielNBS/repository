import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import GlareHover from '@/features/portfolio/shared/GlareHover';
import AboutPortraitSequence from './AboutPortraitSequence';
import styles from './AboutSection.module.css';

const defaultTechnologies = [
  'React',
  'Next.js',
  'TypeScript',
  'GSAP',
  'Design Systems',
  'Tailwind',
  'Cypress'
];

interface AboutSectionProps {
  technologies?: string[];
}

export default function AboutSection({ technologies = defaultTechnologies }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      className={styles.section}
      aria-labelledby="about-title"
      data-motion="about-section"
    >
      <AboutPortraitSequence />
      <div className={styles.copy}>
        <p className={styles.eyebrow}>03 / Sobre</p>
        <HeadingSplit as="h2" id="about-title" className={styles.title} data-motion="text-split">
          Um pouco sobre mim
        </HeadingSplit>
        <p className={styles.intro}>
          Já desenvolvi pessoas liderando equipes; hoje, desenvolvo sistemas com foco no front-end.
          Dessa trajetória, trouxe a escuta, a atenção aos processos e o hábito de entender um
          problema antes de propor uma solução.
        </p>
        <p className={styles.intro}>
          Na interface, esse cuidado se traduz em experiências claras, agradáveis e úteis para quem
          está do outro lado da tela. Gosto de unir atenção aos detalhes e código bem organizado,
          criando soluções que facilitem a rotina e possam evoluir com o projeto.
        </p>
        <ul className={styles.technologies} aria-label="Tecnologias e especialidades">
          {technologies.map((tech) => (
            <li key={tech}>
              <GlareHover className={styles.technology}>{tech}</GlareHover>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
