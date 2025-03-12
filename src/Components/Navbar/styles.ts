import styled from 'styled-components'
import { Text } from '../Text/styles'

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
      color: ${(props) => props.theme.background.primary};
      transition: color 0.3s ease-in-out;
    }

    a:hover,
    :hover {
      color: ${(props) => props.theme.background.secondary};
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    ${Text} {
      display: none;
    }

    flex-direction: row-reverse;
  }
`
export const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  span {
    width: 100%;
    height: 0.25rem;
    background-color: ${(props) => props.theme.color.primary};
  }
`
export const MobileNav = styled.nav`
  position: absolute;
  height: 100vh;
  width: 40%;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.background.secondary};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);

  ul {
    flex-direction: column;

    li {
      font-size: 1.2rem;
    }
  }
`
