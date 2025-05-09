import React from 'react';
import * as S from './styles';
import Button from '../Button';
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
  // Fecha o modal ao clicar na área externa (overlay)
  const handleOverlayClick = () => onClose();

  // Impede que o clique no conteúdo do modal feche o modal
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <S.ModalOverlay onClick={handleOverlayClick} aria-label="Fechar modal">
      <S.ModalContent onClick={handleContentClick} aria-label="Conteúdo do modal">
        <h2>{title}</h2>
        <Button type="button" onClick={onClose} aria-label="Fechar">
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
            <Button
              as="a"
              href={deploy}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver deploy do projeto"
            >
              Deploy
            </Button>
          )}
          {github && (
            <Button
              as="a"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver código no GitHub"
            >
              Código
            </Button>
          )}
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
