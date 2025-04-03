import React from 'react'
import { ButtonProps } from '../../types/ButtonProps'
import { Button as PButton } from './styles'

export default function Button({
  children,
  as = 'button',
  target = '_blank',
  href,
  rel,
}: ButtonProps) {
  return (
    <PButton rel={rel} href={href} target={target} as={as}>
      {children}
    </PButton>
  )
}
