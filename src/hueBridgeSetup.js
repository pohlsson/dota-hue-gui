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
    display: flex;
    padding-top: 2em;
    justify-content: flex-end;
`;

class HueBridgeSetup extends React.Component {

    state = {
        activeStep: 0,
        bridge: undefined,
        username: undefined,
        error: undefined,
    };

    getSteps = () => {
        return ['Select Hue bridge', 'Authenticate', 'Save configuration'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <HueBridgeFinder onSelectBridge={bridge => this.setState({bridge})}/>
            case 1:
                return 'In order to connect to your Philips Hue bridge, you need to be authenticated. Do this by clicking the link button on the bridge, and then press Authenticate.';
            case 2:
                return "";
            default:
                return 'Unknown step';
        }
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    authenticate = () => (
        new Hue().auth(this.state.bridge).then(username => {
            this.setState({username});
            console.log(username);
        }).catch(error => {
            this.setState({
                error: "Error: Link button was not pressed!",
                username: 'kKhPZ2KLUPV1wamm43A1mmfBS3l9P4Et139tklpm'
            });
        }));

    render() {
        const steps = this.getSteps();
        const {activeStep, bridge, username} = this.state;

        return (
            <StyledHueBridgeSetup
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <StyledHueBridgeSetupHeader>
                    <h3>Configure Hue bridge</h3>
                    <IconButton aria-label="Close" onClick={this.props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledHueBridgeSetupHeader>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{this.getStepContent(index)}</Typography>
                                {activeStep === 1 && <StyledError color="error">{this.state.error}</StyledError>}
                                <div>
                                    <div>
                                        {activeStep === 1 &&
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.authenticate}
                                        >
                                            Authenticate
                                        </Button>
                                        }
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={(activeStep === 0 && !bridge) ||(activeStep === 1 && !username)}
                                            onClick={this.handleNext}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </StyledHueBridgeSetup>
        );
    }
}

export default HueBridgeSetup;