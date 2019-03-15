import React from 'react';
import Light from './light.js';
import styled from 'styled-components';
import IconButton from "@material-ui/core/IconButton/IconButton";

const StyledLightConfiguration = styled.div`
  padding-left: 5em;
`;

const StyledLightList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 2em;
  padding-top: 7em;
`;

const LightConfiguration = props => {
  const {lights, onChangeConfiguration} = props;

  const handleLightChange = (lightId, change, value) => {
    const updatedLightConfiguration = lights.map(light => {
      if (light.id === lightId) {
        return {
          id: lightId,
          ...light,
          [change]: value,
        }
      } else {
        return light;
      }
    });
    onChangeConfiguration(updatedLightConfiguration);
  };

  return (
    <StyledLightConfiguration>
      <StyledLightList>
      {lights.map(light => (
        <Light
          light={light}
          onEnable={value => handleLightChange(light.id, 'enabled', value)}
          onChangeColor={color => handleLightChange(light.id, 'color', color.hex)}
        />
      ))}
      </StyledLightList>
    </StyledLightConfiguration>
  );
};

export default LightConfiguration;