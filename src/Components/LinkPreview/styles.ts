import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const PreviewBox = styled(motion.div)`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 100;
  width: 320px;
  height: 200px;
  pointer-events: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  object-fit: cover;
  border: 1px solid #eee;
`;

export const GithubCard = styled.div`
  background: #1a1a1a;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  svg {
    font-size: 3rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 0;
  }

  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 8px;
  background: white;
`;

export const LoadingContainer = styled.div<{ $bgImage?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: white;
  font-size: 0.9rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  text-align: center;
  gap: 0.5rem;

  h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`;
