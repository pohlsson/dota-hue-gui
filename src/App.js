import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import {startDotaHueService} from './Api.js';
import {GithubPicker} from 'react-color';
import HueBridgeSetup from './hueBridgeSetup.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: "bountyRuneSpawning",
      lightConfiguration: {
        bountyRuneSpawning: {
          on: true,
        }
      },
    };
  }

  handleToggleSwitch() {
    this.setState(state => ({
      lightConfiguration: {
        ...state.lightConfiguration,
        [state.selectedEvent]: {
          ...state.lightConfiguration[state.selectedEvent],
          on: !state.lightConfiguration[state.selectedEvent].on,
        }
      }
    }));
  }

  handleSelectColor(color) {
    this.setState(state => ({
      lightConfiguration: {
        ...state.lightConfiguration,
        [state.selectedEvent]: {
          ...state.lightConfiguration[state.selectedEvent],
          color: color.hsv,
        }
      }
    }))
  }

  handleStartDotaHueService() {
    startDotaHueService({lightConfiguration: this.state.lightConfiguration})
  }

  render() {
    const {lightConfiguration, selectedEvent} = this.state;
    return (
      <div className="App">
        <header className="App-header" />
        <HueBridgeSetup/>
{/*
        <span>Bounty rune will spawn</span>
        <Switch
          checked={selectedEvent.bountyRuneSpawning.on}
          onChange={() => this.handleToggleSwitch()}
          color="primary"
          inputProps={{
            name: 'bountyRuneSpawning',
          }}
        />
        <GithubPicker
          colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB']}
          color={lightConfiguration[selectedEvent].color}
          disableAlpha={true}
          onChangeComplete={color => this.handleSelectColor(color)}
        />
        <button onClick={() => this.handleStartDotaHueService()}>
          Start
        </button>
*/}
      </div>
    );
  }
}

export default App;
