import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  delay?: number
}

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export default function AnimatedText({ text, delay = 1 }: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false, // anima mais de uma vez só quando entra na tela
    margin: '-100px', // dispara um pouco antes de aparecer totalmente
  })

  return (
    <motion.div
      ref={ref}
      variants={container}
      custom={delay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: 'inline-block',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
