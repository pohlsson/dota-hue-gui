import React from 'react';
import styled from 'styled-components';

const StlyedColorIndicator = styled.div`
  background-color: ${props => props.color};
  width: 0.5em;
  cursor: pointer;
`;

const ColorIndicator = props => (
  <StlyedColorIndicator {...props}>
  </StlyedColorIndicator>
);

export default ColorIndicator;