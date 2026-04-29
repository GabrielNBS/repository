"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

type AnimatedTextProps = {
  text: string;
  delay?: number;
};

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2 * i,
    },
  }),
};

const child = {
  hidden: { opacity: 0, y: "0.25em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: {
      duration: 0.5,
      ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
    },
  },
};

export default function AnimatedText({ text, delay = 1 }: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={container}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        display: "flex",
        flexWrap: "wrap",
        whiteSpace: "normal",
        lineHeight: 1.4,
        justifyContent: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {isMobile
        ? text.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={child}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))
        : text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={child}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
    </motion.div>
  );
}
