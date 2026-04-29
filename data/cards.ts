import {
  FaLaptopCode,
  FaPuzzlePiece,
  FaServer,
  FaRocket,
} from "react-icons/fa";
import { IconType } from "react-icons";

export interface CardData {
  icon: IconType;
  title: string;
  description: string;
}

const cards: CardData[] = [
  {
    icon: FaLaptopCode,
    title: "Desenvolvimento de Software",
    description:
      "Criação de sites e aplicações web totalmente responsivas, com navegação fluida e design moderno.",
  },
  {
    icon: FaServer,
    title: "Integração com APIs e Gerenciamento",
    description:
      "Consumo e manipulação de APIs REST e gerenciamento de estados globais em aplicações escaláveis.",
  },
  {
    icon: FaRocket,
    title: "Performance e Otimização de Sites",
    description:
      "Implementação de técnicas para melhorar a performance, como carregamento assíncrono, otimização de assets e SEO básico.",
  },
  {
    icon: FaPuzzlePiece,
    title: "Componentes UI e Design Personalizado",
    description:
      "Desenvolvimento de bibliotecas de componentes reutilizáveis com foco em consistência visual e acessibilidade, além de temas personalizados (dark mode, etc.).",
  },
];

export default cards;
