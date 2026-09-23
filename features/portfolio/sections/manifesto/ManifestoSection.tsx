'use client';

import { useRef } from 'react';
import styles from './ManifestoSection.module.css';
import { useManifestoStoryMotion } from './manifestoStoryMotion';

const beats = [
  {
    principle: 'Intenção',
    title: (
      <>
        Antes da tela,
        <br />
        <em>vem a escolha</em>
      </>
    ),
    copy: 'Eu começo retirando o excesso, até restar uma ideia que possa ser entendida sem pedir licença'
  },
  {
    principle: 'Ritmo',
    title: (
      <>
        Cada pausa
        <br />
        <em>também comunica</em>
      </>
    ),
    copy: 'Hierarquia, resposta e movimento conduzem o olhar. Nada aparece antes de ter um motivo para existir'
  },
  {
    principle: 'Forma',
    title: (
      <>
        A ideia ganha corpo
        <br />
        <em>e permanece</em>
      </>
    ),
    copy: 'Quando direção visual e código falam a mesma língua, a experiência deixa de ser interface e vira presença'
  }
] as const;

export default function ManifestoSection() {
  const root = useRef<HTMLElement>(null);
  useManifestoStoryMotion(root);

  return (
    <section ref={root} className={styles.section} aria-labelledby="manifesto-title">
      <div className={styles.pin} data-manifesto-pin>
        <div className={styles.stage}>
          <div className={styles.atmosphere} aria-hidden="true" data-manifesto-atmosphere />

          <div className={styles.intro} data-manifesto-intro>
            <p>Design não começa no software</p>
            <h2 id="manifesto-title" data-manifesto-intro-title>
              Começa com uma decisão
            </h2>
          </div>

          <div className={styles.keywords} aria-hidden="true">
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

            <div className={styles.frame} data-manifesto-frame>
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

              <div
                className={styles.beats}
                data-manifesto-beats
                role="region"
                aria-label="Princípios do manifesto"
                tabIndex={0}
              >
                {beats.map((beat, index) => (
                  <article
                    key={beat.principle}
                    className={styles.beat}
                    data-manifesto-beat
                    data-active={index === 0 ? 'true' : 'false'}
                    aria-label={`${beat.principle}, princípio ${index + 1} de ${beats.length}`}
                    aria-posinset={index + 1}
                    aria-roledescription="cartão"
                    aria-setsize={beats.length}
                  >
                    <div className={styles.beatDots} aria-hidden="true" data-manifesto-card-dots>
                      <span />
                      <span />
                      <span />
                    </div>
                    <p className={styles.beatMeta} data-manifesto-card-meta>
                      <span className={styles.beatKeyword} data-manifesto-card-keyword>
                        {beat.principle}
                      </span>
                    </p>
                    <h3
                      className={styles.beatTitle}
                      data-manifesto-beat-title
                      data-manifesto-card-title
                    >
                      {beat.title}
                    </h3>
                    <p className={styles.beatCopy} data-manifesto-card-copy>
                      {beat.copy}
                    </p>
                  </article>
                ))}
              </div>
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
                <span className={styles.closingWord}>entra</span>
                em prática
              </span>
            </p>
          </div>

          <footer className={styles.footer} data-manifesto-chrome>
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
