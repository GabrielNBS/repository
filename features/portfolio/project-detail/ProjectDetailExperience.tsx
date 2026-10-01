'use client';

import { useRef, type PropsWithChildren } from 'react';
import { useDetailMotion } from './projectDetailMotion';
import styles from './ProjectDetail.module.css';

/** Mantém a coreografia no cliente sem promover todo o conteúdo do case a Client Component. */
export default function ProjectDetailExperience({ children }: PropsWithChildren) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root);

  return (
    <main ref={root} className={styles.main} tabIndex={-1}>
      {children}
    </main>
  );
}
