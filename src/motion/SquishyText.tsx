import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

type SquishyTextProps = {
  text: string;
  className?: string;
};

// Styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const WordWrapper = styled.span`
  display: inline-flex;
  margin-right: 0.25em;
`;

const Letter = styled(motion.span)`
  display: inline-block;
  font-weight: 700;
  cursor: default;
  will-change: transform, color;
  transform-origin: bottom center;
`;

type Action = { type: 'START'; index: number } | { type: 'STOP'; index: number };
type State = Record<number, boolean>;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, [action.index]: true };
    case 'STOP':
      return { ...state, [action.index]: false };
    default:
      return state;
  }
}

export default function SquishyText({ text, className = '' }: SquishyTextProps) {
  const [state, dispatch] = useReducer(reducer, {});
  const theme = useTheme();

  const handleHoverStart = (index: number) => {
    dispatch({ type: 'START', index });
    setTimeout(() => {
      dispatch({ type: 'STOP', index });
    }, 1300); // igual à duração da animação
  };

  return (
    <Wrapper className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <WordWrapper key={wordIndex}>
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 100 + charIndex; // índice único para reducer
            const isActive = !!state[index];

            return (
              <Letter
                key={index}
                onHoverStart={() => handleHoverStart(index)}
                animate={{
                  scale: isActive ? [1, 1.25, 0.95, 1.1, 0.98, 1.02, 1] : 1,
                  rotate: isActive ? [0, 4, -3, 2, -1, 0.5, 0] : 0,
                  skewX: isActive ? [0, 6, -4, 3, -1, 0.5, 0] : 0,
                  translateY: isActive ? [0, -3, 2, -1.5, 0.8, -0.3, 0] : 0,
                  color: isActive ? theme.color.secondary : theme.color.primary,
                  transition: {
                    duration: 1.3,
                    ease: 'easeOut',
                    times: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1]
                  }
                }}
              >
                {char}
              </Letter>
            );
          })}
        </WordWrapper>
      ))}
    </Wrapper>
  );
}
