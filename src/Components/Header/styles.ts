import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  width: 720px;
  justify-content: space-around;
  border-radius: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 2rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  ul {
    display: flex;
    gap: 1rem;
  }
`
