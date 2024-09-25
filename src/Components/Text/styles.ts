import styled, { css } from 'styled-components'
import TitlesProps from '../../types/TitleProps'

export const Text = styled.p<{
  $primary?: boolean
  $secondary?: boolean
}>`
  color: ${(props) => props.theme.color.primary};
  font-size: 1rem;
`

export const Title = styled.h1<TitlesProps>`
  color: ${(props) => props.theme.color.primary};

  font-size: ${(props) =>
    props.$small
      ? '1.25rem'
      : props.$medium
        ? '2rem'
        : props.$large
          ? '4rem'
          : '1rem'};

  font-weight: ${(props) =>
    props.$small
      ? '400'
      : props.$medium
        ? '700'
        : props.$large
          ? '900'
          : '400'};

  text-shadow: ${(props) =>
    props.$shadowLetter ? '-9px 6px 20px rgba(0, 0, 0, 0.7);' : 'none'};
`
