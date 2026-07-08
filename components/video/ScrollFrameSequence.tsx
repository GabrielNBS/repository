'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollSequence from '@/hooks/useScrollSequence';

interface ScrollFrameSequenceProps {
  /**
   * Caminho público para a pasta que contém a sequência de frames (ex: '/frames/fox-sumi-e')
   */
  sequencePath: string;
  /**
   * Seletor do container que será fixado pelo ScrollTrigger (geralmente a Hero Section inteira)
   */
  triggerSelector: string;
  /**
   * Classe CSS opcional para o wrapper do container
   */
  className?: string;
  /**
   * Classe CSS opcional para o canvas interno
   */
  canvasClassName?: string;
}

/**
 * Componente que renderiza uma sequência de frames em um Canvas 2D
 * sincronizada com a rolagem da página via GSAP ScrollTrigger.
 */
export default function ScrollFrameSequence({
  sequencePath,
  triggerSelector,
  className = 'absolute inset-0 h-full w-full',
  canvasClassName = 'opacity-70'
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  const { images, isLoading, progress: loadProgress } = useScrollSequence(sequencePath);

  // Registrar ScrollTrigger e renderizar os frames
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar preferências de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Desenhar um frame específico no Canvas aplicando a lógica de "object-fit: cover"
    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !canvas || !ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      // Escala cover
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, cx, cy, nw, nh);
    };

    // Redimensionar Canvas de acordo com o DPR (Retina displays)
    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Ajuste de escala do contexto para manter os desenhos proporcionais
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reseta transformações
      drawFrame(Math.min(images.length - 1, Math.floor(progressRef.current * images.length)));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let scrollTriggerInstance: globalThis.ScrollTrigger | null = null;

    if (prefersReducedMotion) {
      // Exibe apenas o frame inicial e não registra o ScrollTrigger de rolagem fixada
      drawFrame(0);
    } else {
      // Desenha o primeiro frame
      drawFrame(0);

      // Criar ScrollTrigger para fixar a seção e scrubbar a sequência
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: triggerSelector,
        start: 'top top',
        end: '+=150%', // 150% da viewport para rolar todos os frames suavemente
        pin: true,     // Fixa o Hero enquanto anima os frames
        scrub: 0.8,    // Transição suave/lag de rolagem
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const totalFrames = images.length;
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(self.progress * totalFrames)
          );
          drawFrame(frameIndex);
        }
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [images, isLoading, triggerSelector]);

  return (
    <div
      ref={containerRef}
      className={`absolute z-0 pointer-events-none select-none ${className}`}
      style={{
        maskImage: 'radial-gradient(circle at 100% 100%, black 20%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 20%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas z-20">
          <div className="w-16 h-[2px] bg-line overflow-hidden relative">
            <div
              className="bg-accent absolute top-0 bottom-0 left-0 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-note text-muted tracking-widest mt-4 uppercase">
            Carregando — {loadProgress}%
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block mix-blend-multiply ${canvasClassName}`}
        style={{ filter: 'contrast(1.6) brightness(1.2) grayscale(100%)' }}
      />
    </div>
  );
}
