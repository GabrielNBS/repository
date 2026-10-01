'use client';

import Link from 'next/link';
import { prepareProjectReturnTransition } from '../projects/projectReturnNavigation';

export default function ProjectBackLink({ className }: { className: string }) {
  return (
    <Link
      className={className}
      href="/?from=project#projetos"
      onClick={prepareProjectReturnTransition}
    >
      ← Voltar
    </Link>
  );
}
