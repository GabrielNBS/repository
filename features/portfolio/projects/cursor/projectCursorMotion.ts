'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

type CursorPosition = { x: (value: number) => void; y: (value: number) => void };
type CursorPointer = { clientX: number; clientY: number; pointerType: string };

function getCursorContentWidth(cursor: HTMLSpanElement) {
  const content = cursor.querySelector<HTMLElement>('[data-component="project-cursor-content"]');
  return content ? Math.ceil(content.scrollWidth) + 4 : 0;
}

type CursorActions = {
  moveCursor: (event: CursorPointer, immediate?: boolean) => boolean;
  showCursor: (event: CursorPointer) => void;
  hideCursor: (event: CursorPointer) => void;
};

export function useProjectCursorMotion() {
  const cursor = useRef<HTMLSpanElement>(null);
  const cursorPosition = useRef<CursorPosition | null>(null);
  const supportsCursor = useRef(false);
  const actions = useRef<CursorActions | null>(null);

  useGSAP(
    (_, contextSafe) => {
      const cursorElement = cursor.current;
      if (!cursorElement) return;

      const safeContext = contextSafe!;

      const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updateSupport = () => {
        supportsCursor.current = hoverQuery.matches && !motionQuery.matches;
      };

      updateSupport();
      hoverQuery.addEventListener('change', updateSupport);
      motionQuery.addEventListener('change', updateSupport);

      cursorPosition.current = {
        x: gsap.quickTo(cursorElement, 'x', { duration: 0.28, ease: 'power3.out' }),
        y: gsap.quickTo(cursorElement, 'y', { duration: 0.28, ease: 'power3.out' })
      };
      gsap.set(cursorElement, { autoAlpha: 0, scale: 0.78, width: 0 });

      const moveCursor = safeContext((event: CursorPointer, immediate = false) => {
        if (!supportsCursor.current || event.pointerType !== 'mouse') return false;

        const x = event.clientX + 18;
        const y = event.clientY + 18;

        if (immediate) {
          gsap.set(cursorElement, { x, y });
          return true;
        }

        cursorPosition.current?.x(x);
        cursorPosition.current?.y(y);
        return true;
      });

      const showCursor = safeContext((event: CursorPointer) => {
        if (!moveCursor(event, true)) return;

        gsap.to(cursorElement, {
          autoAlpha: 1,
          duration: 0.28,
          ease: 'power4.out',
          overwrite: 'auto',
          scale: 1,
          width: getCursorContentWidth(cursorElement)
        });
      });

      const hideCursor = safeContext((event: CursorPointer) => {
        if (!supportsCursor.current || event.pointerType !== 'mouse') return;

        gsap.to(cursorElement, {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.in',
          overwrite: 'auto',
          scale: 0.78,
          width: 0
        });
      });

      actions.current = { hideCursor, moveCursor, showCursor };

      return () => {
        hoverQuery.removeEventListener('change', updateSupport);
        motionQuery.removeEventListener('change', updateSupport);
        cursorPosition.current = null;
        actions.current = null;
        gsap.killTweensOf(cursorElement);
      };
    },
    { scope: cursor }
  );

  return {
    cursorRef: cursor,
    moveCursor: (event: CursorPointer, immediate = false) =>
      actions.current?.moveCursor(event, immediate) ?? false,
    showCursor: (event: CursorPointer) => actions.current?.showCursor(event),
    hideCursor: (event: CursorPointer) => actions.current?.hideCursor(event)
  };
}
