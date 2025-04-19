import React from 'react';
import { motion } from 'framer-motion';

interface FadeInTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export default function FadeInText({ children, delay = 0.2, duration = 0.6 }: FadeInTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
