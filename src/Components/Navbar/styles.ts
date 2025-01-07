import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  position: sticky;
  height: 4rem;
  top: 0;
  left: 0;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  &::after {
    display: flex;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background-color: ${(props) => props.theme.color.secondary};
    transition: width 0.2s ease-in-out;
  }

  h1 {
    font-size: 2rem;
    cursor: pointer;
  }

  a:hover,
  h1:hover {
    color: ${(props) => props.theme.color.secondary};
  }

  ul {
    display: flex;
    gap: 1rem;

    a {
      color: ${(props) => props.theme.color.primary};
      transition: color 0.3s ease-in-out;
    }
  }

  &.scrolled {
    &::after {
      width: 100%;
      z-index: -1;
    }

    a,
    h1 {
      color: ${(props) => props.theme.color.tertiary};
      transition: color 0.3s ease-in-out;
    }

    a:hover,
    :hover {
      color: ${(props) => props.theme.color.tertiary};
    }
  }
`
