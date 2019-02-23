import React from 'react';
import styled from 'styled-components';
import Switch from "@material-ui/core/Switch/Switch";
import { BlockPicker } from 'react-color';

const StyledLight = styled.div`
`;

const Light = props => {
    const {enabled, type, color, onEnable, onChangeColor} = props;
    return (
      <StyledLight>
        <Switch
          checked={enabled}
          onChange={(_, value) => onEnable(value)}
        />
        {type}
        <BlockPicker
          color={color}
          onChangeComplete={onChangeColor}
        />
      </StyledLight>
    );
};

export default Light;