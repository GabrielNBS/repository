import styled, { css } from 'styled-components';

const textStyles = {
  hero: { fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900' },
  h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900' },
  h2: { fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '700' },
  h3: { fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: '500' },
  p: { fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', fontWeight: '400' },
  label: { fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', fontWeight: '600' }
} as const;

interface StyledTextProps {
  $variant?: keyof typeof textStyles;
  as?: 'h1' | 'h2' | 'h3' | 'p' | undefined;
}

export const Text = styled.div.attrs<StyledTextProps>(({ as }) => ({
  as: as || 'p'
}))<StyledTextProps>`
  ${({ $variant = 'p', theme }) => css`
    color: ${theme.color.primary};
    font-size: ${textStyles[$variant].fontSize};
    font-weight: ${textStyles[$variant].fontWeight};
    line-height: 1.5;
  `}
`;
