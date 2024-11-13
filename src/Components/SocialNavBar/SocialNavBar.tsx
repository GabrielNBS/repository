import React from 'react'
import { StyledWrapper } from './styles'
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '../../styles/GlobalStyle'

function SocialNavBar() {
  return (
    <StyledWrapper>
      <ul className="wrapper">
        <li className="icon linkedin">
          <span className="tooltip">linkedin</span>
          <LinkedinIcon className="linkedin" />
        </li>
        <li className="icon github">
          <span className="tooltip">github</span>
          <GithubIcon className="github" />
        </li>
        <li className="icon whatsapp">
          <span className="tooltip">whatsapp</span>
          <WhatsappIcon className="whatsapp" />
        </li>
      </ul>
    </StyledWrapper>
  )
}

export default SocialNavBar
