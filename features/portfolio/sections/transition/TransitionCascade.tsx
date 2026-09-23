'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from './TransitionCascade.module.css';
import { useTransitionCascadeMotion } from './transitionCascadeMotion';

const paperBalls = [
  {
    className: styles.ballCream,
    depth: '0.3',
    height: 1254,
    src: '/images/hero/loader-ball-cream.png',
    width: 1254
  },
  {
    className: styles.ballLilac,
    depth: '0.58',
    height: 1254,
    src: '/images/hero/loader-ball-lilac.png',
    width: 1254
  },
  {
    className: styles.ballPeach,
    depth: '1',
    height: 1254,
    src: '/images/hero/loader-ball-peach.png',
    width: 1254
  }
] as const;

const fragments = [
  { className: styles.fragmentPeachA, depth: '0.82', tone: styles.peach },
  { className: styles.fragmentLilacA, depth: '0.52', tone: styles.lilac },
  { className: styles.fragmentCreamA, depth: '0.34', tone: styles.cream },
  { className: styles.fragmentPeachB, depth: '1.08', tone: styles.peach },
  { className: styles.fragmentLilacB, depth: '0.7', tone: styles.lilac },
  { className: styles.fragmentCreamB, depth: '0.42', tone: styles.cream },
  { className: styles.fragmentPeachC, depth: '0.92', tone: styles.peach },
  { className: styles.fragmentLilacC, depth: '0.48', tone: styles.lilac }
] as const;

export default function TransitionCascade() {
  const root = useRef<HTMLElement>(null);
  useTransitionCascadeMotion(root);

  return (
    <section
      ref={root}
      className={styles.section}
      aria-hidden="true"
      data-component="transition-cascade"
    >
      <div className={styles.atmosphere} data-transition-atmosphere />

      <svg
        className={styles.route}
        viewBox="0 0 1000 1180"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          data-transition-route
          d="M514 8C682 102 690 224 518 305C330 392 248 486 402 589C564 698 789 674 693 808C616 916 326 919 405 1062C430 1108 489 1140 520 1172"
        />
      </svg>

      <div className={styles.cascade}>
        {paperBalls.map((ball) => (
          <Image
            key={ball.src}
            src={ball.src}
            alt=""
            className={`${styles.ball} ${ball.className}`}
            data-transition-piece
            data-transition-ball
            data-transition-depth={ball.depth}
            draggable={false}
            height={ball.height}
            sizes="(max-width: 800px) 22vw, 13vw"
            width={ball.width}
          />
        ))}

        {fragments.map((fragment, index) => (
          <span
            key={`${fragment.className}-${index}`}
            className={`${styles.fragment} ${fragment.tone} ${fragment.className}`}
            data-transition-piece
            data-transition-fragment
            data-transition-depth={fragment.depth}
          />
        ))}

        <span
          className={`${styles.tape} ${styles.tapeA}`}
          data-transition-piece
          data-transition-support
          data-transition-depth="0.9"
        />
        <span
          className={`${styles.tape} ${styles.tapeB}`}
          data-transition-piece
          data-transition-support
          data-transition-depth="0.55"
        />
        <span
          className={`${styles.tape} ${styles.tapeC}`}
          data-transition-piece
          data-transition-support
          data-transition-depth="0.72"
        />

        <span
          className={`${styles.mark} ${styles.markA}`}
          data-transition-piece
          data-transition-support
          data-transition-depth="1.12"
        >
          ✳
        </span>
      </div>
    </section>
  );
}
