'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import { ABOUT_PORTRAIT_COLUMNS, type AboutPortraitMode } from './aboutPortraitFrames';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const clampProgress = gsap.utils.clamp(0, 1);
const POINTER_INFLUENCE = 0.46;

interface AboutPortraitMotionOptions {
  frameCount: number;
  mode: AboutPortraitMode;
  ready: boolean;
}

export function useAboutPortraitMotion(
  root: RefObject<HTMLElement | null>,
  { frameCount, mode, ready }: AboutPortraitMotionOptions
) {
  useGSAP(
    () => {
      const portrait = root.current;
      if (!portrait) return;

      const overlays = gsap.utils.toArray<HTMLElement>('[data-about-frame]', portrait);
      if (overlays.length) gsap.set(overlays, { autoAlpha: 0 });

      if (mode === 'static' || !ready || !overlays.length) return;

      const section = portrait.closest<HTMLElement>('[data-motion="about-section"]');
      if (!section) return;

      const interaction = {
        pointerInfluence: 0,
        pointerX: 0.5,
        pointerY: 0.5,
        scroll: 0
      };
      let activeFrameIndex = 0;

      const showFrame = (nextFrameIndex: number) => {
        if (nextFrameIndex === activeFrameIndex) return;

        const previousOverlay = overlays[activeFrameIndex - 1];
        const nextOverlay = overlays[nextFrameIndex - 1];

        if (previousOverlay) gsap.set(previousOverlay, { autoAlpha: 0 });
        if (nextOverlay) gsap.set(nextOverlay, { autoAlpha: 1 });

        activeFrameIndex = nextFrameIndex;
      };

      const renderFrame = () => {
        if (mode === 'scroll') {
          showFrame(Math.round(clampProgress(interaction.scroll) * (frameCount - 1)));
          return;
        }

        const pointerWeight = interaction.pointerInfluence * POINTER_INFLUENCE;
        const horizontalProgress = clampProgress(
          gsap.utils.interpolate(interaction.scroll, interaction.pointerX, pointerWeight)
        );
        const verticalProgress = clampProgress(
          gsap.utils.interpolate(interaction.scroll, interaction.pointerY, pointerWeight)
        );
        const column = Math.round(horizontalProgress * (ABOUT_PORTRAIT_COLUMNS - 1));
        const row = verticalProgress >= 0.5 ? 1 : 0;

        showFrame(row * ABOUT_PORTRAIT_COLUMNS + column);
      };

      const scrollTween = gsap.to(interaction, {
        ease: 'none',
        onUpdate: renderFrame,
        scroll: 1,
        scrollTrigger: {
          end: 'bottom top',
          id: 'about-portrait-sequence',
          invalidateOnRefresh: true,
          scrub: 0.28,
          start: 'top bottom',
          trigger: section
        }
      });

      if (mode !== 'hybrid') return () => scrollTween.kill();

      const pointerXTo = gsap.quickTo(interaction, 'pointerX', {
        duration: 0.26,
        ease: 'power3.out',
        onUpdate: renderFrame
      });
      const pointerYTo = gsap.quickTo(interaction, 'pointerY', {
        duration: 0.26,
        ease: 'power3.out',
        onUpdate: renderFrame
      });
      const pointerInfluenceTo = gsap.quickTo(interaction, 'pointerInfluence', {
        duration: 0.22,
        ease: 'power2.out',
        onUpdate: renderFrame
      });

      const onPointerMove = (event: PointerEvent) => {
        const bounds = section.getBoundingClientRect();
        pointerXTo(clampProgress((event.clientX - bounds.left) / bounds.width));
        pointerYTo(clampProgress((event.clientY - bounds.top) / bounds.height));
        pointerInfluenceTo(1);
      };
      const onPointerLeave = () => pointerInfluenceTo(0);

      section.addEventListener('pointermove', onPointerMove, { passive: true });
      section.addEventListener('pointerleave', onPointerLeave, { passive: true });

      return () => {
        section.removeEventListener('pointermove', onPointerMove);
        section.removeEventListener('pointerleave', onPointerLeave);
        scrollTween.kill();
      };
    },
    {
      dependencies: [frameCount, mode, ready],
      revertOnUpdate: true,
      scope: root
    }
  );
}
