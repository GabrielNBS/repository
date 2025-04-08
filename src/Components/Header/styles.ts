import styled from 'styled-components'
import { ToggleSwitch } from '../ThemeButtonChange/styles'

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  display: flex;
  border-radius: 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: transparent;
  transition: all 0.3s ease;
  will-change: transform, opacity;

  @media ${({ theme }) => theme.device.mobile} {
    h1 {
      display: none;
    }

    ${ToggleSwitch} {
      display: none;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: ${({ theme }) => theme.color.secondary};
    opacity: 0;
    transform: scale(0.95);
    z-index: -1;
    transition: all 0.3s ease;

    @media ${({ theme }) => theme.device.mobile} {
      display: none;
    }
  }

  &.scrolled {
    width: 20dvw;
    top: 2%;
    left: 2%;
    opacity: 0.95;
    transition: all 0.3s ease;

    &::before {
      opacity: 1;
      transform: scale(1);
    }

    @media ${({ theme }) => theme.device.mobile} {
      opacity: 0.85;
      justify-content: center;
    }
  }
`

export const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  background: transparent;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 5;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }

  span {
    position: absolute;
    width: 100%;
    height: 5px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.color.primary};
  }

  span:nth-child(1) {
    top: 0.5rem;
  }

  span:nth-child(2) {
    top: 1.1rem;
  }

  span:nth-child(3) {
    bottom: 0.5rem;
  }
`

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 80%;
  max-width: 300px;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 0 1rem 1rem 0;
  z-index: 3;
  padding: 2rem 1rem;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 1.5rem;
  }

  @media ${({ theme }) => theme.device.desktop} {
    display: none;
  }
`
