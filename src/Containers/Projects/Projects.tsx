import React, { useState } from 'react'
import { ProjectsContainer } from './styles'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { Button } from '../../Components/Button/styles'
import projects from '../../projects/projects'

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(projects[0])
  const [activeButtonIndex, setActiveButtonIndex] = useState(0)

  const handleProjectChange = (projectIndex: number) => {
    setCurrentProject(projects[projectIndex])
    setActiveButtonIndex(projectIndex)
  }

  return (
    <ProjectsContainer>
      <nav>
        {projects.map((project, index) => (
          <Button
            key={index}
            className={activeButtonIndex === index ? 'active' : ''}
            onClick={() => handleProjectChange(index)}
          >
            <span>Projeto {index + 1}</span>
          </Button>
        ))}
      </nav>
      <div className="container">
        <ProjectCard />
      </div>
    </ProjectsContainer>
  )
}
