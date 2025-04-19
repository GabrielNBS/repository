import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding: 0.7rem 1.7rem;
  font-size: clamp(0.875rem, 1.5vw, 1.125rem); // Adaptativo
  font-weight: 700;
  border-radius: 0.5em;
  border: 1px solid ${(props) => props.theme.shadow.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => props.theme.background.secondary};
  color: ${(props) => props.theme.color.primary};
  box-shadow:
    4px 4px 10px ${(props) => props.theme.shadow.secondary},
    -4px -4px 10px ${(props) => props.theme.shadow.tertiary};

  &:hover {
    color: ${(props) => props.theme.color.tertiary};
    border-color: ${(props) => props.theme.color.secondary};
  }

  &:active {
    box-shadow:
      inset 3px 3px 8px ${(props) => props.theme.shadow.secondary},
      inset -3px -3px 8px ${(props) => props.theme.shadow.tertiary};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.color.secondary};
    outline-offset: 3px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    display: block;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  &::before {
    left: 50%;
    top: 100%;
    width: 140%;
    height: 180%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::after {
    left: 55%;
    top: 180%;
    width: 160%;
    height: 190%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    background-color: ${(props) => props.theme.color.secondary};
  }

  &:hover::before {
    top: -35%;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    background-color: ${(props) => props.theme.color.secondary};
  }

  &:hover::after {
    top: -45%;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.875rem;
    border-radius: 0.4rem;
  }
`;
