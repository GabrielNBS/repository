import styled from 'styled-components'
import { CardBox } from '../../Components/SkillCard/styles'
import { centralize } from '../../keyframes/Centralize'

export const AboutSection = styled.section`
  position: relative;
  height: 100vh;
  ${centralize}

  .card_container {
    display: grid;
    grid-template-columns: 50% 25% 25%;
    grid-template-areas:
      'text1 card1 card3'
      'text1 card2 card4';
    row-gap: 1rem;
    width: fit-content;

    ${CardBox} {
      &:nth-child(1) {
        grid-area: card1;
        justify-self: flex-end;
        align-self: center;
        margin-right: 1.5rem;
      }
      &:nth-child(2) {
        grid-area: card2;
        justify-self: flex-end;
        margin-right: 1.5rem;
      }
      &:nth-child(3) {
        grid-area: card3;
        margin-right: 1.5rem;
        transform: translateY(30px);
      }
      &:nth-child(4) {
        grid-area: card4;
        transform: translateY(30px);
      }
    }

    .card_title {
      grid-area: text1;
      align-self: center;
      justify-self: center;
      position: relative;
      color: ${(props) => props.theme.color.primary};
      margin-left: 5rem;

      p {
        color: rgba(${(props) => props.theme.color.tertiary});
      }

      strong {
        display: block;
        color: ${(props) => props.theme.color.secondary};
      }
    }
  }
`
