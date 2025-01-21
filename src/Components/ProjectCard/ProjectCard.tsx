import React from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'
import { CardProps } from '../../types/CardProps'
import { Text } from '../Text/styles'
import MacBookMockup from '../../Image/Mockups/MacBook15_mockup.png'
import PizzaSVG from '../../Image/Vetores/hoje_ta_doce/pizza.png'
import SushiSVG from '../../Image/Vetores/hoje_ta_doce/sushi.png'
import PokeSVG from '../../Image/Vetores/hoje_ta_doce/poke_indonesio.png'
import ChocolateSVG from '../../Image/Vetores/hoje_ta_doce/chocolate.png'

function ProjectCard({
  id,
  title,
  description,
  techs,
  videoUrl,
  deploy,
  github,
}: CardProps) {
  return (
    <S.ProjectsContainer>
      <S.Box id={id}>
        <div>
          <S.DescriptionProjectBox>
            <h2>{title}</h2>
            <p>{description}</p>
            <ul>
              {techs.map((tech, index) => (
                <li key={index}>
                  <span>- {tech.name}</span>
                </li>
              ))}
            </ul>

            <div>
              <Button href={deploy}>Deploy</Button>
              <Button href={github}>Código</Button>
            </div>
          </S.DescriptionProjectBox>
          <S.VideoProjectBox>
            <div className="transformContainer">
              {' '}
              <img
                className="pizza"
                src={PizzaSVG}
                alt="Imagem de uma pizza de queijo"
              />
            </div>
            <div className="transformContainer">
              {' '}
              <img
                className="sushi"
                src={SushiSVG}
                alt="Imagem de um sushi de salmão"
              />
            </div>
            <div className="transformContainer">
              {' '}
              <img
                className="chocolate"
                src={ChocolateSVG}
                alt="Imagem de chocolate"
              />
            </div>
            <div className="transformContainer">
              {' '}
              <img
                className="poke"
                src={PokeSVG}
                alt="Imagem de poke indonésio"
              />
            </div>

            <img src={MacBookMockup} alt="" />
            <video src={videoUrl} autoPlay loop muted></video>
          </S.VideoProjectBox>
        </div>
      </S.Box>
    </S.ProjectsContainer>
  )
}

export default ProjectCard
