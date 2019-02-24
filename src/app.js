import React, {Component} from 'react';
import {loadConfiguration, saveConfiguration, startDotaHueService} from './agent.js';
import {createGlobalStyle} from 'styled-components';
import Event from 'event-configuration/event';
import IconButton from '@material-ui/core/IconButton';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Settings from '@material-ui/icons/Settings';
import HueBridgeSetup from "hueBridgeSetup.js";
import {SideMenu, SideMenuItem} from './sideMenu.js';
import LightConfiguration from "event-configuration/lightConfiguration.js";
import Header from "header.js";
import Typography from "@material-ui/core/Typography/Typography";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  html {
    background: #4b564f;
  }
  body {
    background: #fff;
    margin: 0 20em 0 25em;
  }
`;

const events = [
  'bountyRuneSpawning',
  'night',
];



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
    };
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


  render() {
    const {hueConfiguration, lightConfiguration, hueBridgeSetupOpen, selectedEvent} = this.state;
    return (
      <div>
        <GlobalStyle/>
        <Header>
          <h1>
            <Typography>
              Dota Hue
            </Typography>
          </h1>
          <IconButton>
            <Settings/>
          </IconButton>
          <IconButton onClick={this.handleSaveConfiguration}>
          <SaveAlt/>
          </IconButton>
        </Header>
        <HueBridgeSetup
          open={hueBridgeSetupOpen}
          onClose={hueConfiguration => this.toggleHueBridgeSetup(hueConfiguration)}
        />
        {hueConfiguration &&
        <SideMenu>
          {events.map(event => (
            <SideMenuItem
              key={event}
              selected={selectedEvent === event}
            >
              <Event
                name={event}
                onClick={() => this.setState({selectedEvent: event})}
                lights={lightConfiguration[event].lights}
              />
            </SideMenuItem>
          ))}
        </SideMenu>}
        <LightConfiguration
          lights={lightConfiguration[selectedEvent].lights}
          onChangeConfiguration={configuration => this.handleUpdateLightConfiguration(selectedEvent, configuration)}
        />
      </div>
    );
  }
}

export default App;
