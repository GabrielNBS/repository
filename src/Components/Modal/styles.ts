// components/styles.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.color.primary};
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;

  > button {
    position: absolute;
    right: 0;
    top: 0;
    background-color: transparent;
    box-shadow: none;
  }

  h2 {
    justify-content: center;
    color: ${(props) => props.theme.color.secondary};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    opacity: 0.7;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    justify-self: center;
    margin-bottom: 2rem;

    li {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;

  a {
    text-decoration: none;
    background-color: ${(props) => props.theme.color.secondary};
    color: ${(props) => props.theme.color.tertiary};
  }
`;
