import styled from 'styled-components'

export const HeroSection = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  .custom-shape-divider-bottom-1730261902 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-bottom-1730261902 svg {
    position: relative;
    display: block;
    width: calc(102% + 1.3px);
    height: 181px;
  }

  .custom-shape-divider-bottom-1730261902 .shape-fill {
    fill: ${(props) => props.theme.background.secondary};
  }
`
