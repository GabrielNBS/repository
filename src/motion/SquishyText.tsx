import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

type SquishyTextProps = {
  text: string;
  className?: string;
};

// Styled components
const Wrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`;

const Letter = styled(motion.span)`
  display: inline-block;
  font-size: 2.5rem;
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
  const theme = useTheme(); // Acessa o tema

  const handleHoverStart = (index: number) => {
    dispatch({ type: 'START', index });
    setTimeout(() => {
      dispatch({ type: 'STOP', index });
    }, 1300); // mesmo tempo da animação
  };

  return (
    <Wrapper className={className}>
      {text.split('').map((char, index) => {
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
            {char === ' ' ? '\u00A0' : char}
          </Letter>
        );
      })}
    </Wrapper>
  );
}
