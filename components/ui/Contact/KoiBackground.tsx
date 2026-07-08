'use client';

import React from 'react';

export default function KoiBackground() {
  return (
    <>
      {/* Vídeo de Fundo (Koi Fish) integrado ao canvas */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.22] mix-blend-multiply transition-opacity duration-500"
      >
        <source src="/video/Stop_motion_watercolor_koi_fish.webm" type="video/webm" />
        <source src="/video/Stop_motion_watercolor_koi_fish.mp4" type="video/mp4" />
      </video>

      {/* Overlays de gradiente para suavizar e integrar o vídeo com as bordas do projeto */}
      <div className="from-canvas via-transparent to-canvas pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r" />
      <div className="from-canvas via-transparent to-canvas pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b" />
    </>
  );
}
