import React from 'react';
import Light from './light.js';
import styled from 'styled-components';

const StyledLightConfiguration = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 7em;
  margin-right: 2em;
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
      {lights.map(light => (
        <Light
          {...light}
          onEnable={value => handleLightChange(light.id, 'enabled', value)}
          onChangeColor={color => handleLightChange(light.id, 'color', color.hex)}
        />
      ))}
    </StyledLightConfiguration>
  );
};

export default LightConfiguration;