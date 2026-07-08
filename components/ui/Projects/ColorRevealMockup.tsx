'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface ColorRevealMockupProps {
  src: string;
  alt: string;
  priority?: boolean;
}

interface Splat {
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

export default function ColorRevealMockup({ src, alt, priority = false }: ColorRevealMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const grayscaleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const splatsRef = useRef<Splat[]>([]);
  const lastSplatRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isLoopingRef = useRef(false);
  const hasDrawnStaticRef = useRef(false);

  const drawStaticGrayscale = () => {
    const imgObj = imageRef.current;
    const canvas = canvasRef.current;
    const grayCanvas = grayscaleCanvasRef.current;
    if (!canvas || !grayCanvas || !imgObj || !imgObj.complete || imgObj.naturalWidth === 0) return;

    const rect = containerRef.current?.getBoundingClientRect();
    const canvasWidth = rect ? rect.width : canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = rect ? rect.height : canvas.height / (window.devicePixelRatio || 1);

    if (grayCanvas.width !== canvas.width || grayCanvas.height !== canvas.height) {
      grayCanvas.width = canvas.width;
      grayCanvas.height = canvas.height;
    }

    const gCtx = grayCanvas.getContext('2d');
    if (!gCtx) return;

    gCtx.clearRect(0, 0, grayCanvas.width, grayCanvas.height);
    gCtx.save();
    gCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const imgWidth = imgObj.naturalWidth;
    const imgHeight = imgObj.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const containerRatio = canvasWidth / canvasHeight;

    let sx = 0,
      sWidth = imgWidth,
      sHeight = imgHeight;
    const sy = 0;
    if (imgRatio > containerRatio) {
      sWidth = imgHeight * containerRatio;
      sx = (imgWidth - sWidth) / 2;
    } else {
      sWidth = imgWidth;
      sHeight = imgWidth / containerRatio;
      sx = 0;
    }

    gCtx.filter = 'grayscale(100%)';
    gCtx.drawImage(imgObj, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    gCtx.restore();

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(grayCanvas, 0, 0);
    }
  };

  useEffect(() => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    if (!grayscaleCanvasRef.current) {
      grayscaleCanvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;
    let nextImgEl: HTMLImageElement | null = null;
    let loadListener: (() => void) | null = null;

    const checkImage = () => {
      if (imageRef.current) return true;
      const nextImg = containerRef.current?.querySelector('img') as HTMLImageElement | null;
      if (nextImg) {
        if (nextImg.complete && nextImg.naturalWidth > 0) {
          imageRef.current = nextImg;
          drawStaticGrayscale();
          return true;
        } else {
          nextImgEl = nextImg;
          loadListener = () => {
            if (isActive) {
              imageRef.current = nextImg;
              drawStaticGrayscale();
            }
          };
          nextImg.addEventListener('load', loadListener);
        }
      }
      return false;
    };

    checkImage();

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      drawStaticGrayscale();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      isActive = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (nextImgEl && loadListener) {
        nextImgEl.removeEventListener('load', loadListener);
      }
    };
  }, [src]);

  const startLoop = () => {
    if (!isLoopingRef.current) {
      isLoopingRef.current = true;
      hasDrawnStaticRef.current = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

      const renderFrame = () => {
        const splats = splatsRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const imgObj = imageRef.current;
        const grayCanvas = grayscaleCanvasRef.current;

        if (!canvas || !ctx || !imgObj || !grayCanvas) {
          isLoopingRef.current = false;
          animationFrameId.current = null;
          return;
        }

        const needsRender = splats.length > 0;
        if (!needsRender) {
          if (!hasDrawnStaticRef.current) {
            drawStaticGrayscale();
            hasDrawnStaticRef.current = true;
          }
          isLoopingRef.current = false;
          animationFrameId.current = null;
          return;
        }

        hasDrawnStaticRef.current = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(grayCanvas, 0, 0);

        const rect = containerRef.current?.getBoundingClientRect();
        const canvasWidth = rect ? rect.width : canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = rect ? rect.height : canvas.height / (window.devicePixelRatio || 1);

        const imgWidth = imgObj.naturalWidth;
        const imgHeight = imgObj.naturalHeight;
        const imgRatio = imgWidth / imgHeight;
        const containerRatio = canvasWidth / canvasHeight;

        let sx = 0,
          sWidth = imgWidth,
          sHeight = imgHeight;
        const sy = 0;
        if (imgRatio > containerRatio) {
          sWidth = imgHeight * containerRatio;
          sx = (imgWidth - sWidth) / 2;
        } else {
          sWidth = imgWidth;
          sHeight = imgWidth / containerRatio;
          sx = 0;
        }

        const offscreen = offscreenCanvasRef.current;
        if (offscreen) {
          if (offscreen.width !== canvas.width || offscreen.height !== canvas.height) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
          }

          const oCtx = offscreen.getContext('2d');
          if (oCtx) {
            oCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            oCtx.save();
            oCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

            oCtx.globalCompositeOperation = 'source-over';
            splats.forEach((splat) => {
              const grad = oCtx.createRadialGradient(
                splat.x,
                splat.y,
                0,
                splat.x,
                splat.y,
                splat.radius
              );
              grad.addColorStop(0, `rgba(0, 0, 0, ${splat.intensity})`);
              grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

              oCtx.fillStyle = grad;
              oCtx.beginPath();
              oCtx.arc(splat.x, splat.y, splat.radius, 0, Math.PI * 2);
              oCtx.fill();
            });

            oCtx.globalCompositeOperation = 'source-in';
            oCtx.drawImage(imgObj, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
            oCtx.restore();

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(offscreen, 0, 0);
            ctx.restore();
          }
        }

        splatsRef.current = splats
          .map((splat) => ({
            ...splat,
            intensity: splat.intensity - 0.015,
            radius: splat.radius + 0.5
          }))
          .filter((splat) => splat.intensity > 0);

        animationFrameId.current = requestAnimationFrame(renderFrame);
      };

      animationFrameId.current = requestAnimationFrame(renderFrame);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const last = lastSplatRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 8) return;
    }

    lastSplatRef.current = { x, y };

    splatsRef.current.push({
      x,
      y,
      radius: 95,
      intensity: 1.0
    });

    if (splatsRef.current.length > 80) {
      splatsRef.current.shift();
    }

    startLoop();
  };

  return (
    <div ref={containerRef} className="relative h-full w-full" onMouseMove={handleMouseMove}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="50vw"
        priority={priority}
        className="pointer-events-none opacity-0"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
    </div>
  );
}
