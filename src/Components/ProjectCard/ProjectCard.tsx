import React, { useState, useEffect } from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'
import { CardProps } from '../../types/CardProps'

// Importe todos os mockups
import MacBookMockup from '../../Image/Mockups/MacBook15_mockup.png'
import IPadMockup from '../../Image/Mockups/IPad_mockup.png'
import IPhoneMockup from '../../Image/Mockups/IPhone16_mockup.png'

const useScreenType = () => {
  const [screenType, setScreenType] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop',
  )

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth

      if (width >= 1024) {
        setScreenType('desktop')
      } else if (width >= 768) {
        setScreenType('tablet')
      } else {
        setScreenType('mobile')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return screenType
}

function ProjectCard({
  id,
  title,
  description,
  techs,
  videoUrl,
  deploy,
  github,
}: CardProps) {
  const screenType = useScreenType()

  const getMockupImage = () => {
    switch (screenType) {
      case 'desktop':
        return MacBookMockup
      case 'tablet':
        return IPadMockup
      case 'mobile':
        return IPhoneMockup
      default:
        return MacBookMockup
    }
  }

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
              {deploy && <Button href={deploy}>Deploy</Button>}
              {github && <Button href={github}>Código</Button>}
            </div>
          </S.DescriptionProjectBox>

          <S.VideoProjectBox>
            <img
              src={getMockupImage()}
              alt={`Mockup ${screenType}`}
              data-testid="mockup-image"
            />
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              aria-label={`Demo do projeto ${title}`}
            >
              Seu navegador não suporta o elemento vídeo
            </video>
          </S.VideoProjectBox>
        </div>
      </S.Box>
    </S.ProjectsContainer>
  )
}

export default ProjectCard
