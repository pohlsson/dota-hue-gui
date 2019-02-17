import React from 'react';
import Button from "@material-ui/core/Button/Button";
import styled from 'styled-components';
import {RadioGroup} from "@material-ui/core";
import Radio from "@material-ui/core/Radio/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Hue = require('philips-hue');
const hue = new Hue();
const bridges = [];

const StyledHueBridgeFinder = styled.div`
    width: 30em;
    padding: 2em;
`;

const StyledBridgeList = styled(RadioGroup)`
    padding: 1em;
    border: 1px solid #aaa;
    borer-radius: 3px;
    height: 10em;
    flex: 1;
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

    componentWillMount() {
        this.findHueBridges();
    }

    render() {
        return (
            <StyledHueBridgeFinder>
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
            </StyledHueBridgeFinder>
        )
    }
}

export default HueBridgeFinder;