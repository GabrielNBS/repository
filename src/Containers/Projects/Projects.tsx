import React, { useState } from 'react'
import { ProjectsContainer } from './styles'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { Button } from '../../Components/Button/styles'
import projects from '../../projects/projects'

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(projects[0])

  const handleProjectChange = (projectIndex: number) => {
    setCurrentProject(projects[projectIndex])
  }

  return (
    <ProjectsContainer>
      <nav>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <Button onClick={() => handleProjectChange(index)}>
                Prtojeto {index + 1}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container">
        <ProjectCard
          img={currentProject.img}
          title={currentProject.title}
          description={currentProject.description}
          techs={currentProject.techs}
          deploy={currentProject.deploy}
          github={currentProject.github}
        />
      </div>
    </ProjectsContainer>
  )
}
