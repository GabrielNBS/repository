'use client';

import { useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import styles from './HeroSection.module.css';
import { useHeroMotion } from './heroMotion';
import ManifestoSection from '../manifesto/ManifestoSection';

const name = 'Gabriel Nascimento';
const letters = Array.from(name.toUpperCase());

function LooseLetters({ motion }: { motion: 'hero' | 'loader' }) {
  return letters.map((letter, index) => (
    <span
      key={`${motion}-${index}`}
      className={letter === ' ' ? styles.space : styles.letter}
      data-motion={`${motion}-letter`}
      aria-hidden="true"
    >
      {letter === ' ' ? '\u00a0' : letter}
    </span>
  ));
}

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  useHeroMotion(root);

  return (
    <section ref={root} className={styles.section} aria-labelledby="hero-title" data-motion="hero">
      <noscript>
        <style>{`[data-motion="hero-loader"] { display: none !important; }`}</style>
      </noscript>

      <div className={styles.loader} data-motion="hero-loader" aria-hidden="true">
        <span className={styles.loaderIndex} data-motion="hero-loader-index">
          000
        </span>
        <div className={styles.loaderWord} data-motion="hero-loader-word">
          <LooseLetters motion="loader" />
        </div>
        <span className={styles.loaderCaption}>Gabriel do Nascimento / 2026</span>
      </div>

      <div className={styles.stage} data-motion="hero-stage">
        <div className={styles.metaDrift} data-motion="hero-meta-drift">
          <div className={styles.meta} data-motion="hero-meta">
            <span>Juiz de Fora, BR</span>
            <span>GMT−3</span>
            <span>21.7642° S, 43.3503° W</span>
          </div>
        </div>

        <div className={styles.nameDrift} data-motion="hero-name-drift">
          <h1 id="hero-title" className={styles.name} aria-label="Gabriel do Nascimento">
            <span className={styles.nameLetters}>
              <LooseLetters motion="hero" />
            </span>
          </h1>
        </div>

        <div className={styles.cardDrift} data-motion="hero-card-drift">
          <div className={styles.cardStage} data-motion="hero-card-stage">
            <ManifestoSection embedded />
          </div>
        </div>

        <div className={styles.leftRoleDrift} data-motion="hero-left-role-drift">
          <p className={styles.leftRole} data-motion="hero-left-role">
            Desenvolvedor
          </p>
        </div>

        <div className={styles.rightRoleDrift} data-motion="hero-right-role-drift">
          <p className={styles.rightRole} data-motion="hero-right-role">
            Front-end
          </p>
        </div>

        <div className={styles.footerDrift} data-motion="hero-footer-drift">
          <div className={styles.footer} data-motion="hero-footer">
            <span>Interfaces com intenção</span>
            <span className={styles.scrollCue}>
              Role para explorar <FiArrowDown aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
