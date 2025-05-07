import React from 'react';
import * as S from './styles';
import Button from '../Button/Buttons';
import ListItem from '../TechSpanStyle';

type ModalProps = {
  title: string;
  description: string;
  techs: string[];
  deploy?: string;
  github?: string;
  onClose: () => void;
};

export default function Modal({ title, description, techs, deploy, github, onClose }: ModalProps) {
  // Fecha o modal ao clicar fora dele
  const handleOverlayClick = () => onClose();
  // Impede o fechamento caso clique no conteúdo do modal
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContent onClick={handleContentClick}>
        <h2>{title}</h2>
        <Button type="button" onClick={onClose}>
          X
        </Button>
        <p>{description}</p>
        <ul>
          {techs.map((tech, index) => (
            <ListItem key={index}>{tech}</ListItem>
          ))}
        </ul>
        <S.ButtonGroup>
          {deploy && (
            <Button as="a" href={deploy} target="_blank" rel="noopener noreferrer">
              Deploy
            </Button>
          )}
          {github && (
            <Button as="a" href={github} target="_blank" rel="noopener noreferrer">
              Código
            </Button>
          )}
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
