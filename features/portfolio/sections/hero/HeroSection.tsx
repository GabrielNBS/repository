'use client';

import { useRef } from 'react';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import styles from './HeroSection.module.css';
import { useHeroMotion } from './heroMotion';

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  useHeroMotion(root);

  return (
    <section
      ref={root}
      className={`${styles.section} relative flex min-h-[min(58rem,100svh)] flex-col justify-between gap-12 px-[clamp(1.25rem,3vw,3.75rem)] pt-32 pb-7 max-[800px]:gap-9 max-[800px]:pt-28`}
      aria-labelledby="hero-title"
      data-motion="hero"
    >
      <div
        className="text-label text-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-bold tracking-[0.1em] uppercase"
        data-motion="hero-meta"
      >
        <p className="m-0">Gabriel Nascimento / Desenvolvedor Front-end</p>
        <p className="m-0 max-[800px]:hidden">São Paulo, Brasil</p>
      </div>

      <div className={styles.composition}>
        <div className="relative z-1 min-w-0">
          <p
            className="text-label text-muted mb-6 flex items-center gap-3 font-bold tracking-[0.12em] uppercase"
            data-motion="hero-eyebrow"
          >
            <span className="bg-ink/40 h-px w-7" aria-hidden="true" />
            Clareza na forma. Cuidado no código.
          </p>
          <h1
            id="hero-title"
            className="m-0 font-normal"
            aria-label="Interfaces com intenção."
            tabIndex={-1}
          >
            <span className={styles.lineMask}>
              <span className={styles.titleLine} data-motion="hero-line">
                Interfaces
              </span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.secondLine} data-motion="hero-line">
                com{' '}
                <em className={styles.emphasis}>
                  intenção<span className="text-peach">.</span>
                </em>
              </span>
            </span>
          </h1>
        </div>

        <div className={styles.study} aria-hidden="true">
          <div data-motion="hero-study-drift">
            <div className={styles.studyFrame} data-motion="hero-study">
              <div className={styles.backSheet} data-motion="hero-sheet" />
              <div className={styles.specimen} data-motion="hero-sheet">
                <div className="text-utility-xs flex items-center justify-between font-bold tracking-widest uppercase">
                  <span>Forma & função</span>
                  <span>↗</span>
                </div>
                <div className={styles.letterform}>
                  <span className={styles.disc} data-motion="hero-disc" />
                  <span className={styles.letterSans}>a</span>
                  <span className={styles.letterSerif}>a</span>
                  <span className={styles.baseline} />
                </div>
                <div className="text-utility-2xs text-muted border-ink/15 border-t pt-3 font-bold tracking-wider uppercase">
                  <span>O detalhe faz parte.</span>
                </div>
              </div>
              <div className={styles.selection} data-motion="hero-selection">
                <i />
                <i />
                <i />
                <i />
                <svg className={styles.cursor} viewBox="0 0 32 40" fill="none">
                  <path
                    d="M3 3L27 24L17 25L12 36L3 3Z"
                    fill="currentColor"
                    stroke="var(--color-paper)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.cursorLabel}>no detalhe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-8 pb-10 max-[800px]:grid-cols-1 max-[800px]:gap-6 max-[800px]:pb-8">
          <p
            className="text-intro text-muted m-0 max-w-112 leading-[1.45] tracking-[-0.025em]"
            data-motion="hero-intro"
          >
            Transformo ideias em experiências digitais com personalidade. Do primeiro esboço à
            interface em movimento.
          </p>
          <a
            className="group text-label bg-ink text-paper hover:bg-peach hover:text-ink focus-visible:bg-peach focus-visible:text-ink inline-flex min-h-14 w-fit items-center gap-6 rounded-full py-2 pr-2 pl-6 font-bold tracking-[0.08em] uppercase transition-colors duration-300"
            href="#projetos"
            data-motion="hero-action"
          >
            Explorar projetos
            <span className="bg-paper text-ink flex size-10 items-center justify-center rounded-full">
              <FiArrowUpRight
                className="text-action-icon ease-editorial transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
        <div className="bg-ink/20 h-px origin-left" data-motion="hero-rule" />
        <div
          className="text-label text-muted flex flex-wrap items-center justify-between gap-3 pt-5 font-bold tracking-[0.08em] uppercase"
          data-motion="hero-footer"
        >
          <span>Design sensível. Desenvolvimento preciso.</span>
          <span className="inline-flex items-center gap-3">
            Continue explorando <FiArrowDown className="text-icon" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}
