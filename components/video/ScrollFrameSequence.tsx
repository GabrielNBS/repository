'use client';

import { useRef, useEffect } from 'react';
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
   * Seletor opcional para o elemento a ser pinado. Se não fornecido, pina o triggerSelector.
   */
  pinSelector?: string;
  /**
   * Callback executado quando o carregamento de todos os frames é concluído.
   */
  onLoadComplete?: () => void;
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
  pinSelector,
  onLoadComplete,
  className = 'absolute inset-0 h-full w-full',
  canvasClassName = 'opacity-70'
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const lastFrameIndexRef = useRef(-1);

  const { images, isLoading, progress: loadProgress } = useScrollSequence(sequencePath);

  // Notificar quando o carregamento terminar
  useEffect(() => {
    if (!isLoading && images.length > 0) {
      onLoadComplete?.();
    }
  }, [isLoading, images, onLoadComplete]);

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
      const frameIndex = Math.min(
        images.length - 1,
        Math.floor(progressRef.current * images.length)
      );
      lastFrameIndexRef.current = frameIndex;
      drawFrame(frameIndex);
    };

    resizeCanvas();

    // Debounce do resize + refresh do ScrollTrigger para manter o pin/scrub
    // sincronizados quando a viewport muda de tamanho (rotação, teclado mobile, etc.)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        scrollTriggerInstance?.refresh();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

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
        pin: pinSelector !== undefined ? pinSelector : true, // Fixa o elemento especificado
        scrub: 0.8, // Transição suave/lag de rolagem
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const totalFrames = images.length;
          const frameIndex = Math.min(totalFrames - 1, Math.floor(self.progress * totalFrames));

          // Evita redesenhar quando o índice do frame não mudou —
          // o scrub dispara onUpdate quase a cada RAF, mas o frame inteiro
          // só muda a cada 1/totalFrames de progresso.
          if (frameIndex !== lastFrameIndexRef.current) {
            lastFrameIndexRef.current = frameIndex;
            drawFrame(frameIndex);
          }
        }
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [images, isLoading, triggerSelector, pinSelector]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute z-0 select-none overflow-hidden ${className}`}
      style={{
        maskImage:
          'radial-gradient(circle at center, black 25%, rgba(0, 0, 0, 0.8) 50%, transparent 72%)',
        WebkitMaskImage:
          'radial-gradient(circle at center, black 25%, rgba(0, 0, 0, 0.8) 50%, transparent 72%)'
      }}
    >
      {isLoading && (
        <div className="bg-canvas absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="bg-line relative h-[2px] w-16 overflow-hidden">
            <div
              className="bg-accent absolute top-0 bottom-0 left-0 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-note text-muted mt-4 tracking-widest uppercase">
            Carregando — {loadProgress}%
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`block h-full w-full mix-blend-multiply ${canvasClassName}`}
        style={{ filter: 'contrast(1.65) brightness(1.15) grayscale(100%)' }}
      />
      {/* Overlay circular para suavizar e ocultar as bordas do vídeo, fundindo com bg-canvas */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, var(--color-canvas) 85%)',
          filter: 'blur(6px)',
          boxShadow: 'inset 0 0 40px 20px var(--color-canvas), 0 0 30px 10px var(--color-canvas)'
        }}
      />
    </div>
  );
}
