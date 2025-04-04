import React from 'react'
import { motion } from 'framer-motion'

const text = 'Olá, me chamo Gabriel'

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // intervalo entre letras
      delayChildren: 0.2 * i,
    },
  }),
}

const child = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.5,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
}

export default function AnimatedText() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
