import React from 'react';
import styled from 'styled-components';

const StyledPanel = styled.section`
  background-color: #cdd0d5;
  box-shadow: 3px 3px 5px -4px rgba(0,0,0,0.75);
  border-radius: 5px;
  max-width: 45em;
`;

const StyledPanelRow = styled.div`
  display: flex;
  border: 1px solid #aaa;
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid #aaa;
  }
`;

const StyledPanelRowTitle = styled.section`
  flex: 2;
  display: flex;
  border-right: 1px solid #aaa;
  background: #fff;
  >h3 {
    padding:1em;
  }
`;

const StyledPanelRowContent = styled.section`
  display: ${props => props.active ? 'flex' : 'none'};
`;

const Panel = ({children}) => (
  <StyledPanel>
    {children}
  </StyledPanel>
);

const PanelRow = ({children}) => (
  <StyledPanelRow>
    {children}
  </StyledPanelRow>
);

const PanelRowTitle = ({children}) => (
  <StyledPanelRowTitle>
    {children}
  </StyledPanelRowTitle>
);

const PanelRowContent = ({children, active}) => (
  <StyledPanelRowContent active={active}>
    {children}
  </StyledPanelRowContent>
);

export {
  Panel,
  PanelRow,
  PanelRowTitle,
  PanelRowContent,
};