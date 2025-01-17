import { IconType } from 'react-icons'

export type Tech = {
  name: string
  backgroundColor: string
}

export type Icon = {
  iconSymbol: IconType
  iconBackground: string
  iconColor: string
}
export type CardSkillsProps = {
  icon: Icon
  title: string
  description: string
  background: string
}
