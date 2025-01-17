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

    p {
      font-size: 124px;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
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
      color: black;
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
      }
    }
  }

  .react {
    background-color: #cceeff;
  }

  .javascript {
    background-color: #fff4cc;
  }

  .typescript {
    background-color: #cce4ff;
  }

  .redux {
    background-color: #e0ccff;
  }

  .styledComponent {
    background-color: #ffd1e1;
  }

  .sass {
    background-color: #ffccdd;
  }

  .html {
    background-color: #ffccb3;
  }

  .css {
    background-color: #cce0ff;
  }

  .cypress {
    background-color: #b3b3b3;
  }

  .bootstrap {
    background-color: #d9cce4;
  }
`
