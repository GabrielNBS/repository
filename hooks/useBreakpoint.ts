"use client";

import { useEffect, useState } from "react";

const getWindowWidth = () =>
  typeof window !== "undefined" ? window.innerWidth : 0;

export const useBreakpoint = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(getWindowWidth() < breakpoint);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
