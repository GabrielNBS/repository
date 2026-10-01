'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from './HeroSection.module.css';
import { useHeroMotion } from './heroMotion';

type StickerKind = 'solutions' | 'create' | 'scale' | 'animate' | 'optimize' | 'connect';

type AnimatedWord = {
  id: string;
  prefix: string;
  letter: string;
  suffix: string;
  sticker: StickerKind;
  alt: string;
};

const animatedWords: AnimatedWord[] = [
  {
    id: 'criar',
    prefix: 'Que cr',
    letter: 'i',
    suffix: 'am',
    sticker: 'create',
    alt: 'Criação e engenharia front-end'
  },
  {
    id: 'escalar',
    prefix: 'Que esc',
    letter: 'a',
    suffix: 'lam',
    sticker: 'scale',
    alt: 'Arquitetura escalável com Next.js'
  },
  {
    id: 'animar',
    prefix: 'Que an',
    letter: 'i',
    suffix: 'mam',
    sticker: 'animate',
    alt: 'Interações e motion com GSAP'
  },
  {
    id: 'otimizar',
    prefix: 'Que ot',
    letter: 'i',
    suffix: 'mizam',
    sticker: 'optimize',
    alt: 'Performance e Web Vitals'
  },
  {
    id: 'conectar',
    prefix: 'Que con',
    letter: 'e',
    suffix: 'ctam',
    sticker: 'connect',
    alt: 'Integrações de sistemas e APIs'
  }
];

const loaderBallAssets = [
  { height: 1254, id: 'cream', src: '/images/hero/loader-ball-cream.png', width: 1254 },
  { height: 1254, id: 'lilac', src: '/images/hero/loader-ball-lilac.png', width: 1254 },
  { height: 1254, id: 'peach', src: '/images/hero/loader-ball-peach.png', width: 1254 }
] as const;

const stickerFrames: Record<StickerKind, readonly string[]> = {
  solutions: [
    '/images/hero/title-elements/solucoes-frame-04.png',
    '/images/hero/title-elements/solucoes-frame-03.png',
    '/images/hero/title-elements/solucoes-frame-02.png',
    '/images/hero/title-elements/solucoes-frame-01.png',
    '/images/hero/title-elements/solucoes-frame-02.png',
    '/images/hero/title-elements/solucoes-frame-03.png'
  ],
  create: ['/images/hero/title-elements/criam-code.png'],
  scale: ['/images/hero/title-elements/escalam.png'],
  animate: [
    '/images/hero/title-elements/animam-frame-01.png',
    '/images/hero/title-elements/animam-frame-02.png',
    '/images/hero/title-elements/animam-frame-03.png',
    '/images/hero/title-elements/animam-frame-04.png',
    '/images/hero/title-elements/animam-frame-05.png'
  ],
  optimize: ['/images/hero/title-elements/otimizam.png'],
  connect: ['/images/hero/title-elements/conectam-dialogo.png']
};

function StickerArtwork({ kind }: { kind: StickerKind }) {
  const frames = stickerFrames[kind];
  const isEntryArtwork = kind === 'solutions';
  const motionClass =
    frames.length === 6 ? styles.stopMotionSix : frames.length === 5 ? styles.stopMotionFive : '';

  return (
    <span
      className={[styles.artworkFrames, motionClass].filter(Boolean).join(' ')}
      data-artwork={kind}
      aria-hidden="true"
    >
      {frames.map((src, index) => (
        <Image
          key={`${kind}-${index}`}
          alt=""
          aria-hidden="true"
          className={styles.artworkFrame}
          data-entry-asset={isEntryArtwork ? '' : undefined}
          draggable={false}
          height={1254}
          loading={isEntryArtwork ? 'eager' : 'lazy'}
          quality={75}
          sizes="160px"
          src={src}
          width={1254}
        />
      ))}
      {kind === 'solutions' ? (
        <Image
          alt=""
          aria-hidden="true"
          className={styles.solutionLamp}
          data-entry-asset=""
          draggable={false}
          height={1254}
          loading="eager"
          quality={75}
          sizes="88px"
          src="/images/hero/title-elements/solucoes-lampada.png"
          width={1254}
        />
      ) : null}
    </span>
  );
}

function AnimatedWordLine({ word }: { word: AnimatedWord }) {
  return (
    <span className={styles.dynamicWord} data-motion="dynamic-word" data-word={word.id}>
      <span className={styles.wordContent} data-motion="word-content">
        <span>{word.prefix}</span>
        <span className={styles.fakeLetter} data-motion="fake-letter">
          <span className={styles.hiddenLetter} aria-hidden="true">
            {word.letter}
          </span>
          <span
            className={styles.stickerShell}
            data-motion="sticker"
            role="img"
            aria-label={word.alt}
          >
            <span className={styles.stickerArtwork}>
              <StickerArtwork kind={word.sticker} />
            </span>
          </span>
        </span>
        <span>{word.suffix}</span>
      </span>
    </span>
  );
}

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  useHeroMotion(root);

  return (
    <section id="inicio" ref={root} className={styles.section} aria-labelledby="hero-title">
      <noscript>
        <style>{`[data-motion="hero-loader"] { display: none !important; }`}</style>
      </noscript>

      <div
        className={styles.loader}
        data-loader-state="pending"
        data-motion="hero-loader"
        aria-hidden="true"
      >
        <div className={styles.loaderContent}>
          <span className={styles.loaderProgress} data-motion="hero-loader-index">
            000%
          </span>
          <div className={styles.loaderBalls} data-motion="loader-balls">
            {loaderBallAssets.map(({ height, id, src, width }) => (
              <Image
                key={id}
                alt=""
                aria-hidden="true"
                className={styles.loaderBall}
                data-motion="loader-ball"
                data-entry-asset=""
                draggable={false}
                height={height}
                loading="eager"
                quality={75}
                sizes="(max-width: 800px) 64px, 112px"
                src={src}
                width={width}
              />
            ))}
          </div>
        </div>
        <span className={styles.loaderCaption}>Gabriel do Nascimento / 2026</span>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.badge} data-motion="hero-reveal">
          Desenvolvedor Front-end • React & Next.js • 2026
        </p>

        <div className={styles.titleLoopBox} data-motion="title-loop-box">
          <div className={styles.titleLoop} data-motion="title-loop">
            <div className={[styles.titleRow, styles.introRow].join(' ')} data-motion="title-row">
              <span className={styles.titleContent} data-motion="title-content">
                Especializado em
              </span>
            </div>
            <h1
              id="hero-title"
              className={[styles.titleRow, styles.staticRow].join(' ')}
              data-motion="title-row"
            >
              <span className={styles.titleContent} data-motion="title-content">
                <span>soluções</span>
                <span className={styles.fakeLetter} data-motion="static-slot" aria-hidden="true">
                  <span className={styles.stickerShell} data-motion="static-sticker">
                    <span className={styles.stickerArtwork}>
                      <StickerArtwork kind="solutions" />
                    </span>
                  </span>
                </span>
              </span>
            </h1>
            <div className={[styles.titleRow, styles.dynamicRow].join(' ')} data-motion="title-row">
              {animatedWords.map((word) => (
                <AnimatedWordLine key={word.id} word={word} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
