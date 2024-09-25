import styled from 'styled-components'

export const Button = styled.button`
  position: relative;
  background-color: #fff;
  border: solid 1px ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.background.primary};
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: -7px 6px 6px 1px rgba(0, 0, 0, 0.7);
  z-index: 3;
  transition: color ease-in 0.5s;

  &:before {
    content: '';
    height: 100%;
    width: 0;
    background-color: ${(props) => props.theme.background.primary};
    position: absolute;
    z-index: -1;
    border-radius: 12px;
    top: 0;
    left: 0;
    transition: width ease-in 0.3s;
  }

  &:hover {
    filter: contrast(1.1);
    color: #fff;
    transition: color ease-in 0.5s;

    &:before {
      width: 100%;
      transition: width ease-in 0.3s;
    }
  }
`
