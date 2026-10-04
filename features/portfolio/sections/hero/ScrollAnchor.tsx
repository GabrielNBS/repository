import AppIcon from '@/features/portfolio/shared/AppIcon';
import styles from './ScrollAnchor.module.css';

export default function ScrollAnchor() {
  return (
    <a
      className={styles.anchor}
      href="#manifesto"
      aria-label="Ir para o manifesto"
      data-motion="hero-reveal"
    >
      <span className={styles.track} aria-hidden="true">
        <AppIcon name="arrowDown" className={styles.stroke} />
      </span>
    </a>
  );
}
