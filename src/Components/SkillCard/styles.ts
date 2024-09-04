import styled from 'styled-components'
import { Title } from '../Text/styles'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: azure;
  height: 480px;
  width: 360px;
  border-radius: 16px;
  box-shadow: -20px 19px 15px rgba(0, 0, 0, 0.5);

  ul {
    align-items: flex-start;
    background-color: black;
    width: 80%;
    height: 80%;

    li {
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`
