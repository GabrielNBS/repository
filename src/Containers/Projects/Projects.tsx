import React from 'react'
import { ProjectsContainer } from './styles'
import { Title } from '../../Components/Text/styles'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { Button } from '../../Components/Button/styles'

export default function Projects() {
  return (
    <ProjectsContainer>
      <nav>
        <ul>
          <li>
            <Button>Hoje ta doce</Button>
          </li>
          <li>
            <Button>Hoje ta doce</Button>
          </li>
          <li>
            <Button>Hoje ta doce</Button>
          </li>
        </ul>
      </nav>
      <div className="container">
        <ProjectCard />
      </div>
    </ProjectsContainer>
  )
}
