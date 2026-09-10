'use client';

import { useRef } from 'react';
import styles from './ManifestoSection.module.css';
import { useManifestoStoryMotion } from './manifestoStoryMotion';

const beats = [
  {
    number: '01',
    principle: 'Intenção',
    title: (
      <>
        Antes da tela,
        <br />
        <em>vem a escolha.</em>
      </>
    ),
    copy: 'Eu começo retirando o excesso, até restar uma ideia que possa ser entendida sem pedir licença.',
    tone: 'lilac'
  },
  {
    number: '02',
    principle: 'Ritmo',
    title: (
      <>
        Cada pausa
        <br />
        <em>também comunica.</em>
      </>
    ),
    copy: 'Hierarquia, resposta e movimento conduzem o olhar. Nada aparece antes de ter um motivo para existir.',
    tone: 'peach'
  },
  {
    number: '03',
    principle: 'Forma',
    title: (
      <>
        A ideia ganha corpo.
        <br />
        <em>E permanece.</em>
      </>
    ),
    copy: 'Quando direção visual e código falam a mesma língua, a experiência deixa de ser interface e vira presença.',
    tone: 'cream'
  }
] as const;

export default function ManifestoSection({ embedded = false }: { embedded?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useManifestoStoryMotion(root, { embedded });

  return (
    <section
      ref={root}
      className={`${styles.section} ${embedded ? styles.embeddedSection : ''}`}
      aria-labelledby="manifesto-title"
      data-manifesto-embedded={embedded ? 'true' : undefined}
      data-motion="manifesto-story"
    >
      <div className={styles.pin} data-manifesto-pin>
        <div className={styles.stage} data-manifesto-stage>
          <div className={styles.atmosphere} aria-hidden="true" data-manifesto-atmosphere />

          <header className={styles.chrome} data-manifesto-chrome>
            <span>01 / Manifesto</span>
            <span className={styles.counter}>
              Ato <b data-manifesto-counter>00</b> / 03
            </span>
          </header>

          <div className={styles.intro} data-manifesto-intro>
            <p>Design não começa no software.</p>
            <h2 id="manifesto-title" data-manifesto-intro-title>
              Começa com uma decisão.
            </h2>
          </div>

          <div className={styles.keywords} aria-hidden="true" data-manifesto-keywords>
            {beats.map((beat) => (
              <span key={beat.principle} className={styles.keyword} data-manifesto-keyword>
                {beat.principle}
              </span>
            ))}
          </div>

          <div className={styles.stack} data-manifesto-stack>
            <div
              className={`${styles.backCard} ${styles.backCardLilac}`}
              data-manifesto-card="back"
            />
            <div
              className={`${styles.backCard} ${styles.backCardPeach}`}
              data-manifesto-card="middle"
            />

            <div className={styles.frame} data-manifesto-frame data-manifesto-final-card>
              <svg
                className={styles.field}
                viewBox="0 0 1000 700"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <path
                  data-manifesto-blob
                  d="M500 42C722 20 915 152 920 350C926 558 748 666 500 658C252 666 74 558 80 350C86 142 278 64 500 42Z"
                />
                <path
                  data-manifesto-shape="rhythm"
                  d="M500 48C635 48 662 182 827 198C943 210 960 337 874 412C780 494 742 644 500 654C258 644 220 494 126 412C40 337 57 210 173 198C338 182 365 48 500 48Z"
                />
                <path
                  data-manifesto-shape="form"
                  d="M155 62C105 62 64 103 64 153V547C64 597 105 638 155 638H845C895 638 936 597 936 547V153C936 103 895 62 845 62H155Z"
                />
              </svg>

              <span className={styles.cardWord} aria-hidden="true" data-manifesto-card-word>
                entra
              </span>

              <div className={styles.beats}>
                {beats.map((beat, index) => (
                  <article
                    key={beat.principle}
                    className={styles.beat}
                    data-manifesto-beat
                    data-tone={beat.tone}
                    data-active={index === 0 ? 'true' : 'false'}
                  >
                    <p className={styles.beatMeta}>
                      <span>{beat.number}</span>
                      <span>{beat.principle}</span>
                    </p>
                    <h3 className={styles.beatTitle} data-manifesto-beat-title>
                      {beat.title}
                    </h3>
                    <p className={styles.beatCopy}>{beat.copy}</p>
                  </article>
                ))}
              </div>

              <span className={styles.frameIndex} aria-hidden="true" data-manifesto-frame-index>
                01
              </span>
            </div>

            <span className={styles.orbitTag} aria-hidden="true" data-manifesto-orbit-tag>
              em foco
            </span>
            <svg className={styles.orbitMap} viewBox="0 0 1000 700" aria-hidden="true">
              <path
                data-manifesto-orbit-path
                d="M120 350C120 132 300 48 500 48C720 48 880 148 880 350C880 560 704 652 500 652C286 652 120 554 120 350Z"
              />
            </svg>
          </div>

          <div className={styles.closing} data-manifesto-closing>
            <span className={styles.closingEyebrow} data-manifesto-closing-part>
              O manifesto termina aqui.
            </span>
            <p aria-label="Agora, a ideia entra em prática.">
              <span className={styles.closingLine} aria-hidden="true" data-manifesto-closing-part>
                Agora, a ideia
              </span>
              <span className={styles.closingAction} aria-hidden="true" data-manifesto-closing-part>
                <i className={styles.closingCardSlot} aria-hidden="true" data-manifesto-card-slot />
                <em>em prática.</em>
              </span>
            </p>
          </div>

          <footer className={styles.footer} data-manifesto-chrome>
            <span>Escolher · conduzir · permanecer</span>
            <span className={styles.progress} aria-hidden="true">
              <i data-manifesto-progress />
            </span>
            <span>Role para construir</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
