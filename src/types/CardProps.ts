import { IconType } from 'react-icons'

export type CardProps = {
  imageUrl: string
  title: string
  description: string
  techs: (IconType | string)[]
  deploy: string
  github: string
}
