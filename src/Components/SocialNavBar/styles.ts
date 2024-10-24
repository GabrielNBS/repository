import styled from 'styled-components'

export const SocialLinks = styled.aside`
  position: absolute;
  height: 16rem;
  width: 6rem;
  background-color: ${(props) => props.theme.background.secondary};
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0 1rem 1rem 0;
  box-shadow: 8px 11px 10px rgba(0, 0, 0, 0.4);
  color: white;

  ul {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    a {
      font-size: 2rem;
      animation: shak infinite 0.2s;
    }
  }
`
