import React from 'react'
import styled from 'styled-components'

interface SvgIconProps {
  width?: string
  height?: string
  color?: string
}

const SvgContainer = styled.svg<SvgIconProps>`
  width: ${({ width }) => width || '24px'};
  height: ${({ height }) => height || '24px'};
  fill: ${({ color }) => color || 'currentColor'};
`

const ExampleSvg: React.FC<SvgIconProps> = ({ width, height, color }) => {
  return (
    <SvgContainer
      width={width}
      height={height}
      color={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Aqui você pode adicionar qualquer conteúdo SVG */}
    </SvgContainer>
  )
}

export default ExampleSvg
