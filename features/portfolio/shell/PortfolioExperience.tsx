'use client';

import { useRef, type PropsWithChildren } from 'react';
import { ProjectCursorProvider } from '../projects/cursor/ProjectCursorProvider';
import { usePortfolioMotion } from './portfolioHomeMotion';
import styles from './PortfolioHome.module.css';
import AmbientBackground from '../shared/AmbientBackground';

/**
 * Limite cliente da home. O conteúdo editorial continua renderizado no servidor;
 * apenas o root que coordena motion e cursor é hidratado no navegador.
 */
type PortfolioExperienceProps = PropsWithChildren<{
  returnToProjects: boolean;
}>;

export default function PortfolioExperience({
  children,
  returnToProjects
}: PortfolioExperienceProps) {
  const root = useRef<HTMLElement>(null);
  usePortfolioMotion(root, returnToProjects);

  return (
    <ProjectCursorProvider>
      <main
        ref={root}
        className={styles.main}
        data-portfolio-home
        data-project-return-pending={returnToProjects ? 'true' : undefined}
        tabIndex={-1}
      >
        <AmbientBackground page={root} />
        <a className={styles.skipLink} href="#hero-title">
          Pular para o conteúdo
        </a>
        {children}
      </main>
    </ProjectCursorProvider>
  );
}
