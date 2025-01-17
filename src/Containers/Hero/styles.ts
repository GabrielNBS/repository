import styled from 'styled-components'

export const HeroSection = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 5;

  .children_names {
    position: absolute;
    color: transparent;
    font-size: 104px;
    writing-mode: vertical-lr;
    -webkit-text-stroke: 2px rgba(264, 264, 264, 0.1);
    pointer-events: none;
    right: 50px;
    top: 1em;
  }

  h1 {
    font-size: 5rem;
    position: relative;
    display: inline-block;
    background: linear-gradient(to right, #fefb9d, #ff7e5f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: wave 5s linear infinite;
  }

  p {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 1;
    filter: brightness(0.8);

    span {
      font-weight: 700;
      color: #ff7e5f;
    }
  }

  div.container {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  @keyframes wave {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`
