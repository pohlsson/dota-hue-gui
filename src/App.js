import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bountyRuneSpawning: true,
    };
  }

  handleToggleSwitch() {
    this.setState(state => ({
      bountyRuneSpawning: !state.bountyRuneSpawning,
    }));
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
      </div>
    );
  }
}

export default App;
