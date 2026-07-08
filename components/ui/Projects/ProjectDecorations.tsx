'use client';

import React from 'react';

export function LeftDecorations() {
  return (
    <div className="absolute left-8 top-16 bottom-16 hidden w-12 flex-col items-center justify-between pointer-events-none select-none xl:flex z-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <div className="w-px h-16 bg-line mt-2" />
        </div>
        <div
          className="text-muted text-[0.8rem] font-bold tracking-[0.25em] select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          プロジェクト
        </div>
        <div className="w-7 h-7 bg-accent flex items-center justify-center rounded-sm select-none p-1 shadow-sm opacity-90">
          <span
            className="font-heading text-paper leading-none text-center flex flex-col justify-center items-center h-full w-full select-none"
            style={{ fontFamily: 'var(--font-kaushan-script), serif' }}
          >
            <span className="text-[9px] font-bold leading-none tracking-tighter">制作</span>
          </span>
        </div>
      </div>
      <div className="text-muted text-lg animate-bounce mt-auto">
        ↓
      </div>
    </div>
  );
}

export function RightDecorations() {
  return (
    <div className="absolute right-8 top-16 bottom-16 hidden w-16 flex-col items-center justify-between pointer-events-none select-none xl:flex z-10">
      <div className="relative w-full flex-1 flex flex-col items-center justify-start gap-10 mt-16">
        <div className="relative w-16 h-16 opacity-30 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <defs>
              <filter id="sumi-enso" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <path
              d="M 50,15 A 35,35 0 1,1 42,16 Q 46,12 50,15"
              strokeLinecap="round"
              filter="url(#sumi-enso)"
            />
          </svg>
          <div className="absolute top-1/2 -right-3 w-2.5 h-2.5 rounded-full bg-accent opacity-85" />
        </div>

        <div className="grid grid-cols-4 gap-2.5 opacity-20 my-6">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-ink" />
          ))}
        </div>

        <div className="w-px h-36 bg-line" />
      </div>
    </div>
  );
}
