import styled from 'styled-components';

export const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    transform-style: preserve-3d;
    perspective: 500px;
    animation: toggle__animation 3s infinite;
  }

  .switch::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    filter: blur(20px);
    z-index: -1;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.background.secondary};
    background-image: radial-gradient(
        at 21% 46%,
        ${({ theme }) => theme.color.secondary} 0px,
        transparent 50%
      ),
      radial-gradient(at 23% 25%, ${({ theme }) => theme.color.primary} 0px, transparent 50%),
      radial-gradient(at 20% 1%, ${({ theme }) => theme.color.secondary} 0px, transparent 50%),
      radial-gradient(at 86% 87%, ${({ theme }) => theme.color.primary} 0px, transparent 50%),
      radial-gradient(at 99% 41%, ${({ theme }) => theme.color.secondary} 0px, transparent 50%),
      radial-gradient(at 55% 24%, ${({ theme }) => theme.color.primary} 0px, transparent 50%);
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.background.primary};
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.35em;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow:
      rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
      rgba(0, 0, 0, 0.09) 0px -1px 15px -8px;
    background-color: ${({ theme }) => theme.color.secondary};
    background-image: radial-gradient(
        at 81% 39%,
        ${({ theme }) => theme.color.secondary} 0px,
        transparent 50%
      ),
      radial-gradient(at 11% 72%, ${({ theme }) => theme.color.primary} 0px, transparent 50%),
      radial-gradient(at 23% 20%, ${({ theme }) => theme.color.secondary} 0px, transparent 50%);
  }

  .input__check:checked + .slider {
    background-color: ${({ theme }) => theme.background.secondary};
  }

  .input__check:checked + .slider:before {
    transform: translateX(1.5em);
  }

  @keyframes toggle__animation {
    0%,
    100% {
      transform: translateY(-10px) rotateX(15deg) rotateY(-20deg);
    }
    50% {
      transform: translateY(0px) rotateX(15deg) rotateY(-20deg);
    }
  }
`;
