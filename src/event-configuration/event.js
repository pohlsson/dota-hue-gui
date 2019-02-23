import React from 'react';
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography/Typography";

const StyledEventConfiguration = styled.div`
  display: flex;
`;

const Event = props => {
  const {name, onClick} = props;
  return (
    <StyledEventConfiguration onClick={onClick}>
      <h3>
        <Typography>
          {name}
        </Typography>
      </h3>
    </StyledEventConfiguration>
  )
};

export default Event;
