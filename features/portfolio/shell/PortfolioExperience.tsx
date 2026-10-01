'use client';

import { useRef, type PropsWithChildren } from 'react';
import { ProjectCursorProvider } from '../projects/cursor/ProjectCursorProvider';
import { usePortfolioMotion } from './portfolioHomeMotion';
import styles from './PortfolioHome.module.css';

/**
 * Limite cliente da home. O conteúdo editorial continua renderizado no servidor;
 * apenas o root que coordena motion e cursor é hidratado no navegador.
 */
export default function PortfolioExperience({ children }: PropsWithChildren) {
  const root = useRef<HTMLElement>(null);
  usePortfolioMotion(root);

  return (
    <ProjectCursorProvider>
      <main ref={root} className={styles.main} tabIndex={-1}>
        <a className={styles.skipLink} href="#hero-title">
          Pular para o conteúdo
        </a>
        {children}
      </main>
    </ProjectCursorProvider>
  );
}
