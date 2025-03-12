import styled from 'styled-components'

export const Button = styled.button`
  color: ${(props) => props.theme.color.secondary};
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 4px;
  padding: 1em 3em;
  background: ${(props) => props.theme.background.primary};
  transition: 0.2s;

  &:hover {
    color: ${(props) => props.theme.color.primary};
    transform: translate(-0.25rem, -0.25rem);
    background: ${(props) => props.theme.background.primary};
    box-shadow: 0.25rem 0.25rem ${(props) => props.theme.background.tertiary};
  }

  &:active {
    transform: translate(0);
    box-shadow: none;
  }
`
