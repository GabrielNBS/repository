import React, { useRef } from 'react';
import TransitionLink from './TransitionLink';
import { BrushStroke } from './BrushStroke';
import { useBrushAnimation } from '@/hooks/useBrushAnimation';

interface NavItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function NavItem({
  label,
  href,
  onClick,
  isActive = false,
  ariaLabel,
  className = '',
}: NavItemProps) {
  // Referências para o elemento interativo principal, o texto e o path da pincelada
  const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Lógica de animação do GSAP aplicada via hook
  useBrushAnimation({ triggerRef, pathRef, textRef });

  const commonProps = {
    onClick,
    'aria-label': ariaLabel || label,
    'aria-current': isActive ? ('page' as const) : undefined,
    className: `group relative flex items-center justify-center py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-[4px] cursor-pointer transition-all duration-300 ${className}`,
  };

  const textElement = (
    <span
      ref={textRef}
      className={`text-nav font-nav tracking-wide transition-colors duration-300 select-none ${
        isActive ? 'text-accent' : 'text-muted'
      }`}
    >
      {label}
    </span>
  );

  if (href) {
    return (
      <TransitionLink
        href={href}
        ref={triggerRef as React.Ref<HTMLAnchorElement>}
        {...commonProps}
      >
        {textElement}
        <BrushStroke ref={pathRef} />
      </TransitionLink>
    );
  }

  return (
    <button
      type="button"
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      {...commonProps}
    >
      {textElement}
      <BrushStroke ref={pathRef} />
    </button>
  );
}
