import styled, { css } from 'styled-components'
import TitlesProps from '../../types/TitleProps'

export const Text = styled.p<{ $primary?: boolean; $secondary?: boolean }>`
  color: ${(props) => props.theme.colors.primary};
`

export const Title = styled.h1<TitlesProps>`
  color: ${({ as }) => {
    switch (as) {
      case 'h1':
        return 'blue' // Cor para H1
      case 'h2':
        return (props) => props.theme.colors.secondary // Cor para H2
      case 'h3':
        return 'red' // Cor para H3
      default:
        return 'blue' // Padrão para H1
    }
  }};

  font-size: ${(props) =>
    props.$small
      ? '1.25rem'
      : props.$medium
        ? '2rem'
        : props.$large
          ? '3rem'
          : '1rem'};
`
