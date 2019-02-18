import React from 'react';
import styled from 'styled-components'

const StyledLightsSelector = styled.div`
  flex: 1;
  padding-top: 2.4em;
  padding-right: 1em;
  padding-left: 1em;
  text-align: right; 
`;

const StyledLight = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const LightSelector = ({lights, selectedLights, onSelectLight}) => (
  <StyledLightsSelector>
    {lights.map(lightId => (
      <StyledLight viewBox="0 0 24 24" onClick={() => onSelectLight(lightId)}>
        <path fill={selectedLights.includes(lightId) ? "#000000" : "#aaa"} d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z" />
      </StyledLight>
    ))}
  </StyledLightsSelector>
);

export default LightSelector;