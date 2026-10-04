import Image from 'next/image';
import styles from './HeroPaperEdge.module.css';

export default function HeroPaperEdge() {
  return (
    <div className={styles.boundary} aria-hidden="true">
      <div className={styles.paper}>
        <Image
          alt=""
          src="/images/hero/paper-edge-fold.webp"
          width={2172}
          height={724}
          sizes="(max-width: 768px) 768px, 100vw"
          className={styles.artwork}
          draggable={false}
          loading="eager"
          quality={75}
        />
      </div>
    </div>
  );
}
