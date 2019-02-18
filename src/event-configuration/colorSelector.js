import React from 'react';
import {TwitterPicker} from "react-color";
import styled from 'styled-components';

const StyledColorSelectorWrapper = styled.section`
    flex: 1;
    padding-top: 0.2em;
    padding-left: 2em;
`;

const ColorSelector = ({selectedColor, onSelectColor}) => (
  <StyledColorSelectorWrapper>
    <TwitterPicker
      colors={['#B80000', '#FCCB00', '#008B02', '#004DCF',]}
      color={selectedColor}
      onChangeComplete={onSelectColor}
      width={170}
      triangle="hide"
    />
  </StyledColorSelectorWrapper>
);

export default ColorSelector;