import {
  LaptopCodeIcon,
  PuzzlePieceIcon,
  RocketIcon,
  ServerIcon,
} from '../assets/icons/icons'

const cards = [
  {
    icon: {
      iconSymbol: LaptopCodeIcon,
      iconBackground: '#B3E4F5',
      iconColor: '#fff',
    },
    title: 'Desenvolvimento de Software',
    description:
      'Criação de sites e aplicações web totalmente responsivas, com navegação fluida e design moderno.',
    background: '#DFF4FF',
  },
  {
    icon: {
      iconSymbol: ServerIcon,
      iconBackground: '#B3E6C8',
      iconColor: '#fff',
    },
    title: 'Integração com APIs e Gerenciamento',
    description:
      ' Consumo e manipulação de APIs REST e gerenciamento de estados globais em aplicações escaláveis.',
    background: '#E9F7EF',
  },
  {
    icon: {
      iconSymbol: RocketIcon,
      iconBackground: '#FFE599',
      iconColor: '#fff',
    },
    title: 'Performance e Otimização de Sites',
    description:
      'Implementação de técnicas para melhorar a performance, como carregamento assíncrono, otimização de assets e SEO básico.',
    background: '#FFF9CC',
  },
  {
    icon: {
      iconSymbol: PuzzlePieceIcon,
      iconBackground: '#CFCBFF',
      iconColor: '#fff',
    },
    title: 'Componentes UI e Design Personalizado',
    description:
      ' Desenvolvimento de bibliotecas de componentes reutilizáveis com foco em consistência visual e acessibilidade, além de temas personalizados (dark mode, etc.).',
    background: '#F5F3FF',
  },
]

export default cards
