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
} from '../styles/GlobalStyle'

const projects = [
  {
    id: 'EFood',
    videoUrl: Efood,
    title: 'E-Food',
    description:
      'Aplicação de delivery desenvolvida com React, responsiva e dinâmica, utilizando TypeScript e Bootstrap.',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://e-food-chi.vercel.app/',
    github: 'https://github.com/repo-projeto1',
  },
  {
    id: 'EPlay',
    videoUrl: EPlay,
    title: 'E-Play',
    description:
      'Plataforma de streaming de jogos com interface responsiva, construída em React, TypeScript e Bootstrap.',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 'HojeTaDoce',
    videoUrl: HojeTaDoce,
    title: 'Hoje ta Doce',
    description:
      'Landing page para uma confeitaria, destacando produtos e serviços, desenvolvida com React e Bootstrap.',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 'ToDo',
    videoUrl: ToDo,
    title: 'To-Do',
    description:
      'Lista de tarefas interativa e responsiva, criada em React com suporte para gerenciamento eficiente.',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 'Spider-Verse',
    videoUrl: Spiderverse,
    title: 'LP Spider-verse',
    description:
      'Página promocional do Spider-verse, com design atrativo e responsivo, feita com React e TypeScript.',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    id: 'CloneDisney',
    videoUrl: CloneDisney,
    title: 'Clone Disney Plus',
    description:
      'Clone responsivo da interface do Disney Plus, implementado com React, TypeScript e Bootstrap.',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
]

export default projects
