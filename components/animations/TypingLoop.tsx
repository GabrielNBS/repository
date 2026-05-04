'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type TypingLoopProps = {
  texts: string[];
  duration?: number;
};

export default function TypingLoop({ texts, duration = 3000 }: TypingLoopProps) {
  const [current, setCurrent] = useState(0);
  const isMobile = useBreakpoint(1024);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % texts.length);
    }, duration);
    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <span className="inline-flex h-[1.6em] min-w-[200px] overflow-hidden relative align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[current]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute whitespace-nowrap"
        >
          <span className="text-[clamp(1.5rem,3vw,1.75rem)] font-medium leading-relaxed text-accent">
            {texts[current]}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
