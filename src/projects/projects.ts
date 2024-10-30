import { FaReact } from 'react-icons/fa'
import {
  ReactIcon,
  ReduxIcon,
  StyledComponentsIcon,
  TypeScriptIcon,
} from '../styles/GlobalStyle'

const projects = [
  {
    img: 'link-da-imagem-1',
    title: 'EFood',
    description:
      'Desenvolvi um projeto de delivery utilizando React para a construção da interface dinâmica e responsiva utilizando React',
    techs: [ReactIcon, TypeScriptIcon, ReduxIcon, StyledComponentsIcon],
    deploy: 'https://deploy-do-projeto1.com',
    github: 'https://github.com/repo-projeto1',
  },
  {
    img: 'link-da-imagem-2',
    title: 'Projeto 2',
    description: 'Descrição do Projeto 2',
    techs: ['Sass', 'JavaScript', 'Bootstrap'],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
  {
    img: 'link-da-imagem-2',
    title: 'Projeto 2',
    description: 'Descrição do Projeto 2',
    techs: ['Sass', 'JavaScript', 'Bootstrap'],
    deploy: 'https://deploy-do-projeto2.com',
    github: 'https://github.com/repo-projeto2',
  },
]

export default projects
