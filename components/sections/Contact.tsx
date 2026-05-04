import Button from "@/components/ui/Button";
import SquishyText from "@/components/animations/SquishyText";
import Footer from "./Footer";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="section-standard flex flex-col justify-center items-center gap-4">
      <h2 className="text-[clamp(3rem,6vw,5rem)] font-black text-foreground text-center">
        <SquishyText text="Entre em contato" className="justify-center" />
      </h2>

      <div className="flex gap-8 max-[767px]:gap-4">
        <Button
          as="a"
          href="mailto:gabrielnbs.dev@gmail.com?subject=Contato&body=Olá, Gabriel! Gostaria de entrar em contato com você."
          target="_blank"
          rel="noopener noreferrer"
          className="!bg-background flex items-center gap-2 [&:hover_svg]:animate-[shake_1s_linear_infinite]"
        >
          <FaEnvelope /> Mande um E-mail
        </Button>

        <Button
          as="a"
          href="https://www.linkedin.com/in/gabrielnascimento-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="!border-[#0077b5] !bg-[#0077b5] !text-white flex items-center gap-2 [&:hover_svg]:animate-[shake_1s_linear_infinite]"
        >
          <FaLinkedin /> LinkedIn
        </Button>
      </div>

      <Footer />
    </section>
  );
}
