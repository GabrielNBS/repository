import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  transition: all ease-in-out 0.2s;
  border-radius: 2rem;

  h1 {
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.color.secondary};
    }
  }

  &.scrolled {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(${(props) => props.theme.shadow.primary});
    z-index: 20;
    display: flex;
    transition: all ease-in-out 0.2s;
    transform: translateY(25%);
  }

  ul {
    display: flex;
    gap: 1rem;
    color: ${(props) => props.theme.color.primary};
  }
`
