import React from 'react';
import styled from 'styled-components';

const StyledSideMenu = styled.ul`
  background-color: #303d4a;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  height: calc(100% - 5em);
  top: 5em;
  left: 20em;
  width: 15em;
`;

const StyledSideMenuItem = styled.li`
  position: relative;
  padding: 1em;
  cursor: pointer;
  border-top: 1px solid #475a6d;
  border-bottom: 1px solid #2d3033;
  ::before {
    display: ${props => props.selected ? "block" : "none"};
    content: "";
    height: 100%;
    width: 0.5em;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #6eafef; 
  }
  :hover::before { 
    display: block;
  }
  color: #fff;
  p {
    color: #fff; 
  }
`;

const SideMenu = ({children}) => (
  <StyledSideMenu>
    {children}
  </StyledSideMenu>
);

const SideMenuItem = ({children, selected}) => (
  <StyledSideMenuItem selected={selected}>
    {children}
  </StyledSideMenuItem>
);

export {
  SideMenu,
  SideMenuItem,
};