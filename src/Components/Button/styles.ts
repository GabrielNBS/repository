import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
`
