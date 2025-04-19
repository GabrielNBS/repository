import { useEffect, useState } from 'react';

const getWindowWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 0);

export const useBreakpoint = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(getWindowWidth() < breakpoint);

  useEffect(() => {
    function handleResize() {
      setIsMobile(getWindowWidth() < breakpoint);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};
