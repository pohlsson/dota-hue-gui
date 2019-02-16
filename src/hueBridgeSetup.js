import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import HueBridgeFinder from "./hueBridgeFinder";

const Hue = require('philips-hue');

const StyledHueBridgeSetup = styled.div`
    padding: 2em;
    >button {
      margin-top: 5em;
    }
`;

class HueBridgeSetup extends React.Component {

    state = {
        activeStep: 0,
        bridge: undefined,
        username: undefined,
    }

    authenticate = () => (
        new Hue().auth(this.state.bridge).then(username => {
            this.setState({username});
            console.log(username);
        }).catch(error => console.log(error)));

    render() {
        const {activeStep} = this.state;

        return (
            <StyledHueBridgeSetup>
                <HueBridgeFinder onSelectBridge={bridge => this.setState({bridge})}/>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.bridge}
                        onClick={this.authenticate}
                    >
                        Authenticate
                    </Button>
            </StyledHueBridgeSetup>
        );
    }
}

export default HueBridgeSetup;