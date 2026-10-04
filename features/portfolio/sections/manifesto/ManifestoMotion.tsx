'use client';

import type { RefObject } from 'react';
import { useManifestoStoryMotion } from './manifestoStoryMotion';

/** Load the desktop-only GSAP plugins only where this choreography is used. */
export default function ManifestoMotion({ root }: { root: RefObject<HTMLElement | null> }) {
  useManifestoStoryMotion(root);
  return null;
}
