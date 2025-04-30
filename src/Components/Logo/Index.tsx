import React from 'react';
import styled, { keyframes } from 'styled-components';

const svgDraw = keyframes`
  0% {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border-radius: 1rem;
  cursor: pointer;
`;

const AnimatedSVG = styled.svg`
  width: 80px;
  height: 40px;
  path,
  text {
    fill: none;
    stroke: ${(props) => props.theme.color.primary};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${svgDraw} 6s ease-in-out infinite;
  }
`;

export default function Logo() {
  return (
    <LogoWrapper aria-label="Logo SVG animada">
      <AnimatedSVG viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V70.338H89.521V0H0ZM19.184 53.481L12.79 47.085L19.184 40.691L25.578 34.2971C25.578 34.2971 21.681 30.4 19.184 27.903C16.687 25.406 12.79 21.509 12.79 21.509L15.987 18.3115L19.184 15.114L28.7755 24.7055L38.367 34.2971L28.7755 43.889L19.184 53.481Z" />
        <text x="45" y="35" fontSize="24" dominantBaseline="middle" fill="aliceblue">
          G
        </text>
      </AnimatedSVG>
    </LogoWrapper>
  );
}
