import React, { useState, useEffect } from 'react';
import * as S from './styles';
import Button from '../Button/Buttons';
import { CardProps } from '../../types/CardProps';
import { Text } from '../Text/styles';
import Modal from '../Modal';
import PulsePointer from '../PulsePointer';

const useScreenType = () => {
  const [screenType, setScreenType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setScreenType('desktop');
      } else if (width >= 768) {
        setScreenType('tablet');
      } else {
        setScreenType('mobile');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenType;
};

function ProjectCard({
  id,
  name,
  title,
  description,
  techs,
  mockups,
  deploy,
  github,
  icon
}: CardProps) {
  const screenType = useScreenType();
  const [showModal, setShowModal] = useState(false);

  // Helpers para controlar o modal
  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  const getMockupImage = () => {
    switch (screenType) {
      case 'desktop':
        return mockups[2];
      case 'tablet':
        return mockups[1];
      case 'mobile':
        return mockups[0];
      default:
        return mockups[2];
    }
  };

  return (
    <S.Box data-number={id} id={name}>
      {screenType !== 'mobile' && (
        <S.DescriptionProjectBox>
          <Text data-aos="fade-right" data-aos-duration="1000" as="h2" $variant="h2">
            <span>{icon}</span> {title}
          </Text>
          <Text data-aos="fade-right" data-aos-duration="1500" as="p" $variant="p">
            {description}
          </Text>
          <ul>
            {techs.map((tech, index) => (
              <li data-aos="fade-up" data-aos-duration="1500" key={index}>
                <PulsePointer />
                <Text $variant="p">{tech.name}</Text>
              </li>
            ))}
          </ul>

          <div data-aos="flip-down" data-aos-duration="1500">
            {deploy && (
              <Button as="a" href={deploy}>
                Deploy
              </Button>
            )}
            {github && (
              <Button as="a" href={github}>
                Código
              </Button>
            )}
          </div>
        </S.DescriptionProjectBox>
      )}

      <S.VideoProjectBox data-aos="fade-left" data-aos-duration="1500">
        <img src={getMockupImage()} alt={`Mockup ${screenType}`} data-testid="mockup-image" />
        {screenType === 'mobile' && (
          <>
            <Button type="button" onClick={handleModalOpen}>
              Saiba +
            </Button>
          </>
        )}
      </S.VideoProjectBox>
      {showModal && (
        <Modal
          title={title}
          description={description}
          techs={techs}
          deploy={deploy}
          github={github}
          onClose={handleModalClose}
        />
      )}
    </S.Box>
  );
}

export default ProjectCard;
