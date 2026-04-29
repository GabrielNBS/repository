"use client";

import { useReducer } from "react";
import { motion } from "motion/react";

type SquishyTextProps = {
  text: string;
  className?: string;
};

type Action = { type: "START"; index: number } | { type: "STOP"; index: number };
type State = Record<number, boolean>;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, [action.index]: true };
    case "STOP":
      return { ...state, [action.index]: false };
    default:
      return state;
  }
}

export default function SquishyText({ text, className = "" }: SquishyTextProps) {
  const [state, dispatch] = useReducer(reducer, {});

  const handleHoverStart = (index: number) => {
    dispatch({ type: "START", index });
    setTimeout(() => {
      dispatch({ type: "STOP", index });
    }, 1300);
  };

  return (
    <div className={`flex flex-wrap gap-[0.25em] ${className}`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {word.split("").map((char, charIndex) => {
            const index = wordIndex * 100 + charIndex;
            const isActive = !!state[index];

            return (
              <motion.span
                key={index}
                className="inline-block font-bold cursor-default will-change-transform origin-bottom"
                onHoverStart={() => handleHoverStart(index)}
                animate={{
                  scale: isActive ? [1, 1.25, 0.95, 1.1, 0.98, 1.02, 1] : 1,
                  rotate: isActive ? [0, 4, -3, 2, -1, 0.5, 0] : 0,
                  skewX: isActive ? [0, 6, -4, 3, -1, 0.5, 0] : 0,
                  translateY: isActive ? [0, -3, 2, -1.5, 0.8, -0.3, 0] : 0,
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-foreground)",
                  transition: {
                    duration: 1.3,
                    ease: "easeOut",
                    times: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1],
                  },
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
