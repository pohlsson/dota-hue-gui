import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {startDotaHueService} from './DotaHueServiceAgent.js';
import './App.css';

const colors = {
  red: {
    hue: 0,
    sat: 100,
    bri: 66,
  },
  blue: {
    hue: 234,
    sat: 100,
    bri: 66,
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bountyRuneSpawning: true,
      color: Object.keys(colors)[0],
    };
  }

  handleToggleSwitch() {
    this.setState(state => ({
      bountyRuneSpawning: !state.bountyRuneSpawning,
    }));
  }

  handleSelectColor(color) {
    this.setState({color});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <span>Bounty rune will spawn</span>
        <Switch
          checked={this.state.bountyRuneSpawning} q
          onChange={() => this.handleToggleSwitch()}
          color="primary"
          inputProps={{
            name: 'bounty-rune-spawning',
          }}
        />
        <Select
          value={this.state.color}
          onChange={input => this.handleSelectColor(input.target.value)}
          inputProps={{
            name: 'bounty-rune-spawning-color',
          }}
        >
          {Object.keys(colors).map(color => (
            <MenuItem value={color}>{color}</MenuItem>
          ))}
        </Select>
        <button onClick={startDotaHueService}>
          Start
        </button>
      </div>
    );
  }
}

export default App;
