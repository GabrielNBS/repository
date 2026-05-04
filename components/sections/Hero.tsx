import AnimatedText from '@/components/animations/AnimatedText';
import FadeInText from '@/components/animations/FadeInText';
import TypingLoop from '@/components/animations/TypingLoop';
import ScrollMouseIndicator from '@/components/ui/ScrollMouseIndicator';
import Button from '@/components/ui/Button';

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

      <div className="container px-6 md:px-12 flex flex-col gap-10 max-w-4xl max-[1023px]:text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-fluid-2xl font-black leading-tight text-foreground">
            <AnimatedText text="Olá, sou o Gabriel" />
          </h2>
          <FadeInText delay={0.4}>
            <h3 className="text-fluid-lg font-medium leading-relaxed text-foreground/70">
              Desenvolvedor front-end especializado em criar interfaces web intuitivas e
              responsivas, explorando as melhores práticas de{' '}
              <TypingLoop
                texts={[
                  'desenvolvimento.',
                  'performance.',
                  'UI/UX.',
                  'acessibilidade.',
                  'pixel-perfect.'
                ]}
              />
            </h3>
          </FadeInText>
        </div>
      </div>

      <ScrollMouseIndicator />
    </main>
  );
}
