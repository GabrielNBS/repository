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
  gallery: {
    desktop: ProjectGalleryItem[];
    mobile: ProjectGalleryItem[];
  };
  highlights: string[];
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  label: string;
}

export interface ProjectTeaserAsset {
  webm: string;
  mp4: string;
  poster: string;
  alt: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'regula',
    name: 'Regula',
    title: 'Dashboard e PDV',
    subtitle: 'Gestão operacional para comércio',
    summary: 'Dashboard administrativo e PDV com fluxos de estoque, caixa e precificação.',
    description:
      'Aplicação completa para operação comercial, com formulários multi-step, regras de negócio e visualização de dados para tomada de decisão.',
    problem:
      'Unificar o controle de estoque, vendas, preços e caixa em uma experiência clara para a operação diária.',
    solution:
      'Criei uma arquitetura em Next.js com componentes reutilizáveis, formulários tipados e estados globais previsíveis para reduzir fricção no uso.',
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
    gallery: {
      desktop: [
        {
          src: '/mockups/regula/desktop-01.png',
          alt: 'Dashboard do Regula com indicadores financeiros',
          label: 'Dashboard'
        },
        {
          src: '/mockups/regula/desktop-02.png',
          alt: 'Tela de estoque do Regula',
          label: 'Estoque'
        },
        {
          src: '/mockups/regula/desktop-03.png',
          alt: 'Tela de produtos do Regula',
          label: 'Produtos'
        }
      ],
      mobile: [
        {
          src: '/mockups/regula/mobile-01.png',
          alt: 'Dashboard do Regula em tela mobile',
          label: 'Dashboard'
        },
        {
          src: '/mockups/regula/mobile-02.png',
          alt: 'Tela de estoque do Regula em tela mobile',
          label: 'Estoque'
        },
        {
          src: '/mockups/regula/mobile-03.png',
          alt: 'Tela de produtos do Regula em tela mobile',
          label: 'Produtos'
        }
      ]
    },
    highlights: ['Fluxo de PDV', 'Controle financeiro', 'Formulários tipados']
  },
  {
    id: 2,
    slug: 'e-food',
    name: 'E-Food',
    title: 'Delivery responsivo',
    subtitle: 'Catálogo, carrinho e checkout',
    summary: 'Aplicação de delivery com catálogo, carrinho e validação de checkout.',
    description:
      'Experiência de compra responsiva com Redux para estado global, formulários controlados e arquitetura CSS-in-JS.',
    problem: 'Criar uma jornada de pedido objetiva, com carrinho persistente e checkout confiável.',
    solution:
      'Organizei a interface em componentes reutilizáveis, estado centralizado e validação com Formik e Yup.',
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
    gallery: {
      desktop: [
        {
          src: '/mockups/e-food/desktop-01.png',
          alt: 'Destaques de restaurantes do E-Food',
          label: 'Destaques'
        },
        {
          src: '/mockups/e-food/desktop-02.png',
          alt: 'Catálogo de restaurantes do E-Food',
          label: 'Restaurantes'
        },
        {
          src: '/mockups/e-food/desktop-03.png',
          alt: 'Cardápio de um restaurante no E-Food',
          label: 'Cardápio'
        }
      ],
      mobile: [
        {
          src: '/mockups/e-food/mobile-01.png',
          alt: 'Destaques de restaurantes do E-Food em tela mobile',
          label: 'Destaques'
        },
        {
          src: '/mockups/e-food/mobile-02.png',
          alt: 'Catálogo de restaurantes do E-Food em tela mobile',
          label: 'Restaurantes'
        },
        {
          src: '/mockups/e-food/mobile-03.png',
          alt: 'Cardápio de um restaurante no E-Food em tela mobile',
          label: 'Cardápio'
        }
      ]
    },
    highlights: ['Carrinho global', 'Checkout validado', 'Layout responsivo']
  },
  {
    id: 3,
    slug: 'e-play',
    name: 'E-Play',
    title: 'Streaming de jogos',
    subtitle: 'Vitrine digital responsiva',
    summary:
      'Interface para streaming de jogos com vitrine, filtros e experiência visual imersiva.',
    description:
      'Projeto focado em composição visual, responsividade e estado global para uma plataforma de jogos.',
    problem: 'Apresentar conteúdo denso de jogos sem perder navegação clara e impacto visual.',
    solution:
      'Usei componentes modulares, grid responsivo e Redux para manter a experiência fluida em diferentes telas.',
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
    gallery: {
      desktop: [
        {
          src: '/mockups/e-play/desktop-01.png',
          alt: 'Vitrine principal do E-Play',
          label: 'Vitrine'
        },
        {
          src: '/mockups/e-play/desktop-02.png',
          alt: 'Área de promoções do E-Play',
          label: 'Promoções'
        },
        {
          src: '/mockups/e-play/desktop-03.png',
          alt: 'Categorias de jogos do E-Play',
          label: 'Categorias'
        }
      ],
      mobile: [
        {
          src: '/mockups/e-play/mobile-01.png',
          alt: 'Vitrine principal do E-Play em tela mobile',
          label: 'Vitrine'
        },
        {
          src: '/mockups/e-play/mobile-02.png',
          alt: 'Área de promoções do E-Play em tela mobile',
          label: 'Promoções'
        },
        {
          src: '/mockups/e-play/mobile-03.png',
          alt: 'Categorias de jogos do E-Play em tela mobile',
          label: 'Categorias'
        }
      ]
    },
    highlights: ['Vitrine imersiva', 'Estado global', 'Mobile first']
  },
  {
    id: 4,
    slug: 'to-do',
    name: 'To-Do',
    title: 'Gestão de tarefas',
    subtitle: 'Produtividade simples',
    summary: 'Lista de tarefas com criação, edição, filtros e estado previsível.',
    description:
      'Aplicação de produtividade com foco em interação direta, estado via Redux e interface leve.',
    problem: 'Manter tarefas organizadas com ações rápidas e estados visuais claros.',
    solution:
      'Implementei CRUD de tarefas, filtros e feedback visual para tornar o fluxo simples em desktop e mobile.',
    role: 'Front-end e interações',
    year: '2024',
    techs: [{ name: 'JavaScript' }, { name: 'Redux' }, { name: 'CSS' }, { name: 'HTML' }],
    deploy: 'https://to-do-seven-gamma.vercel.app/',
    github: 'https://github.com/GabrielNBS/To-Do',
    gallery: {
      desktop: [
        {
          src: '/mockups/to-do/desktop-01.png',
          alt: 'Lista principal de tarefas do To-Do',
          label: 'Lista'
        },
        {
          src: '/mockups/to-do/desktop-02.png',
          alt: 'Filtros e contadores do To-Do',
          label: 'Filtros'
        },
        { src: '/mockups/to-do/desktop-03.png', alt: 'Edição de tarefa no To-Do', label: 'Edição' }
      ],
      mobile: [
        {
          src: '/mockups/to-do/mobile-01.png',
          alt: 'Lista principal de tarefas do To-Do em tela mobile',
          label: 'Lista'
        },
        {
          src: '/mockups/to-do/mobile-02.png',
          alt: 'Filtros e contadores do To-Do em tela mobile',
          label: 'Filtros'
        },
        {
          src: '/mockups/to-do/mobile-03.png',
          alt: 'Edição de tarefa no To-Do em tela mobile',
          label: 'Edição'
        }
      ]
    },
    highlights: ['CRUD completo', 'Filtros', 'Redux']
  },
  {
    id: 5,
    slug: 'spider-verse',
    name: 'Spider-Verse',
    title: 'Landing page promocional',
    subtitle: 'Narrativa visual e transições',
    summary: 'Landing page temática com composição visual forte e transições suaves.',
    description:
      'Página promocional criada com HTML, Sass e JavaScript, explorando ritmo visual e interatividade.',
    problem: 'Traduzir um universo visual forte em uma landing page responsiva e navegável.',
    solution:
      'Combinei Sass modular, composição por seções e interações discretas para reforçar a imersão sem comprometer a leitura.',
    role: 'Front-end e motion leve',
    year: '2024',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://lp-spiderverse.vercel.app/',
    github: 'https://github.com/GabrielNBS/LP_Miles_Morales',
    gallery: {
      desktop: [
        {
          src: '/mockups/spider-verse/desktop-01.png',
          alt: 'Hero da landing page Spider-Verse',
          label: 'Teaser'
        },
        {
          src: '/mockups/spider-verse/desktop-02.png',
          alt: 'Galeria da landing page Spider-Verse',
          label: 'Galeria'
        },
        {
          src: '/mockups/spider-verse/desktop-03.png',
          alt: 'Trailers da landing page Spider-Verse',
          label: 'Trailers'
        }
      ],
      mobile: [
        {
          src: '/mockups/spider-verse/mobile-01.png',
          alt: 'Hero da landing page Spider-Verse em tela mobile',
          label: 'Teaser'
        },
        {
          src: '/mockups/spider-verse/mobile-02.png',
          alt: 'Galeria da landing page Spider-Verse em tela mobile',
          label: 'Galeria'
        },
        {
          src: '/mockups/spider-verse/mobile-03.png',
          alt: 'Trailers da landing page Spider-Verse em tela mobile',
          label: 'Trailers'
        }
      ]
    },
    highlights: ['Sass modular', 'Transições', 'Composição visual']
  },
  {
    id: 6,
    slug: 'clone-disney',
    name: 'Clone Disney+',
    title: 'Interface de streaming',
    subtitle: 'Clone responsivo',
    summary: 'Clone responsivo da interface Disney+ com seções, carrosséis e navegação.',
    description:
      'Projeto de estudo para praticar composição, responsividade, Sass e interações em uma interface de streaming.',
    problem: 'Reproduzir uma experiência reconhecível mantendo uma boa estrutura front-end.',
    solution:
      'Modelei seções, carrosséis e estados de navegação com HTML, Sass e JavaScript modular.',
    role: 'Front-end e responsividade',
    year: '2024',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://clone-disneyplus-eta.vercel.app/',
    github: 'https://github.com/GabrielNBS/clone_disneyplus',
    gallery: {
      desktop: [
        {
          src: '/mockups/clone-disney/desktop-01.png',
          alt: 'Hero da interface Clone Disney+',
          label: 'Hero'
        },
        {
          src: '/mockups/clone-disney/desktop-02.png',
          alt: 'Planos da interface Clone Disney+',
          label: 'Planos'
        },
        {
          src: '/mockups/clone-disney/desktop-03.png',
          alt: 'Catálogo da interface Clone Disney+',
          label: 'Catálogo'
        }
      ],
      mobile: [
        {
          src: '/mockups/clone-disney/mobile-01.png',
          alt: 'Hero da interface Clone Disney+ em tela mobile',
          label: 'Hero'
        },
        {
          src: '/mockups/clone-disney/mobile-02.png',
          alt: 'Planos da interface Clone Disney+ em tela mobile',
          label: 'Planos'
        },
        {
          src: '/mockups/clone-disney/mobile-03.png',
          alt: 'Catálogo da interface Clone Disney+ em tela mobile',
          label: 'Catálogo'
        }
      ]
    },
    highlights: ['Streaming UI', 'Carrosséis', 'Sass']
  },
  {
    id: 7,
    slug: 'hoje-ta-doce',
    name: 'Hoje Tá Doce',
    title: 'Landing page comercial',
    subtitle: 'Confeitaria local',
    summary: 'Landing page responsiva para apresentar produtos, marca e canais de contato.',
    description:
      'Projeto comercial em HTML, JavaScript e Bootstrap, com foco em apresentação clara de produtos e conversão.',
    problem:
      'Criar presença digital objetiva para uma confeitaria com produtos de alto apelo visual.',
    solution:
      'Estruturei uma landing page responsiva com seções de produtos, informações e chamada para contato.',
    role: 'Front-end e landing page',
    year: '2024',
    techs: [{ name: 'JavaScript' }, { name: 'Bootstrap' }, { name: 'HTML' }],
    deploy: 'https://htd-land-page.vercel.app/',
    github: 'https://github.com/GabrielNBS/HTD-LandPage',
    gallery: {
      desktop: [
        {
          src: '/mockups/hoje-ta-doce/desktop-01.png',
          alt: 'Hero da landing page Hoje Tá Doce',
          label: 'Hero'
        },
        {
          src: '/mockups/hoje-ta-doce/desktop-02.png',
          alt: 'Seção de eventos da landing page Hoje Tá Doce',
          label: 'Eventos'
        },
        {
          src: '/mockups/hoje-ta-doce/desktop-03.png',
          alt: 'Cardápio da landing page Hoje Tá Doce',
          label: 'Cardápio'
        }
      ],
      mobile: [
        {
          src: '/mockups/hoje-ta-doce/mobile-01.png',
          alt: 'Hero da landing page Hoje Tá Doce em tela mobile',
          label: 'Hero'
        },
        {
          src: '/mockups/hoje-ta-doce/mobile-02.png',
          alt: 'Seção de eventos da landing page Hoje Tá Doce em tela mobile',
          label: 'Eventos'
        },
        {
          src: '/mockups/hoje-ta-doce/mobile-03.png',
          alt: 'Cardápio da landing page Hoje Tá Doce em tela mobile',
          label: 'Cardápio'
        }
      ]
    },
    highlights: ['Bootstrap', 'Produto local', 'Conversão']
  },
  {
    id: 8,
    slug: 'whatsapp-sender',
    name: 'WhatsApp Sender',
    title: 'Automação de mensageria',
    subtitle: 'Campanhas e disparos via WhatsApp Web',
    summary:
      'Serviço web para gerenciar contatos, campanhas, agendamentos e relatórios de envios pelo WhatsApp Web.',
    description:
      'Plataforma full-stack de uso local para conectar uma sessão do WhatsApp Web, organizar contatos e grupos, criar campanhas, agendar mensagens e acompanhar envio, leitura e respostas.',
    problem:
      'Operar campanhas pelo WhatsApp com controle de contatos, consentimento, agendamento e acompanhamento sem depender de fluxos manuais dispersos.',
    solution:
      'Estruturei um dashboard Next.js com arquitetura em camadas, persistência via Prisma e SQLite, fila e scheduler no servidor, integração com whatsapp-web.js, autenticação pessoal e APIs tipadas para separar domínio, infraestrutura e apresentação.',
    role: 'Full-stack, arquitetura e infraestrutura',
    year: '2026',
    techs: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Prisma' },
      { name: 'SQLite' },
      { name: 'whatsapp-web.js' },
      { name: 'Puppeteer' },
      { name: 'Tailwind CSS' },
      { name: 'Radix UI' },
      { name: 'Zustand' },
      { name: 'Vitest' }
    ],
    deploy: 'https://github.com/GabrielNBS/whatsapp-sender',
    github: 'https://github.com/GabrielNBS/whatsapp-sender',
    gallery: {
      desktop: [],
      mobile: []
    },
    highlights: [
      'Campanhas e fila de envio',
      'Contatos e consentimento',
      'Agendamento e relatórios'
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

const teaserAssets: Record<string, ProjectTeaserAsset> = {
  regula: {
    webm: '/videos/projects/regula.webm',
    mp4: '/videos/projects/regula.mp4',
    poster: '/videos/projects/regula-poster.webp',
    alt: 'Teaser do dashboard Regula navegando entre suas áreas operacionais'
  },
  'e-food': {
    webm: '/videos/projects/e-food.webm',
    mp4: '/videos/projects/e-food.mp4',
    poster: '/videos/projects/e-food-poster.webp',
    alt: 'Teaser do E-Food mostrando restaurantes e cardápio'
  },
  'e-play': {
    webm: '/videos/projects/e-play.webm',
    mp4: '/videos/projects/e-play.mp4',
    poster: '/videos/projects/e-play-poster.webp',
    alt: 'Teaser do E-Play mostrando vitrine e promoções de jogos'
  },
  'to-do': {
    webm: '/videos/projects/to-do.webm',
    mp4: '/videos/projects/to-do.mp4',
    poster: '/videos/projects/to-do-poster.webp',
    alt: 'Teaser do To-Do mostrando criação e organização de tarefas'
  },
  'spider-verse': {
    webm: '/videos/projects/spider-verse.webm',
    mp4: '/videos/projects/spider-verse.mp4',
    poster: '/videos/projects/spider-verse-poster.webp',
    alt: 'Teaser do Spider-Verse mostrando a narrativa visual da landing page'
  },
  'clone-disney': {
    webm: '/videos/projects/clone-disney.webm',
    mp4: '/videos/projects/clone-disney.mp4',
    poster: '/videos/projects/clone-disney-poster.webp',
    alt: 'Teaser do Clone Disney+ mostrando planos e catálogo'
  },
  'hoje-ta-doce': {
    webm: '/videos/projects/hoje-ta-doce.webm',
    mp4: '/videos/projects/hoje-ta-doce.mp4',
    poster: '/videos/projects/hoje-ta-doce-poster.webp',
    alt: 'Teaser do Hoje Tá Doce mostrando a confeitaria e seus produtos'
  }
};

export function getProjectTeaser(project: Project) {
  return teaserAssets[project.slug];
}

export default projects;
