import styled, { keyframes } from 'styled-components'
import { centralize } from '../../keyframes/Centralize'
import { CardBox } from '../../Components/SkillCard/styles'
import { FloatAnimation } from '../../keyframes/FloatAnimation'
import { ScrollAnimation } from '../../keyframes/ScrollAnimation'

export const AboutSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100dvh;
  width: 100%;
  padding: 0 4rem;
  gap: 1rem;

  @media ${({ theme }) => theme.device.mobile},
    ${({ theme }) => theme.device.tablet} {
    display: flex;
    flex-direction: column;
    padding: 0;
    justify-content: center;
  }
`
export const DescriptionContainer = styled.div`
  ${centralize}
  flex-direction: column;
  gap: 2rem;
`
export const TextContainer = styled.div`
  @media ${({ theme }) => theme.device.mobile},
    ${({ theme }) => theme.device.tablet} {
    text-align: center;
  }

  h3 {
    color: ${(props) => props.theme.color.secondary};
    margin-bottom: 1rem;
  }
`

export const TechsContainer = styled.div`
  overflow: hidden;
  padding: 1rem 0;
  width: 100%;
  position: relative;

  ul {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    overflow-wrap: break-word;

    li {
      ${centralize}
      background-color: ${(props) => props.theme.background.primary};
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
      gap: 0.5rem;
      cursor: pointer;

      &:hover {
        filter: contrast(1.1);
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile},
    ${({ theme }) => theme.device.tablet} {
    ul {
      display: flex;
      flex-wrap: nowrap;
      width: max-content;
      ${ScrollAnimation}
      opacity: 0.4;
      margin-bottom: 2rem;
    }
  }
`

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem 0;

  &:has(> div:hover) > div {
    filter: brightness(0.9);
  }

  &:has(> div:hover) > div:hover {
    filter: brightness(1);

    ::before {
      width: 100%;
    }

    .cardIcon {
      ${FloatAnimation}
    }
  }

  @media ${({ theme }) => theme.device.mobile},
    ${({ theme }) => theme.device.tablet} {
    display: flex;
    overflow-x: scroll;

    ${CardBox} {
      height: 400px;
      width: 300px;
      flex-shrink: 0;
    }
  }
`
