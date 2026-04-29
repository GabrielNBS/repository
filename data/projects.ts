export interface Project {
  id: number;
  name: string;
  title: string;
  description: string;
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
}

const projects: Project[] = [
  {
    id: 1,
    name: "Regula - Dashboard e PDV",
    mockups: {
      mobile: "/mockups/Mobile/Regula-Mobile.png",
      tablet: "/mockups/Tablet/Regula-Tablet.png",
      desktop: "/mockups/Desktop/Regula-Desktop.png",
    },
    title: "Regula - Dashboard e PDV",
    description:
      "Dashboard administrativo e PDV completo com arquitetura escalável em React e Context API. Apresenta interface refinada usando Radix UI, formulários multi-step complexos e visualização de dados interativa. Integra gestão financeira, controle granular de estoque e precificação inteligente, combinando regras de negócio robustas com uma experiência de usuário excepcional para tomada de decisão estratégica",
    techs: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind" },
      { name: "Radix UI" },
      { name: "Zod" },
      { name: "React Hook Form" },
      { name: "Context" },
    ],
    deploy: "https://regula-mocha.vercel.app/",
    github: "https://github.com/GabrielNBS/dashboard",
    isNew: true,
    bgColor: "#0f172a", // Slate dark
  },
  {
    id: 2,
    name: "EFood",
    mockups: {
      mobile: "/mockups/Mobile/Efood-Mobile.svg",
      tablet: "/mockups/Tablet/Efood-Tablet.svg",
      desktop: "/mockups/Desktop/Efood-Desktop.svg",
    },
    title: "E-Food",
    description:
      "Aplicação de delivery desenvolvida com React, utilizando tipagem forte com TypeScript e Styled-Components, seguindo as melhores práticas de CSS-in-JS. O gerenciamento de estado é realizado com Redux, eliminando o problema de prop-drilling, e o controle e validação de formulários são implementados com Formik e Yup.",
    techs: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Styled-Components" },
      { name: "Redux" },
    ],
    deploy: "https://efoodv2.vercel.app",
    github: "https://github.com/GabrielNBS/eFood",
    bgColor: "#450a0a", // Dark red
  },
  {
    id: 3,
    name: "EPlay",
    mockups: {
      mobile: "/mockups/Mobile/Eplay-Mobile.svg",
      tablet: "/mockups/Tablet/Eplay-Tablet.svg",
      desktop: "/mockups/Desktop/Eplay-Desktop.svg",
    },
    title: "E-Play",
    description:
      "Plataforma de streaming de jogos com interface responsiva desenvolvida com React, tipagem forte com TypeScript, Styled-Components empregando as melhores práticas de CSS-in-JS, Redux para gerenciamento de estado e evitar prop-drilling na aplicação, Formik para controle e validação de formulários e design pixel perfect a partir de base no Figma.",
    techs: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Styled-Components" },
      { name: "Redux" },
    ],
    deploy: "https://eplay-orpin-psi.vercel.app/",
    github: "https://github.com/GabrielNBS/eplay",
    bgColor: "#020617", // Slate 950
  },
  {
    id: 4,
    name: "ToDo",
    mockups: {
      mobile: "/mockups/Mobile/Todo-Mobile.svg",
      tablet: "/mockups/Tablet/Todo-Tablet.svg",
      desktop: "/mockups/Desktop/Todo-Desktop.svg",
    },
    title: "To-Do",
    description:
      "Lista de tarefas interativa e responsiva, desenvolvida com HTML, CSS e JavaScript, com um robusto gerenciamento de estado via Redux. A aplicação permite adicionar, editar, filtrar e excluir tarefas, proporcionando uma experiência de usuário dinâmica e intuitiva com uma interface limpa e design moderno.",
    techs: [
      { name: "JavaScript" },
      { name: "Redux" },
      { name: "Css" },
      { name: "HTML" },
    ],
    deploy: "https://to-do-seven-gamma.vercel.app/",
    github: "https://github.com/GabrielNBS/To-Do",
    bgColor: "#1c1917", // Stone 900
  },
  {
    id: 5,
    name: "Spider-Verse",
    mockups: {
      mobile: "/mockups/Mobile/Spiderverse-Mobile.svg",
      tablet: "/mockups/Tablet/Spiderverse-Tablet.svg",
      desktop: "/mockups/Desktop/Spiderverse-Desktop.svg",
    },
    title: "LP Spider-verse",
    description:
      "Página promocional do Spider-Verse, Desenvolvida com HTML, Sass para estilização avançada e modularizada, e JavaScript para adicionar interatividade. A página foi criada para oferecer uma experiência imersiva, explorando transições suaves e elementos gráficos que capturam a essência do multiverso.",
    techs: [{ name: "HTML" }, { name: "Sass" }, { name: "JavaScript" }],
    deploy: "https://lp-spiderverse.vercel.app/",
    github: "https://github.com/GabrielNBS/LP_Miles_Morales",
    bgColor: "#2a0000", // Deep dark red
  },
  {
    id: 6,
    name: "CloneDisney",
    mockups: {
      mobile: "/mockups/Mobile/Disney-Mobile.svg",
      tablet: "/mockups/Tablet/Disney-Tablet.svg",
      desktop: "/mockups/Desktop/Disney-Desktop.svg",
    },
    title: "Clone Disney +",
    description:
      "Clone responsivo da interface do Disney Plus, desenvolvido com HTML, Sass para um estilo moderno e reutilizável, e JavaScript para funcionalidades dinâmicas, como transições suaves, carrosséis interativos e navegação intuitiva. O projeto foca na experiência do usuário, proporcionando uma interface fluida e responsiva em diferentes telas.",
    techs: [{ name: "HTML" }, { name: "Sass" }, { name: "JavaScript" }],
    deploy: "https://clone-disneyplus-eta.vercel.app/",
    github: "https://github.com/GabrielNBS/clone_disneyplus",
    bgColor: "#00081c", // Disney blue
  },
  {
    id: 7,
    name: "HojeTaDoce",
    mockups: {
      mobile: "/mockups/Mobile/HTD-Mobile.svg",
      tablet: "/mockups/Tablet/HTD-Tablet.svg",
      desktop: "/mockups/Desktop/HTD-Desktop.svg",
    },
    title: "Hoje Ta Doce",
    description:
      "Landing page para uma confeitaria desenvolvida em HTML, JavaScript e Bootstrap, destacando produtos e serviços e utilizando todos os recursos do Bootstrap para estilização, responsividade e dinamismo da página.",
    techs: [
      { name: "JavaScript" },
      { name: "Bootstrap" },
      { name: "HTML" },
    ],
    deploy: "https://htd-land-page.vercel.app/",
    github: "https://github.com/GabrielNBS/HTD-LandPage",
    bgColor: "#3b1425", // Dark pink/brownish
  },
];

export default projects;
