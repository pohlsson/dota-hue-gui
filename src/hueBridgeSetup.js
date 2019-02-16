import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import HueBridgeFinder from "./hueBridgeFinder";

const StyledStepContent = styled.div`
    padding: 2em;
`;

function getSteps() {
    return ['Select Hue Bridge', 'Authenticate', 'Done'];
}


class HueBridgeSetup extends React.Component {
    state = {
        activeStep: 0,
        bridge: undefined,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    getStepContent = stepIndex => {
        switch (stepIndex) {
            case 0:
                return (
                    <StyledStepContent>
                        <HueBridgeFinder onSelectBridge={bridge => this.setState({bridge})}/>
                    </StyledStepContent>
                );
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }
    render() {
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography>All steps completed</Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography>{this.getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    disabled={this.state.bridge === undefined}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default HueBridgeSetup;