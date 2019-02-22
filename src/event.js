import React from 'react';
import styled from 'styled-components';

const StyledEventConfiguration = styled.div`
  display: flex;
`;

class Event extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
      eventName: props.eventName,
      lights: props.lights
    }
  }

  render() {
    return (
      <StyledEventConfiguration>
        <div>Enabled:</div>
        <div>Lights:</div>
        <div>Color:</div>
      </StyledEventConfiguration>
    )
  }
}
