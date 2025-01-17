import styled from 'styled-components'
import { centralize } from '../../keyframes/Centralize'

export const CardBox = styled.div`
  display: grid;
  grid-template-rows: 20% 60% 20%;
  width: 300px;
  height: 320px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .cardIcon {
    justify-self: flex-end;
    margin: 15px 15px 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    ${centralize}
    font-size: 24px;
  }

  .cardDescription {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    padding: 0 10px;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
    gap: 2rem;
  }

  .cardTechs {
    ${centralize}
    gap: 5px;
    padding: 0 10px;

    li {
      font-size: 14px;
      color: black;
      padding: 2px 4px;
      border-radius: 8px;
    }
  }
`
