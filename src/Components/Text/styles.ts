import styled, { css } from 'styled-components'
import TitlesProps from '../../types/TitleProps'

const textStyles = {
  hero: { fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900' }, // 48px - 80px
  h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900' }, // 40px - 64px
  h2: { fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '700' }, // 32px - 40px
  h3: { fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: '500' }, // 24px - 28px
  p: { fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', fontWeight: '400' }, // 16px - 18px
  label: { fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', fontWeight: '600' }, // 12px - 14px
} as const

export const Text = styled.div<TitlesProps>`
  ${({
    as = 'p',
    theme,
    $shadowLetter,
  }: {
    as?: keyof typeof textStyles
    theme: any
    $shadowLetter?: boolean
  }) => css`
    color: ${theme.color.primary};
    font-size: ${textStyles[as].fontSize};
    font-weight: ${textStyles[as].fontWeight};
    line-height: 1.5;

    ${$shadowLetter &&
    css`
      text-shadow: -9px 6px 20px rgba(0, 0, 0, 0.7);
    `}
  `}
`
