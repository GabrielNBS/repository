import styled from 'styled-components';
import { centralize } from '../../keyframes/Centralize';
import { FloatAnimation } from '../../keyframes/FloatAnimation';
import { ShakeAnimation } from '../../keyframes/ShakeAnimation';

export const Box = styled.section`
  display: grid;
  max-height: 100vh;
  width: 100%;
  grid-template-columns: 40% 60%;
  justify-content: center;
  padding: 0 4rem;
  gap: 2rem;
  position: relative;
  overflow-x: hidden;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    padding: 0;
  }

  &::before {
    content: attr(data-number);
    position: absolute;
    background-color: transparent;
    top: 1rem;
    right: 1rem;
    font-size: 8rem;
    font-weight: bold;
    -webkit-text-stroke: 2px ${(props) => props.theme.shadow.secondary};
    opacity: 0.5;

    @media ${({ theme }) => theme.device.mobile} {
      top: 0;
      font-size: 5rem;
    }
  }

  h2 {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.color.primary};
  width: 100%;

  > p {
    filter: contrast(0.5);
    margin-bottom: 1rem;
  }

  ul {
    margin: 0 0 3rem 0;

    li {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      gap: 0.5rem;

      p {
        font-weight: 700;
      }
    }
  }

  > div {
    display: flex;
    gap: 1rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      &:hover svg {
        ${ShakeAnimation}
      }
    }
  }
`;

export const VideoProjectBox = styled.div`
  ${centralize}
  max-width: 100%;
  height: auto;

  img {
    width: 100%;
    object-fit: contain;
    ${FloatAnimation}

    @media ${({ theme }) => theme.device.mobile} {
      min-width: 300px;
      max-width: 350px;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 80%;

    > div {
      display: flex;
      gap: 2rem;
    }

    button {
      background-color: ${(props) => props.theme.color.secondary};
      color: ${(props) => props.theme.color.tertiary};
    }
  }
`;
