import styled from 'styled-components';
import { centralize } from '../../keyframes/Centralize';
import { CardBox } from '../../Components/SkillCard/styles';
import { FloatAnimation } from '../../keyframes/FloatAnimation';
import { ScrollAnimation } from '../../keyframes/ScrollAnimation';

export const AboutSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  height: 100svh;
  width: 100%;
  padding: 0 4rem;
  gap: 1rem;
  animation: all ease 0.2s;

  @media ${({ theme }) => theme.device.mobile}, ${({ theme }) => theme.device.tablet} {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 0;
    justify-content: center;
  }
`;
export const DescriptionContainer = styled.div`
  ${centralize}
  flex-direction: column;
  gap: 2rem;
`;
export const TextContainer = styled.div`
  @media ${({ theme }) => theme.device.mobile}, ${({ theme }) => theme.device.tablet} {
    text-align: center;
  }

  h3 {
    color: ${(props) => props.theme.color.secondary};
    margin-bottom: 1rem;
  }
`;

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
  }

  @media ${({ theme }) => theme.device.mobile}, ${({ theme }) => theme.device.tablet} {
    ul {
      display: flex;
      flex-wrap: nowrap;
      width: max-content;
      ${ScrollAnimation}
      opacity: 0.4;
      margin-bottom: 2rem;
    }
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem 0;
  transition: all ease 0.1s;

  &:has(> div:hover) > div {
    filter: opacity(0.3);
    transition: all ease 0.1s;
  }

  &:has(> div:hover) > div:hover {
    filter: opacity(1);
    transition: all ease 0.1s;

    ::before {
      width: 100%;
    }

    .cardIcon {
      ${FloatAnimation}
    }
  }

  @media ${({ theme }) => theme.device.mobile}, ${({ theme }) => theme.device.tablet} {
    display: flex;
    overflow-x: scroll;

    ${CardBox} {
      height: 400px;
      width: 300px;
      flex-shrink: 0;
    }
  }
`;
