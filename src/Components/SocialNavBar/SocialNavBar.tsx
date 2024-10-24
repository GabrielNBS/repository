import React from 'react'
import { SocialLinks } from './styles'
import { BsWhatsapp } from 'react-icons/bs'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'

export default function SocialNavBar() {
  return (
    <SocialLinks>
      <ul>
        <li>
          <a href="">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="">
            <FaLinkedinIn />
          </a>
        </li>
        <li>
          <a href="">
            <BsWhatsapp />
          </a>
        </li>
      </ul>
    </SocialLinks>
  )
}
