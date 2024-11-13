import styled from 'styled-components'
import TitlesProps from '../../types/TitleProps'

const textStyles = {
  h1: { fontSize: '4rem', fontWeight: '900' },
  h2: { fontSize: '2.5rem', fontWeight: '700' },
  h3: { fontSize: '1.75rem', fontWeight: '500' },
  p: { fontSize: '1rem', fontWeight: '400' },
} as const

export const Text = styled.div<TitlesProps>`
  color: ${(props) => props.theme.color.primary};
  font-size: ${({ as = 'p' }) =>
    textStyles[as as keyof typeof textStyles].fontSize};
  font-weight: ${({ as = 'p' }) =>
    textStyles[as as keyof typeof textStyles].fontWeight};
  line-height: 1.5;

  text-shadow: ${(props) =>
    props.$shadowLetter ? '-9px 6px 20px rgba(0, 0, 0, 0.7);' : 'none'};
`
