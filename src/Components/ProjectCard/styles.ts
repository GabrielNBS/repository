import styled, { css } from 'styled-components'
import { GradientText } from '../../styles/GlobalStyle'
import { centralize } from '../../keyframes/Centralize'

export const Box = styled.section`
  height: 100dvh;
  display: grid;
  grid-template-columns: 40% 60%;
  justify-content: center;
  padding: 0 4rem;
  gap: 2rem;

  h2 {
    ${GradientText}
  }

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`

export const DescriptionProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.color.primary};
  width: 100%;

  p {
    opacity: 0.8;
  }

  ul {
    margin: 0 0 3rem 0;

    li {
      display: flex;
      margin: 1rem 0;
      gap: 0.5rem;
      font-style: italic;
      font-weight: 600;
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
