import styled from 'styled-components'

export const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(props) => props.theme.background.primary};
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 0.5em;

  &:after {
    content: ' ';
    width: 0%;
    height: 100%;
    background: ${(props) => props.theme.background.secondary};
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }

  &:hover::after {
    right: auto;
    left: 0;
    width: 100%;
  }

  span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    color: #fff;
    font-size: 1.125em;
    font-weight: 700;
    z-index: 20;
    transition: all 0.3s ease-in-out;
  }

  &:hover span {
    color: red;
    animation: scaleUp 0.3s ease-in-out;
  }

  @keyframes scaleUp {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }
`
