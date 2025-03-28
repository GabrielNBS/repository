import styled from 'styled-components'

export const Button = styled.button`
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: ${(props) => props.theme.color.primary};
  padding: 0.7em 1.7em;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  border-radius: 0.5em;
  background: ${(props) => props.theme.background.secondary};
  border: 1px solid ${(props) => props.theme.shadow.primary};
  box-shadow:
    6px 6px 12px ${(props) => props.theme.shadow.secondary},
    -6px -6px 12px ${(props) => props.theme.shadow.tertiary};

  &:active {
    color: #666;
    box-shadow:
      inset 4px 4px 12px ${(props) => props.theme.shadow.secondary},
      inset -4px -4px 12px ${(props) => props.theme.shadow.tertiary};
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  &:after {
    content: '';
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: ${(props) => props.theme.color.secondary};
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  &:hover {
    color: ${(props) => props.theme.color.tertiary};
    border: 1px solid ${(props) => props.theme.color.secondary};
  }

  &:hover:before {
    top: -35%;
    background-color: ${(props) => props.theme.color.secondary};
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  &:hover:after {
    top: -45%;
    background-color: ${(props) => props.theme.color.secondary};
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`
