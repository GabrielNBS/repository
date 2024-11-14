import React from 'react'
import * as S from './styles'

export type CircleProps = {
  className: string
}

export default function Circle({ className }: CircleProps) {
  return <S.Circle className={className}></S.Circle>
}
