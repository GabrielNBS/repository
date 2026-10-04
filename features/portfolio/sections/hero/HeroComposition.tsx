import ScrollAnchor from './ScrollAnchor';
import styles from './HeroComposition.module.css';

export default function HeroComposition() {
  return (
    <div className={styles.composition} data-motion="hero-reveal">
      <div className={styles.scroll}><ScrollAnchor /></div>
    </div>
  );
}
