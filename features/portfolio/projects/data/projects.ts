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
    problem: 'Criar uma jornada de pedido objetiva, com carrinho persistente e checkout confiavel.',
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
      'Interface para streaming de jogos com vitrine, filtros e experiencia visual imersiva.',
    description:
      'Projeto focado em composicao visual, responsividade e estado global para uma plataforma de jogos.',
    problem: 'Apresentar conteudo denso de jogos sem perder navegacao clara e impacto visual.',
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
    problem:
      'Criar presenca digital objetiva para uma confeitaria com produtos de alto apelo visual.',
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
    highlights: ['Bootstrap', 'Produto local', 'Conversao']
  },
  {
    id: 8,
    slug: 'whatsapp-sender',
    name: 'WhatsApp Sender',
    title: 'Automacao de mensageria',
    subtitle: 'Campanhas e disparos via WhatsApp Web',
    summary:
      'Servico web para gerenciar contatos, campanhas, agendamentos e relatorios de envios pelo WhatsApp Web.',
    description:
      'Plataforma full-stack de uso local para conectar uma sessao do WhatsApp Web, organizar contatos e grupos, criar campanhas, agendar mensagens e acompanhar envio, leitura e respostas.',
    problem:
      'Operar campanhas pelo WhatsApp com controle de contatos, consentimento, agendamento e acompanhamento sem depender de fluxos manuais dispersos.',
    solution:
      'Estruturei um dashboard Next.js com arquitetura em camadas, persistencia via Prisma e SQLite, fila e scheduler no servidor, integracao com whatsapp-web.js, autenticacao pessoal e APIs tipadas para separar dominio, infraestrutura e apresentacao.',
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
    isNew: true,
    mockups: {
      mobile: '/mockups/Mobile/Whatsapp-Sender-Mobile.png',
      tablet: '/mockups/Tablet/Whatsapp-Sender-Tablet.png',
      desktop: '/mockups/Desktop/Whatsapp-Sender-Desktop.png'
    },
    bgColor: '#052e1b',
    accent: '#25d366',
    gallery: {
      desktop: [],
      mobile: []
    },
    highlights: [
      'Campanhas e fila de envio',
      'Contatos e consentimento',
      'Agendamento e relatorios'
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export default projects;
