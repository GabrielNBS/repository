import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  transition: all 0.2s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background-color: ${({ theme }) => theme.color.secondary};
    transition: all 0.2s ease-in-out;
  }

  &.scrolled {
    width: 15%;
    height: 5rem;
    top: 2%;
    left: 2%;
    border-radius: 3rem;
    transition: all 0.2s ease-in-out;

    @media ${({ theme }) => theme.device.mobile} {
      opacity: 0.7;
    }
    &::after {
      border-radius: 3rem;
      width: 100%;
      z-index: -1;
    }

    ul {
      display: flex;
      gap: 1rem;

      a {
        color: ${({ theme }) => theme.color.primary};
        transition: color 0.3s ease-in-out;
      }
    }

    a,
    h1 {
      color: ${({ theme }) => theme.background.primary};
      transition: color 0.3s ease-in-out;
    }

    a:hover,
    &:hover {
      color: ${({ theme }) => theme.background.secondary};
    }
  }

  &.expanded {
    width: 30%;
    opacity: 1;
  }
`
