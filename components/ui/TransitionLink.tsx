'use client';

import React, { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransition } from './TransitionProvider';

type TransitionLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children: React.ReactNode;
    className?: string;
  };

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    const { navigate } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.button !== 0
      ) {
        return;
      }

      e.preventDefault();
      navigate(href.toString());
    };

    return (
      <Link href={href} className={className} onClick={handleClick} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;
