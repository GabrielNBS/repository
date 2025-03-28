import styled from 'styled-components'
import { CardBox } from '../../Components/SkillCard/styles'

export const AboutSection = styled.section`
  position: relative;
  height: 100dvh;
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
    padding: 5rem 2rem 2rem 0;
  }

  @media ${({ theme }) => theme.device.mobile},
    ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
    height: 100dvh;
    padding: 0;

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
      max-width: 25rem;
      width: 100%;
      margin: 0 auto;
    }
  }
`
