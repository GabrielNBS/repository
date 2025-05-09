// ScrollToTopButton.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

const Button = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  padding: 1rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.9)')};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};

  @media (min-width: 768px) {
    display: none;
  }
`;

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button onClick={handleClick} visible={isVisible} aria-label="Voltar ao topo">
      <FaArrowUp size={16} />
    </Button>
  );
};

export default ScrollToTopButton;
