import AppIcon from '@/features/portfolio/shared/AppIcon';
import Link from 'next/link';
import styles from './PortfolioFooter.module.css';

export default function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <span>Gabriel Nascimento © 2026</span>
      <Link href="#hero-title" className={styles.backToTop} aria-label="Voltar ao topo">
        <span className={styles.backToTopLabel}>Voltar ao topo</span>
        <AppIcon name="arrowUp" />
      </Link>
    </footer>
  );
}
