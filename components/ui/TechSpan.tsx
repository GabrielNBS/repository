'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TechSpanProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function TechSpan({ children, icon, className }: TechSpanProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative group flex items-center gap-2.5',
        'px-4 py-1.5 rounded-xl cursor-default overflow-hidden',
        'bg-foreground/2 dark:bg-white/2 backdrop-blur-xl',
        'border border-foreground/5 dark:border-white/5',
        'hover:border-accent/30 hover:bg-accent/4',
        'transition-all duration-500 ease-out',
        // Force refined tag typography
        '**:text-[10px] **:sm:text-[11px] **:font-black **:uppercase **:tracking-[0.15em] **:m-0',
        className
      )}
    >
      {/* Shine Sweep Effect */}
      <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none">
        <div className="w-1/2 h-full bg-linear-to-r from-transparent via-foreground/5 dark:via-white/5 to-transparent skew-x-[-25deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center gap-2 text-foreground/40 dark:text-white/40 group-hover:text-foreground dark:group-hover:text-white transition-colors duration-300">
        {children}
      </div>
    </motion.div>
  );
}
