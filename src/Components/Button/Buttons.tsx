// components/Button/index.tsx
import React from 'react';
import { ButtonProps } from '../../types/ButtonProps';
import { Button as StyledButton } from './styles';

export default function Button({
  children,
  href,
  target,
  rel,
  as = 'button',
  type = 'button',
  onClick
}: ButtonProps) {
  if (as === 'a') {
    return (
      <StyledButton as="a" href={href} target={target} rel={rel}>
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledButton as="button" type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
