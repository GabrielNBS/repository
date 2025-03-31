import { FaReact } from 'react-icons/fa'
import HTD_Mobile from '../Image/Mockups/Mobile/HTD-Mobile.svg'
import HTD_Tablet from '../Image/Mockups/Tablet/HTD-Tablet.svg'
import HTD_Desktop from '../Image/Mockups/Desktop/HTD-Desktop.svg'

import EPlay_Mobile from '../Image/Mockups/Mobile/Eplay-Mobile.svg'
import EPlay_Tablet from '../Image/Mockups/Tablet/Eplay-Tablet.svg'
import EPlay_Desktop from '../Image/Mockups/Desktop/Eplay-Desktop.svg'

import EFood_Mobile from '../Image/Mockups/Mobile/Efood-Mobile.svg'
import EFood_Tablet from '../Image/Mockups/Tablet/Efood-Tablet.svg'
import EFood_Desktop from '../Image/Mockups/Desktop/Efood-Desktop.svg'

import ToDo_Mobile from '../Image/Mockups/Mobile/Todo-Mobile.svg'
import ToDo_Tablet from '../Image/Mockups/Tablet/Todo-Tablet.svg'
import ToDo_Desktop from '../Image/Mockups/Desktop/Todo-Desktop.svg'

import SpiderVerse_Mobile from '../Image/Mockups/Mobile/Spiderverse-Mobile.svg'
import SpiderVerse_Tablet from '../Image/Mockups/Tablet/Spiderverse-Tablet.svg'
import SpiderVerse_Desktop from '../Image/Mockups/Desktop/Spiderverse-Desktop.svg'

import CloneDisney_Mobile from '../Image/Mockups/Mobile/Disney-Mobile.svg'
import CloneDisney_Tablet from '../Image/Mockups/Tablet/Disney-Tablet.svg'
import CloneDisney_Desktop from '../Image/Mockups/Desktop/Disney-Desktop.svg'

import {
  BootstrapIcon,
  ReactIcon,
  ReduxIcon,
  StyledComponentsIcon,
  TypeScriptIcon,
  CssIcon,
  HtmlIcon,
  JavaScriptIcon,
  SassIcon,
} from '../assets/icons/icons'

const projects = [
  {
    id: 1,
    name: 'EFood',
    mockups: {
      mobile: EFood_Mobile,
      tablet: EFood_Tablet,
      desktop: EFood_Desktop,
    },
    title: 'E-Food',
    description:
      'Aplicação de delivery desenvolvida com React, responsiva e dinâmica, utilizando TypeScript, Styled-Components, Redux  e formik para controle e validação de formulários.',
    techs: [
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
      { name: 'Styled-Components', techIcon: StyledComponentsIcon },
      { name: 'Redux', techIcon: ReduxIcon },
    ],
    deploy: 'https://e-food-chi.vercel.app/',
    github: 'https://github.com/repo-projeto1',
  },
  {
    id: 2,
    name: 'EPlay',
    mockups: {
      mobile: EPlay_Mobile,
      tablet: EPlay_Tablet,
      desktop: EPlay_Desktop,
    },
    title: 'E-Play',
    description:
      'Plataforma de streaming de jogos com interface responsiva, construída em React, TypeScript, Styled-Components e Redux feito seguindo design desenvolvido no Figma.',
    techs: [
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
      { name: 'Styled-Components', techIcon: StyledComponentsIcon },
      { name: 'Redux', techIcon: ReduxIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 3,
    name: 'HojeTaDoce',
    mockups: {
      mobile: HTD_Mobile,
      tablet: HTD_Tablet,
      desktop: HTD_Desktop,
    },
    title: 'Hoje ta Doce',
    description:
      'Landing page para uma confeitaria, destacando produtos e serviços, desenvolvida em HTML, JavaScript e utilizando todos os recursos do Bootstrap para estilização e dinamismo da pagina.',
    techs: [
      { name: 'JavaScript', techIcon: JavaScriptIcon },
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'HTML', techIcon: HtmlIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 4,
    name: 'ToDo',
    mockups: {
      mobile: ToDo_Mobile,
      tablet: ToDo_Tablet,
      desktop: ToDo_Desktop,
    },
    title: 'To-Do',
    description:
      'Lista de tarefas interativa e responsiva, criada em HTML, CSS e JavaScript',
    techs: [
      { name: 'JavaScript', techIcon: JavaScriptIcon },
      { name: 'Css', techIcon: CssIcon },
      { name: 'HTML', techIcon: HtmlIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 5,
    name: 'Spider-Verse',
    mockups: {
      mobile: SpiderVerse_Mobile,
      tablet: SpiderVerse_Tablet,
      desktop: SpiderVerse_Desktop,
    },
    title: 'LP Spider-verse',
    description:
      'Página promocional do Spider-verse, com design atrativo e responsivo, feita com Html, Sass e JavaScript.',
    techs: [
      { name: 'HTML', techIcon: HtmlIcon },
      { name: 'Sass', techIcon: SassIcon },
      { name: 'JavaScript', techIcon: JavaScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 6,
    name: 'CloneDisney',
    mockups: {
      mobile: CloneDisney_Mobile,
      tablet: CloneDisney_Tablet,
      desktop: CloneDisney_Desktop,
    },
    title: 'Clone Disney Plus',
    description:
      'Clone responsivo da interface do Disney Plus, implementado com Html, Sass e JavaScript.',
    techs: [
      { name: 'HTML', techIcon: HtmlIcon },
      { name: 'Sass', techIcon: SassIcon },
      { name: 'JavaScript', techIcon: JavaScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
]

export default projects
