import styled from 'styled-components'
import { Text } from '../Text/styles'
import { Button } from '../Button/styles'

export const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  height: 4rem;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  /* Pseudo-elemento para efeito de background */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background-color: ${({ theme }) => theme.color.secondary};
    transition: width 0.2s ease-in-out;
  }

  h1 {
    font-size: 2rem;
    cursor: pointer;
  }

  /* Hover padrão */
  a:hover,
  h1:hover {
    color: ${({ theme }) => theme.color.secondary};
  }

  ul {
    display: flex;
    gap: 1rem;

    a {
      color: ${({ theme }) => theme.color.primary};
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
      color: ${({ theme }) => theme.background.primary};
      transition: color 0.3s ease-in-out;
    }

    a:hover,
    &:hover {
      color: ${({ theme }) => theme.background.secondary};
    }
  }

  /* Ajuste para dispositivos mobile */
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
    background-color: ${({ theme }) => theme.color.primary};
  }
`

export const MobileNav = styled.nav<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100dvh;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  background-color: #3c3d37;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: right 0.5s ease-in-out;

  div:nth-child(2) {
    margin: 0 auto;
  }

  ul {
    display: flex;
    flex-direction: column;

    ${Button} {
      text-align: center;
      color: white;
      display: flex;
    }
  }
`
