import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  transition: transform ease-in-out 0.2s;
  border-radius: 2rem;

  h1 {
    font-size: 2rem;
  }

  &.scrolled {
    background-color: rgba(264, 264, 264, 0.1);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transform: translateX(-50%) translateY(2rem);
    z-index: 20;
  }

  ul {
    display: flex;
    gap: 1rem;
    color: ${(props) => props.theme.color.primary};
  }
`
