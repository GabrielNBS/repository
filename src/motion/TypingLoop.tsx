import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { Text } from '../Components/Text/styles';

type TypingLoopProps = {
  texts: string[];
  duration?: number;
};

const TypingLoop = ({ texts, duration = 3000 }: TypingLoopProps) => {
  const [current, setCurrent] = useState(0);
  const isMobile = useBreakpoint(1024);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % texts.length);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div
      style={{
        display: 'inline-flex',
        height: '2.5rem',
        width: '100%',
        justifyContent: isMobile ? 'center' : 'flex-start',
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'bottom'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[current]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            whiteSpace: 'nowrap'
          }}
        >
          <Text $variant="h3">{texts[current]}</Text>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TypingLoop;
