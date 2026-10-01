'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type { PointerEvent, PropsWithChildren } from 'react';
import type { Project } from '@/features/portfolio/projects/data/projects';
import ProjectCursorLayer from './ProjectCursorLayer';
import { useProjectCursorMotion } from './projectCursorMotion';

type ProjectCursorContextValue = {
  onProjectPointerEnter: (event: PointerEvent<HTMLAnchorElement>, project: Project) => void;
  onProjectPointerLeave: (event: PointerEvent<HTMLAnchorElement>) => void;
  onProjectPointerMove: (event: PointerEvent<HTMLAnchorElement>) => void;
};

const ProjectCursorContext = createContext<ProjectCursorContextValue | null>(null);

export function ProjectCursorProvider({ children }: PropsWithChildren) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const revealFrame = useRef<number | null>(null);
  const { cursorRef, hideCursor, moveCursor, showCursor } = useProjectCursorMotion();

  useEffect(
    () => () => {
      if (revealFrame.current !== null) window.cancelAnimationFrame(revealFrame.current);
    },
    []
  );

  const onProjectPointerEnter = useCallback(
    (event: PointerEvent<HTMLAnchorElement>, project: Project) => {
      if (event.pointerType !== 'mouse') return;

      const pointer = {
        clientX: event.clientX,
        clientY: event.clientY,
        pointerType: event.pointerType
      };

      setActiveProject(project);
      if (revealFrame.current !== null) window.cancelAnimationFrame(revealFrame.current);
      revealFrame.current = window.requestAnimationFrame(() => {
        revealFrame.current = null;
        showCursor(pointer);
      });
    },
    [showCursor]
  );

  const onProjectPointerLeave = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      if (revealFrame.current !== null) {
        window.cancelAnimationFrame(revealFrame.current);
        revealFrame.current = null;
      }
      hideCursor(event);
    },
    [hideCursor]
  );

  const value = useMemo(
    () => ({
      onProjectPointerEnter,
      onProjectPointerLeave,
      onProjectPointerMove: moveCursor
    }),
    [moveCursor, onProjectPointerEnter, onProjectPointerLeave]
  );

  return (
    <ProjectCursorContext.Provider value={value}>
      {children}
      <ProjectCursorLayer cursorRef={cursorRef} project={activeProject} />
    </ProjectCursorContext.Provider>
  );
}

export function useProjectCursor() {
  const context = useContext(ProjectCursorContext);
  if (!context) throw new Error('useProjectCursor must be used inside ProjectCursorProvider.');

  return context;
}
