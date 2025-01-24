import { FaReact } from 'react-icons/fa'
import Efood from '../video/Efood_Page_Video.mp4'
import EPlay from '../video/Eplay_Page_Video.mp4'
import ToDo from '../video/Todo_Page_Video.mp4'
import Spiderverse from '../video/Spiderverse_Page_Video.mp4'
import HojeTaDoce from '../video/Htd_Page_Video.mp4'
import CloneDisney from '../video/Clonedisney_Page_Video.mp4'
import Pizza from '../Image/Vetores/EFood/pizza.png'
import Sushi from '../Image/Vetores/EFood/sushi.png'
import Poke from '../Image/Vetores/EFood/poke_indonesio.png'
import Chocolate from '../Image/Vetores/EFood/chocolate.png'
import Switch from '../Image/Vetores/EPlay/nintendo_switch.png'
import Xbox from '../Image/Vetores/EPlay/xbox_controller.png'
import Playstation from '../Image/Vetores/EPlay/ps4_controller.png'
import Placa from '../Image/Vetores/EPlay/placa.png'
import Brigadeiro from '../Image/Vetores/Hoje_ta_doce/brigadeiro.png'
import Brownie from '../Image/Vetores/Hoje_ta_doce/brownie.png'
import Cupcake from '../Image/Vetores/Hoje_ta_doce/cupcake.png'
import Picole from '../Image/Vetores/Hoje_ta_doce/picole.png'
import SpiderLogo from '../Image/Vetores/Spider_man/spiderLogo.png'
import SpiderMask from '../Image/Vetores/Spider_man/spiderMask.png'
import SpiderToy from '../Image/Vetores/Spider_man/spiderToy.png'
import SpiderWeb from '../Image/Vetores/Spider_man/spiderWeb.png'
import Alvo from '../Image/Vetores/To_do/alvo.png'
import Check from '../Image/Vetores/To_do/aprovado.png'
import Checklist from '../Image/Vetores/To_do/checklist.png'
import FirstPlace from '../Image/Vetores/To_do/primeiroLugar.png'

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
    iconAnimation: [
      {
        name: Pizza,
        alt: 'Imagem de uma fatia de pizza',
      },
      {
        name: Poke,
        alt: 'Imagem de um poke',
      },
      {
        name: Chocolate,
        alt: 'Imagem de um prato com brownies de chocolate',
      },
      {
        name: Sushi,
        alt: 'Imagem de um prato com sushi em cima',
      },
    ],
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
    iconAnimation: [
      {
        name: Switch,
        alt: 'Imagem de um console Nintendo Switch',
      },
      {
        name: Xbox,
        alt: 'Imagem de controle de Xbox one',
      },
      {
        name: Playstation,
        alt: 'Imagem de uma controle de PlayStation 4',
      },
      {
        name: Placa,
        alt: 'Imagem de uma Placa escrita "Gamer Zone"',
      },
    ],
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
    iconAnimation: [
      {
        name: Brigadeiro,
        alt: 'Imagem de um brigadeiro de chocolate',
      },
      {
        name: Brownie,
        alt: 'Imagem de um brownie de chocolate',
      },
      {
        name: Cupcake,
        alt: 'Imagem de um cupcake de morango',
      },
      {
        name: Picole,
        alt: 'Imagem de um picolé de chocolate',
      },
    ],
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
    iconAnimation: [
      {
        name: Alvo,
        alt: 'Imagem de um alvo com flecha',
      },
      {
        name: Check,
        alt: 'Imagem de check verde',
      },
      {
        name: Checklist,
        alt: 'Imagem de uma lista de tarefas',
      },
      {
        name: FirstPlace,
        alt: 'Imagem de uma medalha de primeiro lugar',
      },
    ],
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
    iconAnimation: [
      {
        name: SpiderLogo,
        alt: 'Imagem da logo do Homem-Aranha',
      },
      {
        name: SpiderMask,
        alt: 'Imagem da Mascara do Homem-Aranha',
      },
      {
        name: SpiderToy,
        alt: 'Imagem de um boneco do Homem-Aranha',
      },
      {
        name: SpiderWeb,
        alt: 'Imagem de uma teia de aranha',
      },
    ],
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
    iconAnimation: [
      {
        name: Pizza,
        alt: 'Imagem de uma fatia de pizza',
      },
    ],
  },
]

export default projects
