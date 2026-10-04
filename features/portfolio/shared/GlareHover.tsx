import type { CSSProperties, ReactNode } from 'react';
import styles from './GlareHover.module.css';

interface GlareHoverProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
}

// Adapted from React Bits GlareHover for inline technology tags.
export default function GlareHover({
  children,
  className = '',
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false
}: GlareHoverProps) {
  const style = {
    '--gh-color': glareColor,
    '--gh-opacity': glareOpacity,
    '--gh-angle': `${glareAngle}deg`,
    '--gh-size': `${glareSize}%`,
    '--gh-duration': `${transitionDuration}ms`
  } as CSSProperties;

  return (
    <span
      className={`${styles.glareHover} ${playOnce ? styles.playOnce : ''} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
