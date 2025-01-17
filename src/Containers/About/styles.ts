import styled from 'styled-components'
import { centralize } from '../../keyframes/Centralize'

export const AboutSection = styled.section`
  position: relative;
  height: 100vh;
  display: grid;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  .card_title {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 3rem;
    align-self: flex-end;
    color: ${(props) => props.theme.color.primary};

    p {
      font-size: 124px;
      color: transparent;
      -webkit-text-stroke: 1px rgba(${(props) => props.theme.shadow.tertiary});
      position: absolute;
      top: -90px;
      left: -20px;
      pointer-events: none;
      font-style: italic;
    }
  }

  .card_container {
    ${centralize}
    gap: 10px;

    h3 {
      font-size: 1.5rem;
    }
  }

  .hardSkillsContainer {
    display: flex;
    width: 50%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 50px;

    .react,
    .javascript,
    .typescript,
    .redux,
    .styledComponent,
    .sass,
    .html,
    .css,
    .cypress,
    .bootstrap {
      ${centralize}
      height: 50px;
      width: 100px;
      border-radius: 8px;
      margin: 0 auto;

      p {
        font-size: 16px;
        color: ${(props) => props.theme.color.primary};
      }
    }
  }
`

export const SoftSkills = styled.div`
  width: 100%;
  align-self: flex-end;
  position: relative;
  padding: 2rem;

  &::before,
  &::after {
    content: '{';
    position: absolute;
    font-size: 5rem;
    color: ${(props) => props.theme.color.primary};
  }

  &::before {
    top: 0;
    left: 18%;
  }

  &::after {
    bottom: 0;
    right: 18%;
    transform: rotate(180deg);
  }

  ul {
    ${centralize}
    gap: 1rem;
    max-width: 940px;
    flex-wrap: wrap;
    justify-self: center;

    li {
      display: flex;
      width: 150px;
      padding: 8px;
      color: ${(props) => props.theme.color.primary};
      border-radius: 8px;
      position: relative;
      justify-content: center;

      span {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        left: 0;
        margin: 4px 0 0 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .react {
    background-color: ${(props) => props.theme.stackColor.react};
  }

  .javascript {
    background-color: ${(props) => props.theme.stackColor.javascript};
  }

  .typescript {
    background-color: ${(props) => props.theme.stackColor.typescript};
  }

  .redux {
    background-color: ${(props) => props.theme.stackColor.redux};
  }

  .styledComponent {
    background-color: ${(props) => props.theme.stackColor.styledComponent};
  }

  .sass {
    background-color: ${(props) => props.theme.stackColor.sass};
  }

  .html {
    background-color: ${(props) => props.theme.stackColor.html};
  }

  .css {
    background-color: ${(props) => props.theme.stackColor.css};
  }

  .cypress {
    background-color: ${(props) => props.theme.stackColor.cypress};
  }

  .bootstrap {
    background-color: ${(props) => props.theme.stackColor.bootstrap};
  }
`
