import React from 'react';
import { ThemeToggleProps } from '../../types/ThemesProps';
import { StyledWrapper } from './styles';

const ChangeThemeCheckbox: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const handleCheckboxChange = () => {
    toggleTheme(); // Chame a função changeTheme quando o checkbox mudar de estado
  };

  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" className="input__check" onChange={handleCheckboxChange} />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

export default ChangeThemeCheckbox;
