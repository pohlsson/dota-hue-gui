import React from 'react';
import Light from './light.js';
import styled from 'styled-components';

const StyledLightConfiguration = styled.div`
  display:flex;
  flex-wrap: wrap;
  margin-left: 10em;
  margin-right: 5em;
  padding-top: 10em;
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
    console.log(lightId, updatedLightConfiguration)
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