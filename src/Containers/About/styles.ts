import styled from 'styled-components'
import { CardBox } from '../../Components/SkillCard/styles'
import { centralize } from '../../keyframes/Centralize'
import cards from '../../cards/cards'

export const AboutSection = styled.section`
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;

  .card_description {
    display: flex;
    align-self: center;
    flex-direction: column;
    color: ${(props) => props.theme.color.primary};

    p {
      color: rgba(${(props) => props.theme.color.tertiary});
    }

    strong {
      display: block;
      color: ${(props) => props.theme.color.secondary};
    }
  }

  .card_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
    height: 100vh;
    padding: 2rem 0;

    .card_container {
      display: flex;
      overflow-x: auto;
      padding: 1rem 0;
      -webkit-overflow-scrolling: touch;

      ${CardBox} {
        flex-shrink: 0;
        width: 300px;
        height: 350px;
      }
    }

    .card_description {
      order: -1;
      padding: 0 1rem;
      text-align: center;
    }
  }
`
