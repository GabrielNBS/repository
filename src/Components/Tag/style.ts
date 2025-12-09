import styled from 'styled-components';

export const TagContainer = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  transform: translateY(-20px);
  border-radius: 6px;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow.primary};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  position: relative;

  &::after {
    content: '★';
    position: absolute;
    top: -10px;
    right: -4px;
    color: #ffd700;
    font-size: 16px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px ${({ theme }) => theme.shadow.secondary};
  }
`;

export const TagText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.color.tertiary};
`;
