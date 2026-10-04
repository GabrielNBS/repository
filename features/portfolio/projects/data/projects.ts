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
  outcome: string;
  role: string;
  year: string;
  techs: { name: string }[];
  deploy: string;
  github: string;
  highlights: string[];
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
      'Organizar a rotina de um comércio em uma única interface, conectando estoque de ingredientes, produção, vendas e caixa. O desafio envolvia representar regras de rendimento e precificação, como aplicação de taxas e cálculo de margens, sem tornar os cadastros difíceis de preencher ou os indicadores financeiros difíceis de interpretar.',
    solution:
      'Desenvolvi um dashboard e um PDV em Next.js e TypeScript, com componentes reutilizáveis e uma interface consistente baseada em Tailwind e Radix UI. Os cadastros usam React Hook Form e validação de schemas, com etapas, navegação condicional e salvamento de progresso. A Context API sincroniza os módulos, o localStorage preserva dados do usuário e os gráficos em Recharts ajudam a acompanhar vendas, indicadores e histórico de transações.',
    outcome:
      'O projeto reúne controle de estoque, precificação, operação de vendas e acompanhamento financeiro em uma experiência integrada. Além dos cadastros com regras de negócio, oferece gráficos interativos e relatórios exportáveis para apoiar a leitura dos dados. Foi uma oportunidade de aprofundar a organização de estado, a validação de fluxos complexos e o uso de feedback visual para orientar cada ação.',
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
    problem:
      'Construir uma jornada de delivery que acompanhasse o usuário da escolha do restaurante até a conclusão do pedido. Era preciso manter o carrinho sincronizado durante a navegação e organizar os dados de entrega e pagamento em etapas claras, com validações que ajudassem a corrigir o preenchimento também em telas pequenas.',
    solution:
      'Estruturei a aplicação em React com componentes reutilizáveis e estilos em Styled-Components. O Redux centraliza o estado do carrinho e do pedido, enquanto os formulários com Formik organizam o checkout em múltiplas etapas. A validação e as máscaras de entrada orientam o preenchimento dos campos, e o layout responsivo adapta catálogo, cardápio e fluxo de compra a desktop e celular.',
    outcome:
      'A aplicação permite explorar restaurantes, consultar seus cardápios, montar um carrinho e seguir pelo checkout com dados validados. O trabalho consolidou a combinação de estado global, formulários e componentes modulares em um fluxo de compra contínuo, com uma estrutura que facilita a manutenção e a evolução da interface.',
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
    highlights: ['Carrinho global', 'Checkout validado', 'Layout responsivo']
  },
  {
    id: 3,
    slug: 'e-play',
    name: 'E-Play',
    title: 'E-commerce de jogos',
    subtitle: 'Vitrine digital responsiva',
    summary:
      'E-commerce de jogos com catálogo, promoções, carrinho e checkout integrado a uma API REST.',
    description:
      'Loja de jogos em React e TypeScript, com catálogo integrado a uma API REST, estado global via Redux Toolkit e fluxo de compra com formulários validados.',
    problem:
      'Criar uma loja de jogos que combinasse uma vitrine visualmente marcante com um fluxo completo de compra. Além de apresentar categorias, promoções e detalhes dos títulos, o desafio era integrar catálogo e pedidos a uma API REST e manter carrinho e formulários consistentes ao longo da navegação, em desktop e mobile.',
    solution:
      'Implementei uma SPA em React e TypeScript, com componentes modulares e Styled-Components para organizar a apresentação do catálogo. O Redux Toolkit mantém o estado global do fluxo de compra, e o checkout usa Formik e Yup para validar os formulários de forma condicional. A integração com a API REST conecta catálogo e pedidos, enquanto lazy loading e code splitting distribuem o carregamento da aplicação.',
    outcome:
      'O resultado é um e-commerce de jogos com vitrine, categorias, promoções e uma jornada de compra integrada ao catálogo e aos pedidos da API. O projeto aprofundou minha prática com integração de serviços, gerenciamento de estado e validação de formulários, além de estratégias de carregamento para manter a navegação fluida em diferentes dispositivos.',
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
    problem:
      'Oferecer uma forma direta de organizar tarefas sem exigir uma sequência longa de ações para cada alteração. O desafio era manter criação, edição, exclusão e filtros fáceis de encontrar, com estados visuais que ajudassem a entender a lista e acompanhar as mudanças durante o uso.',
    solution:
      'Implementei o CRUD de tarefas e organizei o estado com Redux para refletir as alterações de forma consistente na interface. Os filtros permitem consultar a lista conforme a necessidade, e os contadores e o feedback visual ajudam a acompanhar sua organização. A apresentação se adapta a desktop e celular, mantendo as ações de gerenciamento acessíveis nos dois formatos.',
    outcome:
      'A aplicação reúne criação, consulta, edição e exclusão de tarefas, com filtros e contadores para facilitar a organização da rotina. O projeto serviu para aprofundar a relação entre ações, estado global e atualização da interface, trabalhando interações simples que precisam responder de maneira clara e previsível.',
    role: 'Front-end e interações',
    year: '2024',
    techs: [{ name: 'JavaScript' }, { name: 'Redux' }, { name: 'CSS' }, { name: 'HTML' }],
    deploy: 'https://to-do-seven-gamma.vercel.app/',
    github: 'https://github.com/GabrielNBS/To-Do',
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
    problem:
      'Transformar a identidade visual do universo Spider-Verse em uma página promocional com personalidade e navegação clara. O desafio era combinar imagens, galeria e trailers em uma composição envolvente, preservando a leitura e a organização das seções quando o espaço disponível muda entre desktop e celular.',
    solution:
      'Construí a landing page com HTML, Sass e JavaScript, dividindo o conteúdo em seções que conduzem a exploração do tema. O Sass modular organiza os estilos e as adaptações responsivas, enquanto as transições e interações reforçam o ritmo visual da página. A composição dá destaque ao teaser, à galeria e aos trailers sem perder a hierarquia das informações.',
    outcome:
      'O resultado é uma landing page temática que apresenta o universo visual do projeto por meio de imagens, galeria e trailers. O desenvolvimento ampliou minha prática com composição de páginas, organização de estilos em Sass e uso de interatividade para criar uma experiência imersiva e legível em diferentes tamanhos de tela.',
    role: 'Front-end e motion leve',
    year: '2024',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://lp-spiderverse.vercel.app/',
    github: 'https://github.com/GabrielNBS/LP_Miles_Morales',
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
    problem:
      'Reproduzir a apresentação da Disney+ em uma página responsiva, preservando a hierarquia visual de uma interface reconhecível. Era preciso organizar o destaque inicial, os planos e o catálogo para que o visitante pudesse explorar o conteúdo e entender a proposta da página tanto no computador quanto no celular.',
    solution:
      'Estruturei a interface com HTML, Sass e JavaScript, organizando as seções e os estilos de forma modular. A composição reúne hero, planos e catálogo, com interações e estados de navegação para explorar os conteúdos. As adaptações responsivas ajustam a distribuição dos elementos e a leitura conforme o tamanho da tela.',
    outcome:
      'O projeto entrega um estudo de interface inspirado na Disney+, com apresentação de conteúdo, planos e navegação responsiva. A implementação ajudou a consolidar a tradução de uma referência visual para código, a reutilização de estilos e a atenção à hierarquia e ao comportamento dos elementos em diferentes dispositivos.',
    role: 'Front-end e responsividade',
    year: '2024',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://clone-disneyplus-eta.vercel.app/',
    github: 'https://github.com/GabrielNBS/clone_disneyplus',
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
      'Criar uma presença digital para uma confeitaria local, apresentando a marca e seus produtos de maneira convidativa. O desafio era aproveitar o apelo visual dos doces e organizar informações sobre cardápio, eventos e contato em uma página fácil de consultar, especialmente para quem chega pelo celular.',
    solution:
      'Desenvolvi uma landing page com HTML, JavaScript e Bootstrap, usando seções dedicadas à apresentação da confeitaria, aos eventos e ao cardápio. A estrutura responsiva dá destaque aos produtos e às chamadas para contato. O fluxo de desenvolvimento também utiliza automações com Gulp e compressão de imagens para preparar os arquivos da página e favorecer o carregamento.',
    outcome:
      'A página reúne a apresentação da marca, os produtos e os canais de contato em um ponto de entrada para o negócio. O projeto trouxe prática na construção de uma interface comercial focada em conversão, combinando conteúdo visual, responsividade e preparação de assets para uma experiência de navegação mais leve.',
    role: 'Front-end e landing page',
    year: '2024',
    techs: [{ name: 'JavaScript' }, { name: 'Bootstrap' }, { name: 'HTML' }],
    deploy: 'https://htd-land-page.vercel.app/',
    github: 'https://github.com/GabrielNBS/HTD-LandPage',
    highlights: ['Bootstrap', 'Produto local', 'Conversão']
  },
  {
    id: 8,
    slug: 'whatsapp-sender',
    name: 'W. Sender',
    title: 'Automação de mensageria',
    subtitle: 'Campanhas e disparos via WhatsApp Web',
    summary:
      'Serviço web para gerenciar contatos, campanhas, agendamentos e relatórios de envios pelo WhatsApp Web.',
    description:
      'Plataforma full-stack de uso local para conectar uma sessão do WhatsApp Web, organizar contatos e grupos, criar campanhas, agendar mensagens e acompanhar envio, leitura e respostas.',
    problem:
      'Centralizar uma operação de mensagens que envolve contatos, grupos, campanhas e horários de envio, evitando que cada etapa dependa de controles manuais separados. Além de manter a conexão com o WhatsApp Web, era necessário acompanhar falhas, leituras e respostas, registrar consentimento e respeitar os pedidos de cancelamento dos destinatários.',
    solution:
      'Desenvolvi uma aplicação full-stack em Next.js e TypeScript, com conexão ao WhatsApp Web via whatsapp-web.js e Puppeteer. O painel permite organizar e importar contatos, criar grupos e modelos de mensagem com mídia, iniciar campanhas e agendar envios. Prisma e SQLite persistem os dados, enquanto a fila e o agendador executam o trabalho no servidor. A arquitetura separa regras de negócio, APIs, infraestrutura e interface, com acesso por chave pessoal e tratamento centralizado de consentimento e cancelamento.',
    outcome:
      'A aplicação de uso local reúne a preparação das mensagens, a execução das campanhas e a consulta de resultados em um único painel. É possível acompanhar envios, falhas, leituras e respostas, consultar o histórico e configurar relatórios para destinatários definidos. O projeto ampliou minha atuação em persistência, integração com serviços externos e processamento no servidor, incluindo auditoria de consentimento e recuperação controlada de agendamentos após reiniciar o serviço.',
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
