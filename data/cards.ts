export interface CardData {
  icon: 'code' | 'api' | 'rocket' | 'components';
  title: string;
  description: string;
}

const cards: CardData[] = [
  {
    icon: 'code',
    title: 'Desenvolvimento de Software',
    description:
      'Criacao de sites e aplicacoes web responsivas, com navegacao fluida e design moderno.'
  },
  {
    icon: 'api',
    title: 'Integracao com APIs e Gerenciamento',
    description:
      'Consumo e manipulacao de APIs REST e gerenciamento de estados globais em aplicacoes escalaveis.'
  },
  {
    icon: 'rocket',
    title: 'Performance e Otimizacao de Sites',
    description:
      'Implementacao de tecnicas para melhorar performance, carregamento de assets e SEO basico.'
  },
  {
    icon: 'components',
    title: 'Componentes UI e Design Personalizado',
    description:
      'Componentes reutilizaveis com foco em consistencia visual, acessibilidade e temas personalizados.'
  }
];

export default cards;
