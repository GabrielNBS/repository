import { IconType } from 'react-icons'

export default interface CardProps {
  img: string
  title: string
  description: string
  techs: (IconType | string)[]
  deploy: string
  github: string
}
