import React from 'react'
import { Card } from './styles'
import { Title } from '../Text/styles'
import Button from '../Button/Buttons'

export default function SkillCard() {
  return (
    <Card>
      <Title as={'h2'}>Lorem ipsum dolor, sit amet consectetur</Title>
      <ul>
        <li>service</li>
        <li>service</li>
        <li>service</li>
        <li>service</li>
      </ul>
      <Button aria-label="Clique para saber mais" as="a" href="">
        Alavanque
      </Button>
    </Card>
  )
}
