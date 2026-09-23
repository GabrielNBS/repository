import Link from 'next/link';
import styles from './PortfolioFooter.module.css';

export default function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <span>Gabriel Nascimento © 2026</span>
      <Link href="#hero-title">Voltar ao topo ↑</Link>
    </footer>
  );
}
