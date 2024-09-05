import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  padding: 0 1rem;
  max-width: 720px;
  width: 100%;
  justify-content: space-between;
  border-radius: 2rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 2rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ul {
    display: flex;
    gap: 1rem;
  }
`
