import React from 'react';
import Button from "@material-ui/core/Button/Button";
import styled from 'styled-components';
import {RadioGroup} from "@material-ui/core";
import Radio from "@material-ui/core/Radio/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Hue = require('philips-hue');
const hue = new Hue();
const bridges = [];

const StyledBridgeList = styled(RadioGroup)`
    
`;

class HueBridgeFinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bridges: [],
            selectedBridge: undefined,
        }
    }

    findHueBridges() {
        hue.getBridges()
            .then(bridges => {
                this.setState({bridges});
            }).catch(error => {
            console.log(error);
        });
    }

    handleSelectBridge(event) {
        const bridge = event.target.value;
        this.setState({ selectedBridge: bridge});
        this.props.onSelectBridge(bridge)
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.findHueBridges()}>
                    Find Bridges
                </Button>
                <StyledBridgeList
                    value={this.state.selectedBridge}
                    onChange={event => this.handleSelectBridge(event)}
                >
                    {this.state.bridges.map(bridge => (
                        <FormControlLabel
                            key={bridge}
                            value={bridge}
                            control={<Radio />}
                            label={bridge}
                        />
                    ))}
                </StyledBridgeList>
            </div>
        )
    }
}

export default HueBridgeFinder;