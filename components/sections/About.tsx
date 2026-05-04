import {
  SiNextdotjs,
  SiRedux,
  SiTypescript,
  SiStyledcomponents,
  SiTailwindcss,
  SiSass,
  SiPostman,
  SiGit
} from 'react-icons/si';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import TechSpan from '@/components/ui/TechSpan';

const techs = [
  { icon: <SiNextdotjs size={20} />, name: 'Next.js' },
  { icon: <SiRedux size={20} />, name: 'Redux' },
  { icon: <SiTypescript size={20} />, name: 'TypeScript' },
  { icon: <FaReact size={20} />, name: 'React.js' },
  { icon: <SiStyledcomponents size={20} />, name: 'Styled-Components' },
  { icon: <SiTailwindcss size={20} />, name: 'Tailwind' },
  { icon: <SiSass size={20} />, name: 'Sass' },
  { icon: <SiPostman size={20} />, name: 'Rest' },
  { icon: <FaNodeJs size={20} />, name: 'Node.js' },
  { icon: <SiGit size={20} />, name: 'Git' }
];

export default function About() {
  return (
    <section
      className="container flex h-screen w-full px-16 gap-4
      max-[1023px]:flex max-[1023px]:h-auto max-[1023px]:flex-col max-[1023px]:p-0 max-[1023px]:justify-center"
    >
      {/* Description side */}
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="max-[1023px]:text-center max-[1023px]:[&_p]:px-2">
          <span className="text-fluid-sm font-semibold uppercase tracking-widest text-accent">
            ✨ Sobre mim
          </span>
          <h2 className="text-fluid-2xl font-black leading-tight text-foreground mt-2 mb-4">
            Quem está por trás<br className="max-[1023px]:hidden" /> do código
          </h2>
          <p className="text-fluid-base leading-relaxed text-foreground/75">
            Sou desenvolvedor front-end apaixonado por transformar ideias em
            <strong className="text-foreground font-semibold"> experiências digitais que conectam e inspiram</strong>.
            Busco unir <strong className="text-accent font-semibold">design</strong> e
            <strong className="text-accent font-semibold"> performance</strong> em cada projeto,
            sempre com atenção aos detalhes e foco no usuário.
          </p>
          <p className="text-fluid-sm leading-relaxed text-foreground/50 mt-4 uppercase tracking-wider font-medium">
            Tecnologias que domino
          </p>
        </div>

        {/* Techs list */}
        <div className="overflow-hidden py-4 w-full relative">
          <ul
            className="flex gap-4 flex-wrap overflow-wrap-break-word
            max-[1023px]:flex-nowrap max-[1023px]:w-max max-[1023px]:animate-[scroll-horizontal_15s_linear_infinite]
            max-[1023px]:opacity-40 max-[1023px]:mb-8"
          >
            {techs.map((tech, index) => (
              <TechSpan key={index}>
                {tech.icon}
                {tech.name}
              </TechSpan>
            ))}
            {/* Duplicate for infinite scroll on mobile */}
            {techs.map((tech, index) => (
              <TechSpan key={`dup-${index}`} className="hidden max-[1023px]:flex">
                {tech.icon}
                {tech.name}
              </TechSpan>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
