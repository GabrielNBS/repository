import { FaReact } from 'react-icons/fa'
import HTD_Page_Video from '../video/htdPageVideo.mp4'

import {
  BootstrapIcon,
  ReactIcon,
  ReduxIcon,
  StyledComponentsIcon,
  TypeScriptIcon,
} from '../styles/GlobalStyle'

const projects = [
  {
    videoUrl: HTD_Page_Video,
    title: 'EFood',
    description:
      'Desenvolvi um projeto de delivery utilizando React para a construção da interface dinâmica e responsiva utilizando React',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://e-food-chi.vercel.app/',
    github: 'https://github.com/repo-projeto1',
  },
  {
    videoUrl: 'link-da-imagem-2',
    title: 'Projeto 2',
    description: 'Descrição do Projeto 2',
    techs: [
      { name: 'Bootstrap', techIcon: BootstrapIcon },
      { name: 'React', techIcon: ReactIcon },
      { name: 'TypeScript', techIcon: TypeScriptIcon },
    ],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    videoUrl: 'link-da-imagem-2',
    title: 'Projeto 2',
    description: 'Descrição do Projeto 2',
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
