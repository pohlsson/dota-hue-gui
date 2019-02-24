import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 5em;
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  background: #000;
  padding-left: 10em;
  padding-right: 21em;
  >*:first-child {
    flex: 1;
  }
  p {
    padding-top: 0.2em;
    font-size: 0.7em;
    color: #fff;
  }
  svg {
    cursor: pointer;
    float: right;
    color: #fff;
  }
`;

const Header = ({children}) => (
  <StyledHeader>
    {children}
  </StyledHeader>
);

export default Header;