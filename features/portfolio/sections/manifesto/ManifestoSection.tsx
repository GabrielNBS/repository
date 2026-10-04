'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './ManifestoSection.module.css';
const ManifestoMotion = dynamic(() => import('./ManifestoMotion'), { ssr: false });
const ManifestoMobileMotion = dynamic(() => import('./ManifestoMobileMotion'), { ssr: false });

const beats = [
  {
    principle: 'Clareza',
    title: (
      <>
        Antes do código,
        <br />
        <em>entendo o problema</em>
      </>
    ),
    copy: 'Entendo o que a interface precisa resolver antes de escolher como construir. Isso orienta os componentes, os estados e o fluxo de uso.'
  },
  {
    principle: 'Interação',
    title: (
      <>
        Cada ação merece
        <br />
        <em>uma resposta</em>
      </>
    ),
    copy: 'Do clique ao carregamento, cuido de como a interface responde. Estados claros e movimento com propósito ajudam a experiência a fazer sentido.'
  },
  {
    principle: 'Estrutura',
    title: (
      <>
        Cuidado na tela,
        <br />
        <em>e no código</em>
      </>
    ),
    copy: 'Construo pensando em quem usa e em quem vai dar continuidade. Componentes reutilizáveis, acessibilidade e performance fazem parte desse cuidado.'
  }
] as const;

export default function ManifestoSection() {
  const root = useRef<HTMLElement>(null);
  const [motionMode, setMotionMode] = useState<'desktop' | 'mobile' | 'none'>('none');
  useEffect(() => {
    const media = window.matchMedia('(min-width: 801px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotionMode(reduced.matches ? 'none' : media.matches ? 'desktop' : 'mobile');
    sync();
    media.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  return (
    <section id="manifesto" ref={root} className={styles.section} aria-labelledby="manifesto-title">
      {motionMode === 'desktop' && <ManifestoMotion root={root} />}
      {motionMode === 'mobile' && <ManifestoMobileMotion root={root} />}
      {motionMode === 'desktop' && (
        <div className="sr-only">
          {beats.map((beat) => (
            <article key={beat.principle}>
              <h3>{beat.title}</h3>
              <p>{beat.principle}. {beat.copy}</p>
            </article>
          ))}
        </div>
      )}
      <div className={styles.pin} data-manifesto-pin>
        <div className={styles.stage}>
          <div className={styles.atmosphere} aria-hidden="true" data-manifesto-atmosphere />

          <div className={styles.intro} data-manifesto-intro>
            <p>Uma interface vai além da tela</p>
            <h2 id="manifesto-title" data-manifesto-intro-title>
              Cada detalhe pede uma decisão
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
                aria-hidden={motionMode === 'desktop' ? true : undefined}
                tabIndex={motionMode === 'desktop' ? -1 : 0}
              >
                {beats.map((beat, index) => (
                  <article
                    key={beat.principle}
                    className={styles.beat}
                    data-manifesto-beat
                    data-active={index === 0 ? 'true' : 'false'}
                    aria-label={`${beat.principle}, princípio ${index + 1} de ${beats.length}`}
                    aria-roledescription="cartão"
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
              Das decisões à entrega
            </span>
            <p aria-label="Agora, o código entra em prática.">
              <span className={styles.closingLine} aria-hidden="true" data-manifesto-closing-part>
                Agora, o código
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
