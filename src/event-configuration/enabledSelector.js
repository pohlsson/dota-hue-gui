import React from 'react';
import Switch from "@material-ui/core/Switch/Switch";
import styled from 'styled-components';

const StyledEnabledSelector = styled.section`
  flex: 1;
  padding-top: 1.7em;
  padding-right: 0.5em;
  text-align: right;
`;

const EnabledSelector = ({enabled, onChange}) => (
  <StyledEnabledSelector>
    <Switch
      checked={enabled}
      onChange={onChange}
      color="primary"
      inputProps={{
        name: 'bountyRuneSpawning',
      }}
    />
  </StyledEnabledSelector>
);

export default EnabledSelector;