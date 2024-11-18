import React from 'react'
import * as S from './styles'
import { Text } from '../../Components/Text/styles'

export default function About() {
  return (
    <S.AboutSection>
      {/* <Title className="centralized" as={'h2'} $medium>
        Como posso colabora com sua empresa?
      </Title> */}
      <div className="container">
        <S.AboutContainer>
          <Text as="h2">Sobre Mim</Text>
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
            <Text as="h2">Como posso contribuir?</Text>
            <p>
              Ofereço soluções front-end que ajudam empresas a se destacarem
              digitalmente e a se conectarem melhor com seu público. Meu
              conjunto de habilidades inclui:
            </p>
            <ul>
              <S.ListBox>
                Desenvolvimento com React e TypeScript: Criação de interfaces
                robustas e escaláveis, ideais para projetos que precisam de alto
                desempenho e organização.
              </S.ListBox>
              <S.ListBox>
                Gerenciamento de estado com Redux: Implementação de
                gerenciamento de estado global eficiente para aplicações
                complexas, garantindo consistência e facilidade de manutenção.
              </S.ListBox>
              <S.ListBox>
                Estilização avançada: Com Styled-Components, Sass e Bootstrap,
                desenvolvo designs responsivos e personalizados que se adaptam
                perfeitamente a qualquer dispositivo.
              </S.ListBox>
              <S.ListBox>
                JavaScript moderno: Experiência em JavaScript para criar
                funcionalidades interativas e dinâmicas que aprimoram a
                usabilidade.
              </S.ListBox>
            </ul>
          </div>
        </S.ServicesContainer>
      </div>
    </S.AboutSection>
  )
}
