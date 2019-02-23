import React, {Component} from 'react';
import Hue from 'philips-hue';
import styled from 'styled-components';
import {startDotaHueService, saveConfiguration, loadConfiguration} from './agent.js';
import Event from 'event-configuration/event';
import Button from "@material-ui/core/Button/Button";
import HueBridgeSetup from "hueBridgeSetup.js";
import {List, ListItem} from 'common/list';
import LightConfiguration from "event-configuration/lightConfiguration.js";

const events = [
  'bountyRuneSpawning',
  'night',
];

const StyledApp = styled.div`
  position: absolute;
  left: 0;
  max-width: 20em;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hueBridgeSetupOpen: false,
      selectedEvent: events[0],
      availableLights: [],
      openConfigurations: [],
      lightConfiguration: {
        bountyRuneSpawning: {
          enabled: true,
          lights: [],
        },
        night: {
          enabled: true,
          lights: [],
        }
      },
      // hueConfiguration: {
      //   bridge: '192.168.0.101',
      //   username: 'kKhPZ2KLUPV1wamm43A1mmfBS3l9P4Et139tklpm',
      // }
    };
    this.hueService = new Hue();
    this.hueService.bridge = '192.168.0.101';
    this.hueService.username = 'kKhPZ2KLUPV1wamm43A1mmfBS3l9P4Et139tklpm';
  }

  componentWillMount() {
    loadConfiguration().then(res => {
      if (res.body === "no configuration found") {
        console.log("HERE")
      }
      this.setState({
        hueConfiguration: res.body.hueConfiguration,
        lightConfiguration: res.body.lightConfiguration,
      })
    }).catch(() => {
      this.setState({hueBridgeSetupOpen: true})
    });
  }

  handleSaveConfiguration = () => {
    const {hueConfiguration, lightConfiguration} = this.state;
    saveConfiguration({
      hueConfiguration,
      lightConfiguration,
    });
  };

  handleUpdateLightConfiguration = (event, configuration) => {
    console.log(configuration)
    this.setState(state => ({
      lightConfiguration: {
        ...state.lightConfiguration,
        [event]: {
          ...state.lightConfiguration[event],
          lights: configuration,
        },
      }
    }))
  };

  toggleHueBridgeSetup(hueConfiguration) {
    if (hueConfiguration.username) {
      const lightConfiguration = events.reduce((acc, event) => {
        return ({
          ...acc,
          [event]: {
            enabled: true,
            lights: hueConfiguration.lights,
          }
        })
      }, {});

      this.setState({
        hueConfiguration,
        lightConfiguration,
      })
    }
    this.setState(state => ({hueBridgeSetupOpen: !state.hueBridgeSetupOpen}));
  }

  toggleList(list, item) {
    if (list.includes(item)) {
      return list.filter(i => i !== item);
    } else {
      return [
        ...list,
        item,
      ];
    }
  };

  render() {
    const {hueConfiguration, lightConfiguration, hueBridgeSetupOpen, selectedEvent} = this.state;
    return (
      <StyledApp>
        <HueBridgeSetup
          open={hueBridgeSetupOpen}
          onClose={hueConfiguration => this.toggleHueBridgeSetup(hueConfiguration)}
        />
        {hueConfiguration &&
        <List>
          {events.map(event => (
            <ListItem key={event}>
              <Event
                name={event}
                onClick={() => this.setState({selectedEvent: event})}
                lights={lightConfiguration[event].lights}
              />
            </ListItem>
          ))}
        </List>}
        <LightConfiguration
          lights={lightConfiguration[selectedEvent].lights}
          onChangeConfiguration={configuration => this.handleUpdateLightConfiguration(selectedEvent, configuration)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => startDotaHueService({lightConfiguration})}
        >
          Load Configuration
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSaveConfiguration}
        >
          Save Configuration
        </Button>
      </StyledApp>
    );
  }
}

export default App;
