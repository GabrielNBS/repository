'use client';

import React from 'react';
import { PETALS, SIZE_PX } from '../../../assets/Petals.config';

export default function SakuraPetals() {
  return (
    <>
      {PETALS.map((p, index) => (
        <svg
          key={index}
          className="sakura-petal pointer-events-none absolute fill-current select-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: SIZE_PX[p.size],
            height: SIZE_PX[p.size],
            opacity: p.opacity,
            color: 'var(--color-accent)',
            filter: 'brightness(1.15) saturate(0.85)',
            transform: `rotate(${p.rotate}deg)`
          }}
          data-size={p.size}
          data-direction={p.direction}
          viewBox="-10 0 40 40"
          aria-hidden="true"
        >
          <path d={p.path} />
        </svg>
      ))}
    </>
  );
}
