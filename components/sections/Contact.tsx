import Button from '@/components/ui/Button';
import SquishyText from '@/components/animations/SquishyText';
import FadeInText from '@/components/animations/FadeInText';
import Footer from './Footer';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex relative w-full h-screen flex-col justify-center items-center gap-4 overflow-hidden"
    >
      <div className="max-w-4xl text-center px-4 z-10">
        <FadeInText>
          <span className="text-accent font-mono text-fluid-sm mb-4 block tracking-widest uppercase">
            Oportunidades
          </span>
        </FadeInText>

        <h2 className="text-fluid-2xl font-black text-foreground mb-6 leading-tight">
          <SquishyText text="Pronto para o próximo desafio?" className="justify-center" />
        </h2>

        <FadeInText>
          <p className="text-fluid-lg text-foreground/65 mb-12 leading-relaxed max-w-2xl mx-auto">
            Estou aberto a novas oportunidades e colaborações. Vamos discutir como minha expertise
            técnica pode impulsionar seu próximo projeto.
          </p>
        </FadeInText>

        <div className="flex gap-8 justify-center max-[767px]:flex-col max-[767px]:gap-4 items-center">
          <Button
            as="a"
            href="mailto:gabrielnbs.dev@gmail.com?subject=Contato&body=Olá, Gabriel! Gostaria de conversar sobre uma oportunidade."
            target="_blank"
            rel="noopener noreferrer"
            className="!bg-accent !text-white flex items-center gap-3 px-10 hover:scale-105 transition-transform shadow-xl"
          >
            <FaEnvelope className="text-xl" /> Mande um E-mail
          </Button>

          <Button
            as="a"
            href="https://www.linkedin.com/in/gabrielnascimento-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="!bg-transparent !border-foreground/20 flex items-center gap-3 px-10 hover:!border-accent transition-colors"
          >
            <FaLinkedin className="text-xl text-[#0077b5]" /> LinkedIn
          </Button>
        </div>
      </div>

      <Footer />
    </section>
  );
}
