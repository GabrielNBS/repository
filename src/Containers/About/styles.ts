import styled from 'styled-components';
import { centralize } from '../../keyframes/Centralize';
import { CardBox } from '../../Components/SkillCard/styles';
import { FloatAnimation } from '../../keyframes/FloatAnimation';
import { ScrollAnimation } from '../../keyframes/ScrollAnimation';

export const AboutSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
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

  > div {
    transition: filter 2s ease-in-out;
  }

  @media (hover: hover) and (pointer: fine) {
    &:has(> div:hover) > div {
      filter: opacity(0.3);
    }
  }

  &:has(> div:hover) > div:hover {
    filter: opacity(1);
    transition: filter 0.3s ease-in-out;

    &::before {
      width: 100%;

      transition: filter 0.3s ease-in-out;
    }

    .cardIcon {
      ${FloatAnimation}
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    display: block;

    ${CardBox} {
      height: 400px;
      width: 90%;
      flex-shrink: 0;
      margin-bottom: 1rem;
      justify-self: center;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    overflow-x: scroll;
    align-items: center;

    ${CardBox} {
      height: 400px;
      width: 300px;
      flex-shrink: 0;
      margin-bottom: 1rem;
    }
  }
`;
