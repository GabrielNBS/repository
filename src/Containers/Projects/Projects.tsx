import React from 'react'
import { ProjectsContainer } from './styles'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import projects from '../../projects/projects'

export default function Projects() {
  return (
    <ProjectsContainer>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          techs={project.techs}
          imageUrl={project.imageUrl}
          deploy={project.deploy}
          github={project.github}
        />
      ))}
    </ProjectsContainer>
  )
}
