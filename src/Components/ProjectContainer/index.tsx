import React, { useState, useEffect } from 'react';
import * as S from './styles';
import Button from '../Button';
import { CardProps } from '../../types/CardProps';
import { Text } from '../Text/styles';
import Modal from '../Modal';
import PulsePointer from '../PulsePointer';
import SquishyText from '../../motion/SquishyText';
import { LinkIcon } from '../../assets/icons/icons';
import { FaGithub } from 'react-icons/fa6';
import FadeUpText from '../../gsap/FadeUpText';
import CustomImage from '../CustomImage';

// Hook para detectar o tipo de tela (desktop, tablet ou mobile)
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

    // Checa no carregamento e adiciona listener de resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Remove listener ao desmontar
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenType;
};

function ProjectContainer({
  id,
  name,
  title,
  description,
  techs,
  mockups,
  deploy,
  github
}: CardProps) {
  const screenType = useScreenType();
  const [showModal, setShowModal] = useState(false);

  // Abre o modal
  function handleModalOpen() {
    setShowModal(true);
  }

  // Fecha o modal
  function handleModalClose() {
    setShowModal(false);
  }

  // Retorna a imagem mockup de acordo com o tipo de tela
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
      {/* Exibe conteúdo textual apenas para telas maiores que mobile */}
      {screenType !== 'mobile' && (
        <S.DescriptionProjectBox>
          <Text data-aos="fade-right" data-aos-duration="1000" as="h2" $variant="h2">
            <PulsePointer />
            <SquishyText text={title} />
          </Text>
          <Text id="description" as="p" $variant="p">
            <FadeUpText text={description} />
          </Text>
          <ul>
            {techs.map((tech, index) => (
              <li data-aos="fade-up" data-aos-duration="1500" key={index}>
                <Text $variant="p">{tech}</Text>
              </li>
            ))}
          </ul>

          <div data-aos="zoom-out-up" data-aos-duration="1500">
            {github && (
              <Button as="a" href={github} aria-label={`Ver código de ${title} no GitHub`}>
                <FaGithub /> Código
              </Button>
            )}
            {deploy && (
              <Button as="a" href={deploy} aria-label={`Ver site do projeto ${title}`}>
                <LinkIcon /> Site
              </Button>
            )}
          </div>
        </S.DescriptionProjectBox>
      )}

      <S.VideoProjectBox data-aos="fade-left" data-aos-duration="1500">
        <CustomImage
          src={getMockupImage()}
          alt={`Mockup ${screenType}`}
          data-testid="mockup-image"
          aria-label={`Imagem mockup do projeto ${title} para ${screenType}`}
        />
        {screenType === 'mobile' && (
          <Button
            type="button"
            onClick={handleModalOpen}
            aria-label={`Abrir detalhes do projeto ${title}`}
          >
            Saiba +
          </Button>
        )}
      </S.VideoProjectBox>

      {/* Modal aberto apenas em mobile */}
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

export default ProjectContainer;
