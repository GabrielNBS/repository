import React from 'react';
import { StyledListItem } from './styles';

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <StyledListItem>{children}</StyledListItem>;
};

export default ListItem;
