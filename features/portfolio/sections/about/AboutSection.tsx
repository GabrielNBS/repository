import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import AboutPortraitSequence from './AboutPortraitSequence';
import styles from './AboutSection.module.css';

const defaultTechnologies = ['React', 'Next.js', 'TypeScript', 'GSAP', 'Design Systems', 'CSS'];

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
        <p className={styles.eyebrow}>
          03 / Sobre
        </p>
        <HeadingSplit
          as="h2"
          id="about-title"
          className={styles.title}
          data-motion="text-split"
        >
          Código com olhar de direção.
        </HeadingSplit>
        <p className={styles.intro}>
          Sou Gabriel Nascimento, desenvolvedor front-end. Gosto de aproximar lógica e sensibilidade
          para transformar produtos digitais em experiências que fazem sentido.
        </p>
        <ul
          className={styles.technologies}
          aria-label="Tecnologias e especialidades"
        >
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
