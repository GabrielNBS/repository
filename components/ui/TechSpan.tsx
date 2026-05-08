'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import BorderGlow from './BorderGlow';

interface TechSpanProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function TechSpan({ children, icon, className }: TechSpanProps) {
  return (
    <motion.div className={cn('relative group cursor-default', className)}>
      <BorderGlow
        edgeSensitivity={15}
        glowColor="220 80 80"
        backgroundColor="var(--color-background-secondary)"
        borderRadius={12}
        glowRadius={20}
        glowIntensity={0.6}
        coneSpread={20}
        animated={true}
        colors={['#c084fc', '#f472b6', '#38bdf8']}
        className="w-full h-full"
      >
        <div
          className={cn(
            'relative z-10 flex items-center justify-center px-4 py-2 h-full w-full',
            '**:text-[0.7rem] **:font-semibold **:tracking-wide **:m-0 **:leading-none'
          )}
        >
          <div className="flex items-center justify-center gap-2 text-foreground/70 transition-colors duration-300">
            {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
            <span className="flex gap-2 items-center justify-center mt-px">{children}</span>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}
