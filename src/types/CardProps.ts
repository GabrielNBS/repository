import { IconType } from 'react-icons'

interface TechsProps {
  name: string
  techIcon: IconType
}

interface IconAnimationProps {
  name: string
  alt: string
}
export type CardProps = {
  id: string
  videoUrl: string
  title: string
  description: string
  techs: TechsProps[]
  deploy: string
  github: string
  iconAnimation: IconAnimationProps[]
}
