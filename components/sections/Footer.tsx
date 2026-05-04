import Button from "@/components/ui/Button";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="flex justify-around items-center w-full absolute left-0 bottom-0 max-[767px]:flex-col-reverse max-[767px]:gap-4">
      <label className="text-fluid-xs font-semibold text-foreground opacity-50">
        © {getCurrentYear()} Gabriel Nascimento. Todos os direitos reservados.
      </label>

      <Button
        as="a"
        href="https://drive.google.com/file/d/1imdMjeR3JvDvgaC-wAOIj6a0K6yYu0O_/view?usp=drive_link"
        download
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Currículo"
        className="!bg-transparent !shadow-none flex items-center gap-2 mb-2 [&:hover_svg]:animate-[shake_1s_linear_infinite]"
      >
        <HiDocumentMagnifyingGlass />
        Currículo
      </Button>
    </footer>
  );
}
