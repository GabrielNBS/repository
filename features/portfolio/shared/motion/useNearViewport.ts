'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Keep compact-screen enhancements out of the initial hydration workload. */
export function useNearViewport<T extends Element>(ref: RefObject<T | null>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: '400px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return ready;
}
