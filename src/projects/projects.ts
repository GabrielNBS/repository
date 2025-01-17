import { FaReact } from 'react-icons/fa'
import Efood from '../video/Efood_Page_Video.mp4'
import EPlay from '../video/Eplay_Page_Video.mp4'
import ToDo from '../video/Todo_Page_Video.mp4'
import Spiderverse from '../video/Spiderverse_Page_Video.mp4'
import HojeTaDoce from '../video/Htd_Page_Video.mp4'
import CloneDisney from '../video/Clonedisney_Page_Video.mp4'

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
    id: 'EFood',
    videoUrl: Efood,
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
    id: 'EPlay',
    videoUrl: EPlay,
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
    id: 'HojeTaDoce',
    videoUrl: HojeTaDoce,
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
    id: 'ToDo',
    videoUrl: ToDo,
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
    id: 'Spider-Verse',
    videoUrl: Spiderverse,
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
    id: 'CloneDisney',
    videoUrl: CloneDisney,
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
