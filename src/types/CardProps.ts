import { IconType } from 'react-icons'

interface TechsProps {
  name: string
  techIcon: IconType
}

export type CardProps = {
  id: string
  videoUrl: string
  title: string
  description: string
  techs: TechsProps[]
  deploy: string
  github: string
}
