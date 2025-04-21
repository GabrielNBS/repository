import { styled } from 'styled-components';
import { centralize } from '../../keyframes/Centralize';

export const StyledListItem = styled.li`
  ${centralize}
  background-color: ${(props) => props.theme.background.primary};
  padding: 1rem 2rem;
  color: ${(props) => props.theme.color.primary};
  border-radius: 1rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.background.primary};
  font-weight: 700;
  box-shadow:
    6px 6px 12px ${(props) => props.theme.shadow.secondary},
    -6px -6px 12px ${(props) => props.theme.shadow.tertiary};
  transition: all 0.4s ease;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    filter: contrast(1.1);
  }
`;
