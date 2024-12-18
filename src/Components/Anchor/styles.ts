import styled from 'styled-components'

export const AnchorContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
`

export const AnchorDot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#FFD700' : '#ccc')};
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0ad4e;
  }
`
