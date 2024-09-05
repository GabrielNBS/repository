import React from 'react'
import { ButtonProps } from '../../types/ButtonProps'
import { Button as PButton } from './styles'

export default function Button({ children, as = 'button' }: ButtonProps) {
  return <PButton as={as}>{children}</PButton>
}
