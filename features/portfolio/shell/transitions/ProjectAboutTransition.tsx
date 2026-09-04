import type { CSSProperties } from 'react';
import {
  projectsAboutTransitionGrid,
  projectsAboutTransitionPixels
} from './projectAboutTransitionLogic';

export default function ProjectAboutTransition() {
  const { columns, rows } = projectsAboutTransitionGrid;

  return (
    <div
      className="pointer-events-none invisible fixed inset-0 z-30 opacity-0"
      aria-hidden="true"
      data-motion="projects-about-transition"
    >
      <div
        className="grid size-full overflow-hidden"
        data-component="transition-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        {projectsAboutTransitionPixels.map((pixel) => (
          <span
            className="bg-peach block size-full opacity-0"
            data-motion="projects-about-pixel"
            data-motion-delay={pixel.delay}
            key={pixel.id}
            style={{ '--transition-delay': pixel.delay } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
