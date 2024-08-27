import React from 'react'
import * as S from './styles'
import { ThemeToggleProps } from '../../types/ThemesProps'

const ChangeThemeCheckbox: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const handleCheckboxChange = () => {
    toggleTheme() // Chame a função changeTheme quando o checkbox mudar de estado
  }

  return (
    <S.ToggleSwitch>
      <S.SwitchLabel>
        <S.Checkbox type="checkbox" onChange={handleCheckboxChange} />
        <S.Slider />
      </S.SwitchLabel>
    </S.ToggleSwitch>
  )
}

export default ChangeThemeCheckbox
