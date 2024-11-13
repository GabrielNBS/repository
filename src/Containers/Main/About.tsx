import React from 'react'
import * as S from './styles'
import { Title } from '../../Components/Text/styles'

export default function About() {
  return (
    <S.AboutSection>
      {/* <Title className="centralized" as={'h2'} $medium>
        Como posso colabora com sua empresa?
      </Title> */}
      <div className="container">
        <S.AboutContainer>
          <h3>Sobre Mim</h3>
          <p>
            Sou <b>Gabriel Nascimento</b>, <b>desenvolvedor Front-end</b> com
            dois anos de experiência em tecnologias modernas para criação de
            interfaces dinâmicas e interativas. Minha especialização está em
            desenvolvimento com <b>React</b>, <b>JavaScript</b> e{' '}
            <b>TypeScript</b>, além de habilidades em gerenciamento de estado
            com Redux e estilização avançada com <b>Styled-Components</b>,{' '}
            <b>Sass</b> e <b>Bootstrap</b>. Meu foco é sempre em criar
            aplicações que oferecem uma experiência de usuário intuitiva e
            responsiva, mantendo a performance e a eficiência em primeiro plano.
          </p>
        </S.AboutContainer>
        <S.ServicesContainer>
          <div>
            <h3 className="centralized">Como posso contribuir?</h3>
            <p>
              Ofereço soluções front-end que ajudam empresas a se destacarem
              digitalmente e a se conectarem melhor com seu público. Meu
              conjunto de habilidades inclui:
            </p>
            <ul>
              <li>
                Desenvolvimento com React e TypeScript: Criação de interfaces
                robustas e escaláveis, ideais para projetos que precisam de alto
                desempenho e organização.
              </li>
              <li>
                Gerenciamento de estado com Redux: Implementação de
                gerenciamento de estado global eficiente para aplicações
                complexas, garantindo consistência e facilidade de manutenção.
              </li>
              <li>
                Estilização avançada: Com Styled-Components, Sass e Bootstrap,
                desenvolvo designs responsivos e personalizados que se adaptam
                perfeitamente a qualquer dispositivo.
              </li>
              <li>
                JavaScript moderno: Experiência em JavaScript para criar
                funcionalidades interativas e dinâmicas que aprimoram a
                usabilidade.
              </li>
            </ul>
          </div>
        </S.ServicesContainer>
      </div>
    </S.AboutSection>
  )
}
