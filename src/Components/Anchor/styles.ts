import styled from 'styled-components';

export const AnchorContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  gap: 10px;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  z-index: 100;

  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;

export const AnchorDot = styled.div<{ $active: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? (props) => props.theme.color.secondary : 'rgba(70, 70, 70, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.color.primary};
  }
`;
