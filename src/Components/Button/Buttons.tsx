import React from 'react'
import { ButtonProps } from '../../types/ButtonProps'
import { Button as PButton } from './styles'
import { Text } from '../Text/styles'

export default function Button({
  children,
  as = 'button',
  target = '_blank',
  href,
}: ButtonProps) {
  return (
    <PButton href={href} target={target} as={as}>
      {children}
    </PButton>
  )
}
