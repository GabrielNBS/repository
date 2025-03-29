import styled, { keyframes } from 'styled-components'
import { CardBox } from '../../Components/SkillCard/styles'
import { centralize } from '../../keyframes/Centralize'

const scrollAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`

export const AboutSection = styled.section`
  position: relative;
  height: 100dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;

  .about_container {
    display: flex;
    flex-direction: column;
    padding-left: 3rem;
    color: ${(props) => props.theme.color.primary};
    justify-content: space-around;

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

  .tech_container {
    ul {
      width: 100%;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      overflow-wrap: break-word;

      .tech-carousel {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        width: 100%;

        li {
          ${centralize}
          background-color: ${(props) => props.theme.background.secondary};
          padding: 1rem 2rem;
          color: ${(props) => props.theme.color.primary};
          border-radius: 1rem;
          font-size: 1rem;
          border: 1px solid ${(props) => props.theme.background.primary};
          font-weight: 700;
          box-shadow:
            6px 6px 12px ${(props) => props.theme.shadow.secondary},
            -6px -6px 12px ${(props) => props.theme.shadow.tertiary};
          transition: all 0.4s ease;

          &:hover {
            filter: contrast(1.1);
          }
        }
      }
    }
  }

  /* Apenas em mobile e tablet o carrossel entra */
  @media ${({ theme }) => theme.device.mobile},
    ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
    height: 100dvh;
    padding: 0 5%;
    align-items: center;
    overflow: hidden;

    .about_container {
      padding: 0;
      gap: 1rem;
    }

    .tech_container {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1rem;
      height: 10rem;
      overflow: hidden;

      .tech-carousel {
        display: flex;
        flex-wrap: nowrap;
        width: max-content;
        animation: ${scrollAnimation} 15s linear infinite;
      }

      ul {
        display: flex;
        gap: 2rem;
        background-color: transparent;
        opacity: 0.5;
        height: 4rem;

        li {
          gap: 0.5rem;
        }
      }
    }

    .card_container {
      display: flex;
      overflow-x: auto;
      padding: 0;

      ${CardBox} {
        flex-shrink: 0;
        width: 300px;
        height: 350px;
      }
    }

    .description_container {
      order: -1;
      padding: 3rem 0 0 0;
      text-align: center;
      max-width: 25rem;
      width: 100%;
    }
  }
`
