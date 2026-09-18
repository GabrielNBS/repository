'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import styles from './HeroSection.module.css';
import { useHeroMotion } from './heroMotion';

const frontEndWordmark = {
  height: 901,
  src: '/images/hero/front-end-collage-paper-bg.png',
  width: 1746
} as const;

const loaderBallAssets = [
  { height: 1254, id: 'cream', src: '/images/hero/loader-ball-cream.png', width: 1254 },
  { height: 1254, id: 'lilac', src: '/images/hero/loader-ball-lilac.png', width: 1254 },
  { height: 1254, id: 'peach', src: '/images/hero/loader-ball-peach.png', width: 1254 }
] as const;

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  useHeroMotion(root);

  return (
    <section ref={root} className={styles.section} aria-labelledby="hero-title">
      <noscript>
        <style>{`[data-motion="hero-loader"] { display: none !important; }`}</style>
      </noscript>

      <div className={styles.loader} data-motion="hero-loader" aria-hidden="true">
        <div className={styles.loaderContent}>
          <span className={styles.loaderProgress} data-motion="hero-loader-index">
            000%
          </span>
          <div className={styles.loaderBalls} data-motion="loader-balls" aria-hidden="true">
            {loaderBallAssets.map(({ height, id, src, width }) => (
              <Image
                key={id}
                src={src}
                alt=""
                aria-hidden="true"
                className={styles.loaderBall}
                data-motion="loader-ball"
                draggable={false}
                height={height}
                loading="eager"
                quality={78}
                width={width}
              />
            ))}
          </div>
        </div>
        <span className={styles.loaderCaption}>Gabriel do Nascimento / 2026</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.metaDrift} data-motion="hero-meta-drift">
          <div className={styles.meta}>
            <span>Portfólio / 26</span>
            <span>Juiz de Fora, BR</span>
            <span>Interfaces com intenção</span>
          </div>
        </div>

        <div className={styles.nameDrift} data-motion="hero-name-drift">
          <div className={styles.statement}>
            <span className={styles.statementEyebrow} data-motion="hero-name-support">
              Gabriel do Nascimento / Desenvolvedor front-end
            </span>
            <h1 id="hero-title" className={styles.statementTitle} data-motion="hero-title">
              <Image
                src={frontEndWordmark.src}
                alt="Front-end"
                className={styles.wordmark}
                height={frontEndWordmark.height}
                priority
                sizes="(max-width: 800px) 88vw, min(45vw, 46rem)"
                width={frontEndWordmark.width}
              />
              <em>com intenção</em>
            </h1>
            <p className={styles.statementCopy} data-motion="hero-name-support">
              Código com olhar de direção para transformar ideias em experiências que fazem sentido.
            </p>
            <a className={styles.statementAction} href="#manifesto-title" data-motion="hero-name-support">
              Ver o trabalho <FiArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.statementOrb} aria-hidden="true">
          <span />
        </div>

        <div className={styles.footerDrift} data-motion="hero-footer-drift">
          <div className={styles.footer}>
            <span>Gabriel do Nascimento / 2026</span>
            <span className={styles.scrollCue}>
              Role para abrir o manifesto <FiArrowDown aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
