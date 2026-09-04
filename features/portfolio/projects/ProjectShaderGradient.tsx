'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { useEffect, useRef, useState } from 'react';
import type { ProjectTone } from './data/projectTone';

const TONE_TOKENS: Record<ProjectTone, string> = {
  peach: '--color-peach',
  lilac: '--color-lilac',
  cream: '--color-cream',
  rose: '--color-rose'
};

const FALLBACK_TOKENS = {
  paper: '#f6efe5',
  ink: '#25221f',
  peach: '#efae82',
  lilac: '#cdb8d8',
  cream: '#e7d6bb',
  rose: '#e8b6aa'
} satisfies Record<'paper' | 'ink' | ProjectTone, string>;

function hexToRgb(value: string) {
  const normalized = value.trim().replace('#', '');
  if (![3, 6].includes(normalized.length)) return null;

  const hex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((part) => part + part)
          .join('')
      : normalized;
  const parsed = Number.parseInt(hex, 16);
  if (Number.isNaN(parsed)) return null;

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255
  };
}

function readHex(value: string, fallback: string) {
  const match = value.trim().match(/^#(?:[\da-f]{3}|[\da-f]{6})$/i);
  return match ? value.trim() : fallback;
}

function mixColors(base: string, mix: string, mixWeight: number) {
  const baseRgb = hexToRgb(base);
  const mixRgb = hexToRgb(mix);
  if (!baseRgb || !mixRgb) return base;

  const weight = Math.max(0, Math.min(1, mixWeight));
  const channel = (key: 'r' | 'g' | 'b') =>
    Math.round(baseRgb[key] * (1 - weight) + mixRgb[key] * weight)
      .toString(16)
      .padStart(2, '0');

  return `#${channel('r')}${channel('g')}${channel('b')}`;
}

function getGradientColors(tone: ProjectTone) {
  const styles = getComputedStyle(document.documentElement);
  const base = readHex(styles.getPropertyValue(TONE_TOKENS[tone]), FALLBACK_TOKENS[tone]);
  const paper = readHex(styles.getPropertyValue('--color-paper'), FALLBACK_TOKENS.paper);
  const ink = readHex(styles.getPropertyValue('--color-ink'), FALLBACK_TOKENS.ink);

  return {
    color1: mixColors(base, ink, 0.2),
    color2: base,
    color3: mixColors(base, paper, 0.48)
  };
}

function useReducedMotion() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setCanAnimate(!mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  return canAnimate;
}

function useRenderableSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [isRenderable, setIsRenderable] = useState(false);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const updateVisibility = () => setIsRenderable(surface.getClientRects().length > 0);
    updateVisibility();

    const resizeObserver = new ResizeObserver(updateVisibility);
    resizeObserver.observe(surface);
    return () => resizeObserver.disconnect();
  }, []);

  return { isRenderable, surfaceRef };
}

export default function ProjectShaderGradient({
  tone,
  className = ''
}: {
  tone: ProjectTone;
  className?: string;
}) {
  const canAnimate = useReducedMotion();
  const { isRenderable, surfaceRef } = useRenderableSurface();
  const [colors, setColors] = useState(() => ({
    color1: FALLBACK_TOKENS[tone],
    color2: FALLBACK_TOKENS[tone],
    color3: FALLBACK_TOKENS[tone]
  }));

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setColors(getGradientColors(tone));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [tone]);

  return (
    <div ref={surfaceRef} className={className} aria-hidden="true">
      {isRenderable && (
        <ShaderGradientCanvas
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          pixelDensity={1}
          fov={45}
          pointerEvents="none"
          lazyLoad
          threshold={0.05}
          rootMargin="120px"
          powerPreference="high-performance"
        >
          <ShaderGradient
            type="waterPlane"
            animate={canAnimate ? 'on' : 'off'}
            control="props"
            shader="defaults"
            {...colors}
            uTime={0}
            uSpeed={0.18}
            uStrength={1.15}
            uDensity={1.25}
            uFrequency={2.6}
            uAmplitude={1.35}
            cAzimuthAngle={180}
            cPolarAngle={90}
            cDistance={3.6}
            cameraZoom={1}
            brightness={1.3}
            reflection={1.0}
            grain="off"
            grainBlending={0.12}
            lightType="3d"
            envPreset="dawn"
            enableTransition
          />
        </ShaderGradientCanvas>
      )}
    </div>
  );
}
