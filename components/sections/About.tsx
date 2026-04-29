import {
  SiNextdotjs,
  SiRedux,
  SiTypescript,
  SiStyledcomponents,
  SiTailwindcss,
  SiSass,
  SiPostman,
  SiGit,
} from "react-icons/si";
import { FaReact, FaNodeJs } from "react-icons/fa";
import cards from "@/data/cards";
import Card from "@/components/ui/Card";
import TechSpan from "@/components/ui/TechSpan";

const techs = [
  { icon: <SiNextdotjs size={20} />, name: "Next.js" },
  { icon: <SiRedux size={20} />, name: "Redux" },
  { icon: <SiTypescript size={20} />, name: "TypeScript" },
  { icon: <FaReact size={20} />, name: "React.js" },
  { icon: <SiStyledcomponents size={20} />, name: "Styled-Components" },
  { icon: <SiTailwindcss size={20} />, name: "Tailwind" },
  { icon: <SiSass size={20} />, name: "Sass" },
  { icon: <SiPostman size={20} />, name: "Rest" },
  { icon: <FaNodeJs size={20} />, name: "Node.js" },
  { icon: <SiGit size={20} />, name: "Git" },
];

export default function About() {
  return (
    <section
      className="grid grid-cols-2 h-screen w-full px-16 gap-4
      max-[1023px]:flex max-[1023px]:h-auto max-[1023px]:flex-col max-[1023px]:p-0 max-[1023px]:justify-center"
    >
      {/* Description side */}
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="max-[1023px]:text-center max-[1023px]:[&_p]:px-2">
          <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold leading-relaxed text-foreground">
            Como eu te ajudo?
          </h2>
          <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] font-medium text-accent mb-4">
            ✨ Tudo começa com uma necessidade
          </h3>
          <p className="text-[clamp(1rem,2.5vw,1.125rem)] leading-relaxed text-foreground">
            Eu a transformo em interfaces que conectam, inspiram e entregam
            resultados. Combinando tecnologia e design, crio experiências
            digitais que fazem a diferença utilizando tecnologias modernas como:
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
              <TechSpan key={`dup-${index}`}>
                {tech.icon}
                {tech.name}
              </TechSpan>
            ))}
          </ul>
        </div>
      </div>

      {/* Cards side */}
      <div className="card-container grid grid-cols-2 gap-4 py-4 cursor-pointer
        max-[767px]:flex max-[767px]:overflow-x-scroll max-[767px]:p-0 max-[767px]:[&>div]:h-[500px] max-[767px]:[&>div]:w-[90%] max-[767px]:[&>div]:shrink-0 max-[767px]:[&>div]:mb-4
        max-[1023px]:flex max-[1023px]:overflow-x-scroll max-[1023px]:items-center max-[1023px]:[&>div]:h-[400px] max-[1023px]:[&>div]:w-[300px] max-[1023px]:[&>div]:shrink-0 max-[1023px]:[&>div]:mb-4"
      >
        <style>{`
          .card-container > div {
            transition: filter 0.5s ease-in-out;
          }
          @media (hover: hover) and (pointer: fine) {
            .card-container:has(> div:hover) > div {
              filter: opacity(0.3) blur(3px);
            }
          }
          .card-container:has(> div:hover) > div:hover {
            filter: opacity(1);
            transition: filter 0.3s ease-in-out;
          }
          .card-container:has(> div:hover) > div:hover .cardIcon {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
        {cards.map((card, index) => (
          <Card
            key={index}
            delay={`${index * 1}s`}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}
