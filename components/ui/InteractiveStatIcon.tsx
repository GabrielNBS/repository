'use client';

import { motion } from 'motion/react';
import React from 'react';

const starVariants = {
  initial: { opacity: 0, scale: 0 },
  hover: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut'
    }
  })
};

const starPathVariants = {
  initial: { pathLength: 0 },
  hover: {
    pathLength: 1,
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: -5,
    transition: { duration: 0.3 }
  }
};

const pathVariants = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1, transition: { duration: 1.5, ease: 'easeInOut' } }
};

interface IconProps {
  type: 'calendar' | 'briefcase' | 'users';
}

const Star = ({ className, custom }: { className?: string; custom: number }) => (
  <motion.svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    custom={custom}
    variants={starVariants}
  >
    <motion.path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      variants={starPathVariants}
    />
  </motion.svg>
);

const InteractiveStatIcon: React.FC<IconProps> = ({ type }) => {
  const renderIcon = () => {
    switch (type) {
      case 'calendar':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.rect x="3" y="4" width="18" height="18" rx="2" ry="2" variants={pathVariants} />
            <motion.path d="M16 2v4" variants={pathVariants} />
            <motion.path d="M8 2v4" variants={pathVariants} />
            <motion.path d="M3 10h18" variants={pathVariants} />
          </svg>
        );
      case 'briefcase':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.rect x="2" y="7" width="20" height="14" rx="2" ry="2" variants={pathVariants} />
            <motion.path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" variants={pathVariants} />
          </svg>
        );
      case 'users':
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" variants={pathVariants} />
            <motion.circle cx="9" cy="7" r="4" variants={pathVariants} />
            <motion.path d="M23 21v-2a4 4 0 0 0-3-3.87" variants={pathVariants} />
            <motion.path d="M16 3.13a4 4 0 0 1 0 7.75" variants={pathVariants} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative flex items-center justify-center w-12 h-12"
    >
      {/* 3 Stars positioned around the icon */}
      <Star className="absolute -top-1 -right-2 text-accent" custom={0} />
      <Star className="absolute top-4 -left-3 text-accent/80" custom={1} />
      <Star className="absolute -bottom-2 right-4 text-accent/60" custom={2} />
      
      {/* The Icon */}
      <motion.div variants={iconVariants} className="z-10 text-accent">
        {renderIcon()}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveStatIcon;
