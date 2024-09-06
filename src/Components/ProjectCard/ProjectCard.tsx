import React from 'react'
import * as S from './styles'
import Button from '../Button/Buttons'

export default function ProjectCard() {
  return (
    <S.Box>
      <S.ImgBox></S.ImgBox>
      <S.TextBox>
        <h3>Nome do Projeto</h3>
        <div className="centralized">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            omnis illo voluptatum quam, alias veniam quasi ullam. Corporis,
            soluta quia. Repellendus illum dolorum sint suscipit! Eveniet
            eligendi asperiores repellendus laborum?
          </p>
          <ul>
            <li>React</li>
            <li>JavaScript</li>
            <li>Typescript</li>
          </ul>
          <S.ButtonBox>
            <Button>Deploy</Button>
            <Button>codigo</Button>
          </S.ButtonBox>
        </div>
      </S.TextBox>
    </S.Box>
  )
}
