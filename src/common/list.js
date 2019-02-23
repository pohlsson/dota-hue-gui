import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  background-color: #cdd0d5;
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  padding: 1em;
`;

const List = ({children}) => (
  <StyledList>
    {children}
  </StyledList>
);

const ListItem = ({children}) => (
  <StyledListItem>
    {children}
  </StyledListItem>
);

export {
  List,
  ListItem,
};