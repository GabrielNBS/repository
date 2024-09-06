import React from 'react'
import { ProjectsContainer } from './styles'
import { Title } from '../../Components/Text/styles'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'

export default function Projects() {
  return (
    <ProjectsContainer>
      <Title>Projetos</Title>
      <div className="container">
        <ProjectCard />
      </div>
    </ProjectsContainer>
  )
}
