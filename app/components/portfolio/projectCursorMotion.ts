'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type CursorPosition = { x: (value: number) => void; y: (value: number) => void };
type CursorPointer = { clientX: number; clientY: number; pointerType: string };

function getCursorContentWidth(cursor: HTMLSpanElement) {
  const content = cursor.querySelector<HTMLElement>('[data-project-cursor-content]');
  return content ? Math.ceil(content.scrollWidth) + 4 : 0;
}

export function useProjectCursorMotion() {
  const cursor = useRef<HTMLSpanElement>(null);
  const cursorPosition = useRef<CursorPosition | null>(null);
  const supportsCursor = useRef(false);

  useEffect(() => {
    const cursorElement = cursor.current;
    if (!cursorElement) return;

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

    return () => {
      hoverQuery.removeEventListener('change', updateSupport);
      motionQuery.removeEventListener('change', updateSupport);
      cursorPosition.current = null;
    };
  }, []);

  function moveCursor(event: CursorPointer, immediate = false) {
    const cursorElement = cursor.current;
    if (!cursorElement || !supportsCursor.current || event.pointerType !== 'mouse') return false;

    const x = event.clientX + 18;
    const y = event.clientY + 18;

    if (immediate) {
      gsap.set(cursorElement, { x, y });
      return true;
    }

    cursorPosition.current?.x(x);
    cursorPosition.current?.y(y);
    return true;
  }

  function showCursor(event: CursorPointer) {
    const cursorElement = cursor.current;
    if (!cursorElement || !moveCursor(event, true)) return;

    gsap.to(cursorElement, {
      autoAlpha: 1,
      duration: 0.28,
      ease: 'power4.out',
      overwrite: 'auto',
      scale: 1,
      width: getCursorContentWidth(cursorElement)
    });
  }

  function hideCursor(event: CursorPointer) {
    if (!supportsCursor.current || event.pointerType !== 'mouse') return;

    gsap.to(cursor.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
      scale: 0.78,
      width: 0
    });
  }

  return { cursorRef: cursor, hideCursor, moveCursor, showCursor };
}
