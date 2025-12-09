import HTD_Mobile from '../Image/Mockups/Mobile/HTD-Mobile.svg';
import HTD_Tablet from '../Image/Mockups/Tablet/HTD-Tablet.svg';
import HTD_Desktop from '../Image/Mockups/Desktop/HTD-Desktop.svg';

import Regula_Mobile from '../Image/Mockups/Mobile/Regula-Mobile.png';
import Regula_Tablet from '../Image/Mockups/Tablet/Regula-Tablet.png';
import Regula_Desktop from '../Image/Mockups/Desktop/Regula-Desktop.png';

import EPlay_Mobile from '../Image/Mockups/Mobile/Eplay-Mobile.svg';
import EPlay_Tablet from '../Image/Mockups/Tablet/Eplay-Tablet.svg';
import EPlay_Desktop from '../Image/Mockups/Desktop/Eplay-Desktop.svg';

import EFood_Mobile from '../Image/Mockups/Mobile/Efood-Mobile.svg';
import EFood_Tablet from '../Image/Mockups/Tablet/Efood-Tablet.svg';
import EFood_Desktop from '../Image/Mockups/Desktop/Efood-Desktop.svg';

import ToDo_Mobile from '../Image/Mockups/Mobile/Todo-Mobile.svg';
import ToDo_Tablet from '../Image/Mockups/Tablet/Todo-Tablet.svg';
import ToDo_Desktop from '../Image/Mockups/Desktop/Todo-Desktop.svg';

import SpiderVerse_Mobile from '../Image/Mockups/Mobile/Spiderverse-Mobile.svg';
import SpiderVerse_Tablet from '../Image/Mockups/Tablet/Spiderverse-Tablet.svg';
import SpiderVerse_Desktop from '../Image/Mockups/Desktop/Spiderverse-Desktop.svg';

import CloneDisney_Mobile from '../Image/Mockups/Mobile/Disney-Mobile.svg';
import CloneDisney_Tablet from '../Image/Mockups/Tablet/Disney-Tablet.svg';
import CloneDisney_Desktop from '../Image/Mockups/Desktop/Disney-Desktop.svg';

const projects = [
  {
    id: 1,
    name: 'Regula - Dashboard e PDV',
    mockups: {
      mobile: Regula_Mobile,
      tablet: Regula_Tablet,
      desktop: Regula_Desktop
    },
    title: 'Regula - Dashboard e PDV',
    description:
      'Dashboard administrativo e PDV completo com arquitetura escalável em React e Context API. Apresenta interface refinada usando Radix UI, formulários multi-step complexos e visualização de dados interativa. Integra gestão financeira, controle granular de estoque e precificação inteligente, combinando regras de negócio robustas com uma experiência de usuário excepcional para tomada de decisão estratégica',
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
    isNew: true
  },
  {
    id: 2,
    name: 'EFood',
    mockups: {
      mobile: EFood_Mobile,
      tablet: EFood_Tablet,
      desktop: EFood_Desktop
    },
    title: 'E-Food',
    description:
      'Aplicação de delivery desenvolvida com React, utilizando tipagem forte com TypeScript e Styled-Components, seguindo as melhores práticas de CSS-in-JS. O gerenciamento de estado é realizado com Redux, eliminando o problema de prop-drilling, e o controle e validação de formulários são implementados com Formik e Yup.',
    techs: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Styled-Components' },
      { name: 'Redux' }
    ],
    deploy: 'https://efoodv2.vercel.app',
    github: 'https://github.com/GabrielNBS/eFood'
  },
  {
    id: 3,
    name: 'EPlay',
    mockups: {
      mobile: EPlay_Mobile,
      tablet: EPlay_Tablet,
      desktop: EPlay_Desktop
    },
    title: 'E-Play',
    description:
      'Plataforma de streaming de jogos com interface responsiva desenvolvida com React, tipagem forte com TypeScript, Styled-Components empregando as melhores práticas de CSS-in-JS, Redux para gerenciamento de estado e evitar prop-drilling na aplicação, Formik para controle e validação de formulários e design pixel perfect a partir de base no Figma.',
    techs: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Styled-Components' },
      { name: 'Redux' }
    ],
    deploy: 'https://eplay-orpin-psi.vercel.app/',
    github: 'https://github.com/GabrielNBS/eplay'
  },

  {
    id: 4,
    name: 'ToDo',
    mockups: {
      mobile: ToDo_Mobile,
      tablet: ToDo_Tablet,
      desktop: ToDo_Desktop
    },
    title: 'To-Do',
    description:
      'Lista de tarefas interativa e responsiva, desenvolvida com HTML, CSS e JavaScript, com um robusto gerenciamento de estado via Redux. A aplicação permite adicionar, editar, filtrar e excluir tarefas, proporcionando uma experiência de usuário dinâmica e intuitiva com uma interface limpa e design moderno.',
    techs: [{ name: 'JavaScript' }, { name: 'Redux' }, { name: 'Css' }, { name: 'HTML' }],
    deploy: 'https://to-do-seven-gamma.vercel.app/',
    github: 'https://github.com/GabrielNBS/To-Do'
  },
  {
    id: 5,
    name: 'Spider-Verse',
    mockups: {
      mobile: SpiderVerse_Mobile,
      tablet: SpiderVerse_Tablet,
      desktop: SpiderVerse_Desktop
    },
    title: 'LP Spider-verse',
    description:
      'Página promocional do Spider-Verse, Desenvolvida com HTML, Sass para estilização avançada e modularizada, e JavaScript para adicionar interatividade. A página foi criada para oferecer uma experiência imersiva, explorando transições suaves e elementos gráficos que capturam a essência do multiverso.',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://lp-spiderverse.vercel.app/',
    github: 'https://github.com/GabrielNBS/LP_Miles_Morales'
  },
  {
    id: 6,
    name: 'CloneDisney',
    mockups: {
      mobile: CloneDisney_Mobile,
      tablet: CloneDisney_Tablet,
      desktop: CloneDisney_Desktop
    },
    title: 'Clone Disney +',
    description:
      'Clone responsivo da interface do Disney Plus, desenvolvido com HTML, Sass para um estilo moderno e reutilizável, e JavaScript para funcionalidades dinâmicas, como transições suaves, carrosséis interativos e navegação intuitiva. O projeto foca na experiência do usuário, proporcionando uma interface fluida e responsiva em diferentes telas.',
    techs: [{ name: 'HTML' }, { name: 'Sass' }, { name: 'JavaScript' }],
    deploy: 'https://clone-disneyplus-eta.vercel.app/',
    github: 'https://github.com/GabrielNBS/clone_disneyplus'
  },
  {
    id: 7,
    name: 'HojeTaDoce',
    mockups: {
      mobile: HTD_Mobile,
      tablet: HTD_Tablet,
      desktop: HTD_Desktop
    },
    title: 'Hoje Ta Doce',
    description:
      'Landing page para uma confeitaria desenvolvida em HTML, JavaScript e Bootstrap, destacando produtos e serviços e utilizando todos os recursos do Bootstrap para estilização, responsividade e dinamismo da página.',
    techs: [{ name: 'JavaScript' }, { name: 'Bootstrap' }, { name: 'HTML' }],
    deploy: 'https://htd-land-page.vercel.app/',
    github: 'https://github.com/GabrielNBS/HTD-LandPage'
  }
];

export default projects;
