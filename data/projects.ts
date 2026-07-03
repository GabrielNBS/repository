export interface Project {
  id: number;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  year: string;
  techs: { name: string }[];
  deploy: string;
  github: string;
  isNew?: boolean;
  mockups: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  bgColor: string;
  accent: string;
  gallery: string[];
  highlights: string[];
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'regula',
    name: 'Regula',
    title: 'Dashboard e PDV',
    subtitle: 'Gestao operacional para comercio',
    summary: 'Dashboard administrativo e PDV com fluxos de estoque, caixa e precificacao.',
    description:
      'Aplicacao full interface para operacao comercial, com formularios multi-step, regras de negocio e visualizacao de dados para tomada de decisao.',
    problem:
      'Unificar controle de estoque, vendas, precos e caixa em uma experiencia clara para operacao diaria.',
    solution:
      'Criei uma arquitetura em Next.js com componentes reutilizaveis, formularios tipados e estados globais previsiveis para reduzir friccao no uso.',
    role: 'Front-end, arquitetura de UI e estado',
    year: '2026',
    techs: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind' },
      { name: 'Radix UI' },
      { name: 'Zod' },
      { name: 'React Hook Form' },
      { name: 'Context' }
    ],
    deploy: 'https://regula-mocha.vercel.app/',
    github: 'https://github.com/GabrielNBS/dashboard',
    isNew: true,
    mockups: {
      mobile: '/mockups/Mobile/Regula-Mobile.png',
      tablet: '/mockups/Tablet/Regula-Tablet.png',
      desktop: '/mockups/Desktop/Regula-Desktop.png'
    },
    bgColor: '#0f172a',
    accent: '#94a3b8',
    gallery: [
      '/mockups/Desktop/Regula-Desktop.png',
      '/mockups/Tablet/Regula-Tablet.png',
      '/mockups/Mobile/Regula-Mobile.png'
    ],
    highlights: ['Fluxo de PDV', 'Controle financeiro', 'Formularios tipados']
  },
  {
    id: 2,
    slug: 'e-food',
    name: 'E-Food',
    title: 'Delivery responsivo',
    subtitle: 'Catalogo, carrinho e checkout',
    summary: 'Aplicacao de delivery com catalogo, carrinho e validacao de checkout.',
    description:
      'Experiencia de compra responsiva com Redux para estado global, formularios controlados e arquitetura CSS-in-JS.',
    problem:
      'Criar uma jornada de pedido objetiva, com carrinho persistente e checkout confiavel.',
    solution:
      'Organizei a interface em componentes reutilizaveis, estado centralizado e validacao com Formik e Yup.',
    role: 'Front-end e fluxo de compra',
    year: '2025',
    techs: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Styled-Components' },
      { name: 'Redux' }
    ],
    deploy: 'https://efoodv2.vercel.app',
    github: 'https://github.com/GabrielNBS/eFood',
    mockups: {
      mobile: '/mockups/Mobile/Efood-Mobile.png',
      tablet: '/mockups/Tablet/Efood-Tablet.png',
      desktop: '/mockups/Desktop/Efood-Desktop.png'
    },
    bgColor: '#450a0a',
    accent: '#f87171',
    gallery: [
      '/mockups/Desktop/Efood-Desktop.png',
      '/mockups/Tablet/Efood-Tablet.png',
      '/mockups/Mobile/Efood-Mobile.png'
    ],
    highlights: ['Carrinho global', 'Checkout validado', 'Layout responsivo']
  },
  {
    id: 3,
    slug: 'e-play',
    name: 'E-Play',
    title: 'Streaming de jogos',
    subtitle: 'Vitrine digital responsiva',
    summary: 'Interface para streaming de jogos com vitrine, filtros e experiencia visual imersiva.',
    description:
      'Projeto focado em composicao visual, responsividade e estado global para uma plataforma de jogos.',
    problem:
      'Apresentar conteudo denso de jogos sem perder navegacao clara e impacto visual.',
    solution:
      'Usei componentes modulares, grid responsivo e Redux para manter a experiencia fluida em diferentes telas.',
    role: 'Front-end e design de interface',
    year: '2025',
    techs: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Styled-Components' },
      { name: 'Redux' }
    ],
    deploy: 'https://eplay-orpin-psi.vercel.app/',
    github: 'https://github.com/GabrielNBS/eplay',
    mockups: {
      mobile: '/mockups/Mobile/Eplay-Mobile.png',
      tablet: '/mockups/Tablet/Eplay-Tablet.png',
      desktop: '/mockups/Desktop/Eplay-Desktop.png'
    },
    bgColor: '#020617',
    accent: '#38bdf8',
    gallery: [
      '/mockups/Desktop/Eplay-Desktop.png',
      '/mockups/Tablet/Eplay-Tablet.png',
      '/mockups/Mobile/Eplay-Mobile.png'
    ],
    highlights: ['Vitrine imersiva', 'Estado global', 'Mobile first']
  },
  {
    id: 4,
    slug: 'to-do',
    name: 'To-Do',
    title: 'Gestao de tarefas',
    subtitle: 'Produtividade simples',
    summary: 'Lista de tarefas com criacao, edicao, filtros e estado previsivel.',
    description:
      'Aplicacao de produtividade com foco em interacao direta, estado via Redux e interface leve.',
    problem: 'Manter tarefas organizadas com acoes rapidas e estados visuais claros.',
    solution:
      'Implementei CRUD de tarefas, filtros e feedback visual para tornar o fluxo simples em desktop e mobile.',
    role: 'Front-end e interacoes',
    year: '2024',
    techs: [{ name: 'JavaScript' }, { name: 'Redux' }, { name: 'CSS' }, { name: 'HTML' }],
    deploy: 'https://to-do-seven-gamma.vercel.app/',
    github: 'https://github.com/GabrielNBS/To-Do',
    mockups: {
      mobile: '/mockups/Mobile/Todo-Mobile.png',
      tablet: '/mockups/Tablet/Todo-Tablet.png',
      desktop: '/mockups/Desktop/Todo-Desktop.png'
    },
    bgColor: '#1c1917',
    accent: '#a8a29e',
    gallery: [
      '/mockups/Desktop/Todo-Desktop.png',
      '/mockups/Tablet/Todo-Tablet.png',
      '/mockups/Mobile/Todo-Mobile.png'
    ],
    highlights: ['CRUD completo', 'Filtros', 'Redux']
  },
  {
    id: 5,
    slug: 'spider-verse',
    name: 'Spider-Verse',
    title: 'Landing page promocional',
    subtitle: 'Narrativa visual e transicoes',
    summary: 'Landing page tematica com composicao visual forte e transicoes suaves.',
    description:
      'Pagina promocional criada com HTML, Sass e JavaScript, explorando ritmo visual e interatividade.',
    problem: 'Traduzir um universo visual forte em uma landing page responsiva e navegavel.',
    solution:
      'Combinei Sass modular, composicao por secoes e interacoes discretas para reforcar imersao sem comprometer leitura.',
    role: 'Front-end e motion leve',
    year: '2024',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://lp-spiderverse.vercel.app/',
    github: 'https://github.com/GabrielNBS/LP_Miles_Morales',
    mockups: {
      mobile: '/mockups/Mobile/Spiderverse-Mobile.png',
      tablet: '/mockups/Tablet/Spiderverse-Tablet.png',
      desktop: '/mockups/Desktop/Spiderverse-Desktop.png'
    },
    bgColor: '#2a0000',
    accent: '#ef4444',
    gallery: [
      '/mockups/Desktop/Spiderverse-Desktop.png',
      '/mockups/Tablet/Spiderverse-Tablet.png',
      '/mockups/Mobile/Spiderverse-Mobile.png'
    ],
    highlights: ['Sass modular', 'Transicoes', 'Composicao visual']
  },
  {
    id: 6,
    slug: 'clone-disney',
    name: 'Clone Disney+',
    title: 'Interface de streaming',
    subtitle: 'Clone responsivo',
    summary: 'Clone responsivo da interface Disney+ com secoes, carrosseis e navegacao.',
    description:
      'Projeto de estudo para praticar composicao, responsividade, Sass e interacoes em interface de streaming.',
    problem: 'Reproduzir uma experiencia reconhecivel mantendo boa estrutura front-end.',
    solution:
      'Modelei secoes, carrosseis e estados de navegacao com HTML, Sass e JavaScript modular.',
    role: 'Front-end e responsividade',
    year: '2024',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://clone-disneyplus-eta.vercel.app/',
    github: 'https://github.com/GabrielNBS/clone_disneyplus',
    mockups: {
      mobile: '/mockups/Mobile/Disney-Mobile.png',
      tablet: '/mockups/Tablet/Disney-Tablet.png',
      desktop: '/mockups/Desktop/Disney-Desktop.png'
    },
    bgColor: '#00081c',
    accent: '#60a5fa',
    gallery: [
      '/mockups/Desktop/Disney-Desktop.png',
      '/mockups/Tablet/Disney-Tablet.png',
      '/mockups/Mobile/Disney-Mobile.png'
    ],
    highlights: ['Streaming UI', 'Carrosseis', 'Sass']
  },
  {
    id: 7,
    slug: 'hoje-ta-doce',
    name: 'Hoje Ta Doce',
    title: 'Landing page comercial',
    subtitle: 'Confeitaria local',
    summary: 'Landing page responsiva para apresentar produtos, marca e canais de contato.',
    description:
      'Projeto comercial em HTML, JavaScript e Bootstrap, com foco em apresentacao clara de produtos e conversao.',
    problem: 'Criar presenca digital objetiva para uma confeitaria com produtos de alto apelo visual.',
    solution:
      'Estruturei uma landing page responsiva com secoes de produtos, informacoes e chamada para contato.',
    role: 'Front-end e landing page',
    year: '2024',
    techs: [{ name: 'JavaScript' }, { name: 'Bootstrap' }, { name: 'HTML' }],
    deploy: 'https://htd-land-page.vercel.app/',
    github: 'https://github.com/GabrielNBS/HTD-LandPage',
    mockups: {
      mobile: '/mockups/Mobile/HTD-Mobile.png',
      tablet: '/mockups/Tablet/HTD-Tablet.png',
      desktop: '/mockups/Desktop/HTD-Desktop.png'
    },
    bgColor: '#3b1425',
    accent: '#f9a8d4',
    gallery: [
      '/mockups/Desktop/HTD-Desktop.png',
      '/mockups/Tablet/HTD-Tablet.png',
      '/mockups/Mobile/HTD-Mobile.png'
    ],
    highlights: ['Bootstrap', 'Produto local', 'Conversao']
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export default projects;
