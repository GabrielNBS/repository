import React from 'react'
import { ProjectsContainer } from './styles'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import projects from '../../projects/projects'

export default function Projects() {
  return (
    <ProjectsContainer>
      {projects.map((project, index) => (
        <ProjectCard
          id={project.id}
          key={index}
          title={project.title}
          description={project.description}
          techs={project.techs}
          videoUrl={project.videoUrl}
          deploy={project.deploy}
          github={project.github}
        />
      ))}
    </ProjectsContainer>
  )
}
