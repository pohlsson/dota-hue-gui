import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import HueBridgeFinder from "./hueBridgeFinder";
import {Dialog} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import StepContent from "@material-ui/core/StepContent/StepContent";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Step from "@material-ui/core/Step/Step";
import Stepper from "@material-ui/core/Stepper/Stepper";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const Hue = require('philips-hue');

const StyledHueBridgeSetup = styled(Dialog)`
    padding: 2em;
    .MuiDialog-paperWidthSm-9 {
      min-width: 600px;
    }
`;

const StyledHueBridgeSetupHeader = styled.header`
    display: flex;
    background-color: #ccc;
    >h3 {
        padding-left: 1em;
        flex: 1;
    }
    >button {
        margin-top: 0.25em;
        margin-right: 0.25em;
        width: 2em;
        height: 2em;
    }
`;

const StyledError = styled(Typography)`
    padding: 1em;
`;

const StyledButtons = styled.div`
    text-align: left;
    padding-top: 1em;
`;

class HueBridgeSetup extends React.Component {

  state = {
    activeStep: 0,
    bridge: undefined,
    username: undefined,
    lights: {},
    error: undefined,
  };

  getNextButton = (props) => (
    <Button
      variant="contained"
      color="primary"
      onClick={this.handleNext}
      {...props}
    >
      Next
    </Button>
  );

  getSteps = () => {
    return ['Select Hue bridge', 'Authenticate', 'Done'];
  };

  getStepContent = step => {
    const {bridge, username, error} = this.state;
    switch (step) {
      case 0:
        return (
          <Typography>
            <HueBridgeFinder onSelectBridge={bridge => this.setState({bridge})}/>
            {this.getNextButton({disabled: !bridge})}
          </Typography>
        );
      case 1:
        return (
          <Typography>
            In order to connect to your Philips Hue bridge, you need to be authenticated. Do this by clicking the link
            button on the bridge, and then press Authenticate.
            {(!username && error) && <StyledError color="error">
              {error}
            </StyledError>}
            {username ? <StyledButtons>{this.getNextButton()}</StyledButtons> :
              <StyledButtons>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.authenticate}
                >
                  Authenticate
                </Button>
              </StyledButtons>
            }
          </Typography>
        );
      case 2:
        return (
          <Typography>
            {Object.keys(this.state.lights).length + " lights found, click finish to complete the configuration."}
            <StyledButtons>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.onClose({
                  bridge: this.state.bridge,
                  username: this.state.username,
                  lights: this.state.lights,
                })}
              >
                Finish
              </Button>
            </StyledButtons>
          </Typography>
        );
      default:
        return 'Unknown step';
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  authenticate = () => {
    const hue = new Hue();
    hue.auth(this.state.bridge).then(username => {
      this.setState({username});
      return {bridge: this.state.bridge, username}
    }).then(hueConfig => {
      hue.bridge = hueConfig.bridge;
      hue.username = hueConfig.username;
      return hue.getLights();
    }).then(lights => this.setState({
      lights: Object.keys(lights).map(lightId => ({
        id: lightId,
        type: lights[lightId].productname,
        name: lights[lightId].name,
        enabled: true,
        color: "#fff",
      }))
    }))
      .catch(() => this.setState({error: "Error: Link button was not pressed!"}))
  };

  render() {
    const steps = this.getSteps();
    const {activeStep} = this.state;

    return (
      <StyledHueBridgeSetup
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <StyledHueBridgeSetupHeader>
          <h3>Configure Hue bridge</h3>
          <IconButton aria-label="Close" onClick={this.props.onClose}>
            <CloseIcon/>
          </IconButton>
        </StyledHueBridgeSetupHeader>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {this.getStepContent(index)}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </StyledHueBridgeSetup>
    );
  }
}

{/*<Button
  variant="contained"
  color="primary"
  disabled={(activeStep === 0 && !bridge) || (activeStep === 1 && !username)}
  onClick={() => this.props.onClose({bridge, username})}
>
  Finish
</Button>*/
}

export default HueBridgeSetup;