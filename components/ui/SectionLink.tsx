import React from 'react';
import { ArrowIcon } from './Icons';

type SectionLinkProps = {
  label: string;
  href: string;
};

export default function SectionLink({ label, href }: SectionLinkProps) {
  return (
    <a
      className="border-line text-muted hover:text-ink min-h-bridge text-ui inline-flex items-center justify-between border-r p-4 font-bold transition-all duration-180 last:border-r-0 hover:-translate-y-0.5 max-md:border-r-0 max-md:border-b max-md:last:border-b-0"
      href={href}
    >
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}
