import styled from 'styled-components'
import { GradientText } from '../../styles/GlobalStyle'
import { centralize } from '../../keyframes/Centralize'

export const Box = styled.section`
  display: grid;
  min-height: 100vh;
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
    ${GradientText}
    margin-bottom: 0.5rem;
  }
`

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
      font-style: italic;

      p {
        font-weight: 700;
      }
    }
  }

  > div {
    display: flex;
    gap: 1rem;
  }
`

export const VideoProjectBox = styled.div`
  ${centralize}
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 70%;
    object-fit: contain;
  }

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    > div {
      display: flex;
      gap: 2rem;
    }
  }
`
