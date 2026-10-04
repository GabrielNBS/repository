'use client';

import AppIcon from '@/features/portfolio/shared/AppIcon';

import Link from 'next/link';
import { prepareProjectReturnTransition } from '../projects/projectReturnNavigation';

export default function ProjectBackLink({ className }: { className: string }) {
  return (
    <Link
      className={className}
      href="/?from=project#projetos"
      prefetch={true}
      onClick={prepareProjectReturnTransition}
    >
      <AppIcon name="arrowLeft" />
      Voltar
    </Link>
  );
}
