import React from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type TypingLoopProps = {
  texts: string[]
  duration?: number
}

const TypingLoop = ({ texts, duration = 3000 }: TypingLoopProps) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % texts.length)
    }, duration)

    return () => clearInterval(interval)
  }, [texts.length, duration])

  return (
    <div
      style={{
        display: 'inline-block',
        height: '2.5rem',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'bottom',
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
            whiteSpace: 'nowrap',
          }}
        >
          {texts[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TypingLoop
