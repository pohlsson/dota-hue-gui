import React from 'react';
import styled from 'styled-components';
import Switch from "@material-ui/core/Switch/Switch";
import {GithubPicker} from 'react-color';
import Typography from "@material-ui/core/Typography/Typography";

const colors = ['#f00', '#ff9100', '#fff200', '#2f0', '#00ffc8', '#4000ff', '#9d00ff'];

const StyledLightWrapper = styled.li`
    display: block;
    background-color: ${props => props.disabled ? "#dedede" : "#efefef"};
    border-bottom: 1px solid #bbb;
    border-top: 1px solid #eee;
`;

const StyledLight = styled.div`
    display: flex;
    line-height: 1em;
    position: relative;
    p {
      flex: 1;
      padding: 1em;
      ${props => props.disabled && "color: #aaa"}
    }
`;

const StyledSwitch = styled(Switch)`
  border-right: 1px solid #bbb;
`;

const StyledColorIndicator = styled.div`
  width: 0.5em;
  background-color: ${props => props.disabled ? "#aaa" : props.color};
  border-left: 1px solid #bbb;
`;

const StyledColorPicker = styled(GithubPicker)`
  width: auto !important;
  margin: 0.3em;
  -webkit-box-shadow: none !important;
	-moz-box-shadow: none !important;
	box-shadow: none !important;
`;


const Light = props => {
  const {light, onEnable, onChangeColor} = props;
  const {name, enabled, color, type} = light;
  console.log(type);
  return (
    <StyledLightWrapper
      disabled={!enabled}
      color={color}>
      <StyledLight disabled={!enabled}>
        <StyledColorIndicator
          disabled={!enabled}
          color={color}
        />
        <StyledSwitch
          selectedColor={color}
          color="primary"
          checked={enabled}
          onChange={(_, value) => onEnable(value)}
        />
        <Typography>{name}</Typography>
        {enabled && <StyledColorPicker
          triangle="hide"
          color={color}
          colors={colors}
          onChangeComplete={onChangeColor}
        />}
      </StyledLight>
    </StyledLightWrapper>
  );
};

export default Light;