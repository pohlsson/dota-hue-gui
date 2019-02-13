import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import {startDotaHueService} from './Api.js';
import {CirclePicker} from 'react-color';

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
          enabled: !state.lightConfiguration[state.selectedEvent].enabled,
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
    return (
      <div className="App">
        <header className="App-header"/>
        <span>Bounty rune will spawn</span>
        <Switch
          checked={this.state.lightConfiguration.bountyRuneSpawning.enabled}
          onChange={() => this.handleToggleSwitch()}
          color="primary"
          inputProps={{
            name: 'bountyRuneSpawning',
          }}
        />
        <CirclePicker
          color={this.state.lightConfiguration[this.state.selectedEvent].color}
          disableAlpha={true}
          onChangeComplete={color => this.handleSelectColor(color)}
        />
        <button onClick={() => this.handleStartDotaHueService()}>
          Start
        </button>
      </div>
    );
  }
}

export default App;
