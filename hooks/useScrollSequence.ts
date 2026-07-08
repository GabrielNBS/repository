'use client';

import { useState, useEffect, useRef } from 'react';

interface Manifest {
  frameCount: number;
  fps: number;
  width: number;
  height: number;
  pattern: string;
}

export interface UseScrollSequenceResult {
  images: HTMLImageElement[];
  isLoading: boolean;
  progress: number;
  manifest: Manifest | null;
}

/**
 * Hook para pré-carregamento assíncrono e progressivo de sequências de frames.
 * Prioriza os primeiros 5 frames para garantir rápido LCP (Largest Contentful Paint).
 *
 * @param sequencePath Caminho público onde estão os frames (ex: '/frames/fox-sumi-e')
 */
export default function useScrollSequence(sequencePath: string): UseScrollSequenceResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const isStartedRef = useRef(false);

  useEffect(() => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    let active = true;

    async function loadSequence() {
      try {
        const response = await fetch(`${sequencePath}/manifest.json`);
        if (!response.ok) {
          throw new Error(`Falha ao carregar o manifesto em ${sequencePath}`);
        }
        const data: Manifest = await response.json();
        if (!active) return;
        setManifest(data);

        const totalFrames = data.frameCount;
        const loadedImages: HTMLImageElement[] = new Array(totalFrames);
        let loadedCount = 0;

        const updateProgress = () => {
          if (!active) return;
          loadedCount++;
          const newProgress = Math.round((loadedCount / totalFrames) * 100);
          setProgress(newProgress);

          if (loadedCount === totalFrames) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };

        // 1. Pré-carregar os primeiros 5 frames de forma síncrona/prioritária para LCP
        const priorityFrames = Math.min(5, totalFrames);
        const priorityPromises: Promise<void>[] = [];

        for (let i = 1; i <= priorityFrames; i++) {
          const frameNumStr = String(i).padStart(4, '0');
          const url = `${sequencePath}/frame_${frameNumStr}.webp`;

          const p = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              loadedImages[i - 1] = img;
              updateProgress();
              resolve();
            };
            img.onerror = () => {
              loadedImages[i - 1] = img;
              updateProgress();
              resolve();
            };
          });
          priorityPromises.push(p);
        }

        await Promise.all(priorityPromises);

        // 2. Carregar o restante em background de forma assíncrona
        for (let i = priorityFrames + 1; i <= totalFrames; i++) {
          if (!active) return;
          const frameNumStr = String(i).padStart(4, '0');
          const url = `${sequencePath}/frame_${frameNumStr}.webp`;

          const img = new Image();
          img.src = url;
          img.onload = () => {
            loadedImages[i - 1] = img;
            updateProgress();
          };
          img.onerror = () => {
            loadedImages[i - 1] = img;
            updateProgress();
          };
        }
      } catch (err) {
        console.error('Erro ao carregar a sequência de frames:', err);
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadSequence();

    return () => {
      active = false;
    };
  }, [sequencePath]);

  return { images, isLoading, progress, manifest };
}
