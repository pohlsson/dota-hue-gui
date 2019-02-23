import React from 'react';
import styled from 'styled-components';
import LightConfiguration from './lightConfiguration.js';

const StyledLightConfiguration = styled.div`
`;

class LightSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lights: props.lights,
    }
  }

  updateLightConfiguration = configuration => {

  };

  render() {
    const {lights} = this.state;
    return (
      <StyledLightConfiguration>
        {lights.map(light => (
          <LightConfiguration
            key={{light.id}}
            onUpdateConfiguration={configuration => this.updateLightConfiguration(configuration)}
          >

          </LightConfiguration>
        ))}
      </StyledLightConfiguration>
    );
  }
}

export default LightSection;