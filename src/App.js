import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
      color: colors.red,
    };
  }

  handleToggleSwitch() {
    this.setState(state => ({
      bountyRuneSpawning: !state.bountyRuneSpawning,
    }));
  }

  handleSelectColor(color) {
    this.setState({color: colors[color]});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <span>Bounty rune will spawn</span>
        <Switch
          checked={this.state.bountyRuneSpawning}
          onChange={() => this.handleToggleSwitch()}
          color="primary"
        />
        <Select
          value={this.state.color}
          onChange={input => this.handleSelectColor(input.target.value)}
          inputProps={{
            name: Object.keys(this.state.color)[0],
          }}
        >
          {console.log(this.state.color)}
          {Object.keys(colors).map(color => (
            <MenuItem value={color}>{color}</MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export default App;
