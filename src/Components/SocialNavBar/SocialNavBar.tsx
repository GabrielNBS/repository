import React from 'react';
import { StyledWrapper } from './styles';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../../assets/icons/icons';

function SocialNavBar() {
  return (
    <StyledWrapper>
      <ul className="wrapper">
        <li className="icon linkedin">
          <a
            href="https://www.linkedin.com/in/gabrielnascimento-dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="tooltip">linkedin</span>
            <LinkedinIcon className="linkedin" />
          </a>
        </li>
        <li className="icon github">
          <a href="https://www.github.com/GabrielNBS" target="_blank" rel="noopener noreferrer">
            <span className="tooltip">github</span>
            <GithubIcon className="github" />
          </a>
        </li>
        <li className="icon whatsapp">
          <a
            href="https://wa.me/+5532984286600?text=Olá!%20Gostaria%20de%20entrar%20em%20contato."
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="tooltip">whatsapp</span>
            <WhatsappIcon className="whatsapp" />
          </a>
        </li>
      </ul>
    </StyledWrapper>
  );
}

export default SocialNavBar;
