import {
  FaReact,
  FaBootstrap,
  FaGithub,
  FaLinkedinIn,
  FaJs,
  FaWhatsapp,
  FaHtml5,
  FaCss3,
  FaSass,
  FaLaptopCode,
  FaPuzzlePiece,
  FaServer,
  FaRocket,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { SiStyledcomponents, SiTypescript, SiCypress, SiRedux } from 'react-icons/si';
import styled from 'styled-components';

export const LinkIcon = styled(FaExternalLinkAlt)``;

export const GithubIcon = styled(FaGithub)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #181717;
  }
`;

export const WhatsappIcon = styled(FaWhatsapp)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #25d366;
  }
`;

export const LinkedinIcon = styled(FaLinkedinIn)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #0a66c2;
  }
`;

export const LaptopCodeIcon = styled(FaLaptopCode)`
  color: ${(props) => props.theme.color.primary};
`;

export const PuzzlePieceIcon = styled(FaPuzzlePiece)`
  color: ${(props) => props.theme.color.primary};
`;

export const ServerIcon = styled(FaServer)`
  color: ${(props) => props.theme.color.primary};
`;

export const RocketIcon = styled(FaRocket)`
  color: ${(props) => props.theme.color.primary};
`;
