import styled from 'styled-components';

export const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
  cursor: pointer;
  z-index: 11;
`;

export const SwitchLabel = styled.label`
  position: absolute;
  width: 100%;
  height: 25px;
  background-color: var(--dark);
  border-radius: 12.5px;
  cursor: pointer;
  border: 1.5px solid var(--dark);
`;
export const Slider = styled.span`
  position: absolute;
  width: 50%;
  height: 100%;
  border-radius: 12.5px;
  -webkit-transition: 0.3s;
  transition: 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    -webkit-box-shadow: inset 6px -2px 0px 0px var(--light);
    box-shadow: inset 6px -2px 0px 0px var(--light);
    background-color: var(--dark);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
`;

export const Checkbox = styled.input`
  position: absolute;
  display: none;

  &:checked ~ ${Slider} {
    width: 100%;
    background-color: var(--light);
  }

  &:checked ~ ${Slider}::before {
    -webkit-transform: translateX(25px);
    -ms-transform: translateX(25px);
    transform: translateX(25px);
    background-color: var(--dark);
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;
