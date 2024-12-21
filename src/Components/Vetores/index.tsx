import React from 'react'
import * as S from './styles'
import Cloud from '../../Image/Vetores/Vetor3.png'
import { ReactComponent as Dragon } from '../../Image/Vetores/dragon.svg'

export type VetorProps = {
  className: string
}

export default function Circle({ className }: VetorProps) {
  return <S.Circle className={className}></S.Circle>
}

export function CloudVetor({ className }: VetorProps) {
  return <S.Cloud1 className={className} src={Cloud} alt="" />
}

export function DragonVetor() {
  return <Dragon width="500px" height="500px" />
}
