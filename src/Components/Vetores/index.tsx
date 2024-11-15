import React from 'react'
import * as S from './styles'
import Clould from '../../Image/Vetores/Vetor3.png'

export type VetorProps = {
  className: string
}

export default function Circle({ className }: VetorProps) {
  return <S.Circle className={className}></S.Circle>
}

export function CloundVetor({ className }: VetorProps) {
  return <S.Cloud1 className={className} src={Clould} alt="" />
}
