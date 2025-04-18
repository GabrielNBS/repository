import React from 'react'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import projects from '../../projects/projects'

export default function Projects() {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard
          id={project.id}
          name={project.name}
          key={index}
          title={project.title}
          description={project.description}
          techs={project.techs}
          mockups={Object.values(project.mockups)}
          deploy={project.deploy}
          github={project.github}
          icon={project.icon}
        />
      ))}
    </>
  )
}
