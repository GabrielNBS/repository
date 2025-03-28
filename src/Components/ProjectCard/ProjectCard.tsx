import React, { useState, useEffect } from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'
import { CardProps } from '../../types/CardProps'
import { Text } from '../Text/styles'

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
  mockups,
  deploy,
  github,
}: CardProps) {
  const screenType = useScreenType()

  const getMockupImage = () => {
    switch (screenType) {
      case 'desktop':
        return mockups[2]
      case 'tablet':
        return mockups[1]
      case 'mobile':
        return mockups[0]
      default:
        return mockups[2]
    }
  }

  return (
    <S.Box id={id}>
      {/* Mostrar descrição em desktop e tablet */}
      {screenType !== 'mobile' && (
        <S.DescriptionProjectBox>
          <>
            <Text as="h2">{title}</Text>
            <Text as="p">{description}</Text>
            <ul>
              {techs.map((tech, index) => (
                <li key={index}>
                  <span>
                    <Text>- {tech.name}</Text>
                  </span>
                </li>
              ))}
            </ul>
          </>
          <div>
            {deploy && (
              <Button href={deploy}>
                <Text>Deploy</Text>
              </Button>
            )}
            {github && (
              <Button href={github}>
                <Text>Código</Text>
              </Button>
            )}
          </div>
        </S.DescriptionProjectBox>
      )}

      <S.VideoProjectBox>
        {screenType === 'mobile' && <h2>{title}</h2>}
        <img
          src={getMockupImage()}
          alt={`Mockup ${screenType}`}
          data-testid="mockup-image"
        />
        {screenType === 'mobile' && (
          <div>
            {deploy && <Button href={deploy}>Deploy</Button>}
            {github && <Button href={github}>Código</Button>}
          </div>
        )}
      </S.VideoProjectBox>
    </S.Box>
  )
}

export default ProjectCard
