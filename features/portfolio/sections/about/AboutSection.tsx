import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import AboutPortraitSequence from './AboutPortraitSequence';

const defaultTechnologies = ['React', 'Next.js', 'TypeScript', 'GSAP', 'Design Systems', 'CSS'];

interface AboutSectionProps {
  technologies?: string[];
}

export default function AboutSection({ technologies = defaultTechnologies }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      className="bg-paper relative z-10 grid min-h-svh scroll-mt-24 grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)] items-center gap-[clamp(3rem,10vw,10rem)] px-[clamp(1.25rem,3vw,3.75rem)] py-20 max-[800px]:grid-cols-1 max-[800px]:content-center max-[800px]:justify-items-center max-[800px]:py-16 max-[480px]:py-14"
      aria-labelledby="about-title"
      data-motion="about-section"
    >
      <AboutPortraitSequence />
      <div className="max-w-2xl max-[800px]:order-first max-[800px]:mx-auto max-[800px]:text-center">
        <p className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-[''] max-[800px]:flex max-[800px]:justify-center">
          03 / Sobre
        </p>
        <HeadingSplit
          as="h2"
          id="about-title"
          className="text-about-title m-0 mt-4 mb-7 max-w-[10ch] leading-[0.87] font-normal -tracking-widest max-[800px]:mx-auto"
          data-motion="text-split"
        >
          Código com olhar de direção.
        </HeadingSplit>
        <p className="text-ink/85 text-intro m-0 max-w-124 leading-tight tracking-[-0.04em] max-[800px]:mx-auto">
          Sou Gabriel Nascimento, desenvolvedor front-end. Gosto de aproximar lógica e sensibilidade
          para transformar produtos digitais em experiências que fazem sentido.
        </p>
        <ul
          className="[&>li]:border-ink/15 [&>li]:text-muted [&>li]:text-label flex list-none flex-wrap gap-2 p-0 pt-8 [&>li]:rounded-full [&>li]:border [&>li]:px-3 [&>li]:py-2 [&>li]:font-bold [&>li]:tracking-wider [&>li]:uppercase max-[800px]:justify-center"
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
