import React from 'react';
import styled from 'styled-components';
import Switch from "@material-ui/core/Switch/Switch";
import {BlockPicker} from 'react-color';
import Typography from "@material-ui/core/Typography/Typography";

const colors = ['#f00', '#ff9100', '#fff200', '#2f0', '#00ffc8', '#4000ff', '#9d00ff', '#fff'];

const StyledLightWrapper = styled.div`
    flex: 1;
    width: auto;
    min-width: 10em;
    background: #eee;
    border: 1px solid #aaa;
    padding: 0.2em;
    margin-left: -1px;
    >div {
      width: auto;
    }
    &:first-child {
      margin-left: 0;
    }
    
`;

const StyledLight = styled.div`
    width: 15em;
    text-align: -webkit-center
    .block-picker {
        display: ${props => props.enabled ? "block" : "none"};
        width: auto !important;
        background: #ccc !important;
        border: 1px solid #aaa;
        margin: 1em;
    }
`;

const StyledLightHeader = styled.div`
  display: flex;
  cursor: pointer;
  >p {
    margin-top: 1em;
  }
`;

const Light = props => {
  const {name, enabled, type, color, onEnable, onChangeColor} = props;
  return (
    <StyledLightWrapper>
      <StyledLight enabled={enabled}>
        <StyledLightHeader>
          <Switch
            color="primary"
            checked={enabled}
            onChange={(_, value) => onEnable(value)}
          />
          <Typography>{name}</Typography>

        </StyledLightHeader>
        <BlockPicker
          triangle="hide"
          color={color}
          colors={colors}
          onChangeComplete={onChangeColor}
        />
      </StyledLight>
    </StyledLightWrapper>
  );
};

export default Light;