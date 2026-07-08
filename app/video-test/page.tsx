'use client';

import React from 'react';
import ScrollFrameSequence from '@/components/video/ScrollFrameSequence';

export default function VideoTestPage() {
  return (
    <main className="bg-canvas w-full min-h-[300vh] relative">
      {/* Seção Hero de Teste (que será fixada) */}
      <section
        id="test-section"
        className="h-screen w-full relative flex items-center justify-center overflow-hidden border-b border-line"
      >
        {/* Sequência de Frames da Raposa Sumi-e no canto inferior direito */}
        <ScrollFrameSequence
          sequencePath="/frames/fox-sumi-e"
          triggerSelector="#test-section"
          className="bottom-0 right-0 w-[90dvw] md:w-[45dvw] max-w-[550px] aspect-[16/9]"
          canvasClassName="opacity-90"
        />

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 text-center px-4">
          <span className="text-accent text-label font-label tracking-[0.25em] mb-4 uppercase block select-none">
            Demonstração de Vídeo Zen
          </span>
          <h1 className="text-display font-heading text-ink leading-tight select-none">
            Raposa Sumi-e Scrubbing
          </h1>
          <p className="text-muted text-body mt-4 max-w-md mx-auto select-none">
            Role a página para baixo para animar a raposa em pinceladas tradicionais. O Hero ficará fixado até a animação terminar.
          </p>
        </div>
      </section>

      {/* Espaçador para rolagem pós-animação */}
      <section className="h-screen w-full flex items-center justify-center bg-paper relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-heading text-ink">Próxima Seção Liberada</h2>
          <p className="text-muted text-body mt-2">
            A raposa terminou de olhar para baixo e a rolagem continuou normalmente.
          </p>
        </div>
      </section>
    </main>
  );
}
