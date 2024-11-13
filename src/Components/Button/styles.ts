import styled from 'styled-components'

export const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 36px;
  border: 4px solid;
  border-color: transparent;
  font-size: 16px;
  background-color: inherit;
  border-radius: 100px;
  font-weight: 600;
  color: ${(props) => props.theme.color.primary};
  box-shadow: 0 0 0 2px ${(props) => props.theme.color.primary};
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  svg {
    position: absolute;
    width: 24px;
    fill: ${(props) => props.theme.color.primary};
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  svg.arr-1 {
    right: 16px;
  }

  svg.arr-2 {
    left: -25%;
  }

  span.circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.theme.color.primary};
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  span.text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    box-shadow: 0 0 0 12px transparent;
    color: ${(props) => props.theme.color.secondary};
    border-radius: 12px;
  }

  &:hover .arr-1 {
    right: -25%;
  }

  &:hover .arr-2 {
    left: 16px;
  }

  &:hover .text {
    transform: translateX(12px);
  }

  &:hover svg {
    fill: ${(props) => props.theme.color.secondary};
  }

  &:active {
    scale: 0.95;
    box-shadow: 0 0 0 4px ${(props) => props.theme.color.primary};
  }

  &:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }
`
