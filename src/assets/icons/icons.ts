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

export const ReactIcon = styled(FaReact)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #61dafb;
  }
`;

export const LinkIcon = styled(FaExternalLinkAlt)``;

export const BootstrapIcon = styled(FaBootstrap)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #7952b3;
  }
`;

export const GithubIcon = styled(FaGithub)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #181717;
  }
`;

export const LinkedinIcon = styled(FaLinkedinIn)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #0a66c2;
  }
`;

export const StyledComponentsIcon = styled(SiStyledcomponents)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #db7093;
  }
`;

export const JavaScriptIcon = styled(FaJs)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #f7df1e;
  }
`;

export const TypeScriptIcon = styled(SiTypescript)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #3178c6;
  }
`;

export const CypressIcon = styled(SiCypress)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #17202c;
  }
`;

export const ReduxIcon = styled(SiRedux)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #764abc;
  }
`;

export const WhatsappIcon = styled(FaWhatsapp)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #25d366;
  }
`;

export const HtmlIcon = styled(FaHtml5)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #e34f26;
  }
`;

export const CssIcon = styled(FaCss3)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #1572b6;
  }
`;

export const SassIcon = styled(FaSass)`
  color: ${(props) => props.theme.color.primary};
  &:hover {
    color: #cc6699;
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
