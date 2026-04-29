import SocialNavBar from "@/components/ui/SocialNavBar";
import AnimatedText from "@/components/animations/AnimatedText";
import FadeInText from "@/components/animations/FadeInText";
import TypingLoop from "@/components/animations/TypingLoop";
import ScrollMouseIndicator from "@/components/ui/ScrollMouseIndicator";

export default function Hero() {
  return (
    <main id="home" className="flex h-dvh items-center relative">
      <span
        className="absolute text-transparent text-[104px] [writing-mode:vertical-lr]
        [-webkit-text-stroke:2px_var(--color-shadow-tertiary)] pointer-events-none right-[50px] top-[1em]
        max-[767px]:text-[4rem]"
      >
        真由美と沙織
      </span>

      <div className="container max-[767px]:w-[90%] max-[767px]:text-center max-[1023px]:w-[90%] max-[1023px]:text-center">
        <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-relaxed text-foreground">
          <AnimatedText text="Olá, sou o Gabriel" />
        </h2>

        <FadeInText>
          <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] font-medium leading-relaxed text-foreground">
            Crio interfaces intuitivas e responsivas, explorando as melhores
            práticas de:
          </h3>
        </FadeInText>

        <strong className="block text-accent">
          <TypingLoop
            texts={[
              "desenvolvimento.",
              "performance.",
              "UI/UX.",
              "acessibilidade.",
            ]}
          />
        </strong>

        <SocialNavBar />
      </div>

      <ScrollMouseIndicator />
    </main>
  );
}
