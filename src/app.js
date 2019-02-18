import React, {Component} from 'react';
import Hue from 'philips-hue';
import {startDotaHueService} from './agent.js';
import ColorSelector from 'event-configuration/colorSelector.js';
import LightSelector from 'event-configuration/lightsSelector.js';
import EnabledSelector from 'event-configuration/enabledSelector.js';
import {Panel, PanelRow, PanelRowTitle, PanelRowContent} from "common/panel.js";
import Button from "@material-ui/core/Button/Button";
import ColorIndicator from "event-configuration/colorIndicator.js";
import HueBridgeSetup from "hueBridgeSetup.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hueBridgeSetupOpen: true,
      selectedEvent: "bountyRuneSpawning",
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
    this.hueService = new Hue();
    this.hueService.bridge = '192.168.0.101';
    this.hueService.username = 'kKhPZ2KLUPV1wamm43A1mmfBS3l9P4Et139tklpm';
  }

  componentWillMount() {
    this.hueService.getLights()
      .then(lights => {
        this.setState({availableLights: Object.keys(lights)})
      });
  }

  handleOpenConfig(event) {
    const openConfigurations = this.toggleList(this.state.openConfigurations, event);
    this.setState({openConfigurations})
  }

  handleConfigChange(event, change) {
    this.setState(state => ({
      lightConfiguration: {
        ...state.lightConfiguration,
        [event]: {
          ...state.lightConfiguration[event],
          ...change,
        }
      }
    }))
  };

  toggleHueBridgeSetup(hueConfiguration) {
    this.setState(state => ({
      hueConfiguration: hueConfiguration.username ? hueConfiguration : null,
      hueBridgeSetupOpen: !state.hueBridgeSetupOpen,
    }));
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
    const {hueConfiguration, lightConfiguration, availableLights, openConfigurations, hueBridgeSetupOpen} = this.state;
    return (
      <div>
        <HueBridgeSetup open={hueBridgeSetupOpen} onClose={hueConfiguration => this.toggleHueBridgeSetup(hueConfiguration)}/>
        {hueConfiguration &&
        <Panel>
          <PanelRow>
            <PanelRowTitle>
              <h3>Bounty rune will spawn</h3>
              <EnabledSelector
                enabled={lightConfiguration.bountyRuneSpawning.enabled}
                onChange={() => this.handleConfigChange('bountyRuneSpawning', {enabled: !lightConfiguration.bountyRuneSpawning.enabled})}
              />
            </PanelRowTitle>
            <PanelRowContent active={openConfigurations.includes('bountyRuneSpawning')}>
              <ColorSelector
                selectedColor={lightConfiguration.bountyRuneSpawning.color}
                onSelectColor={color => {
                  this.handleConfigChange('bountyRuneSpawning', {color});
                }}
              />
              <LightSelector
                lights={availableLights}
                selectedLights={lightConfiguration.bountyRuneSpawning.lights}
                onSelectLight={light => this.handleConfigChange(
                  'bountyRuneSpawning',
                  {
                    lights: this.toggleList(
                      lightConfiguration.bountyRuneSpawning.lights,
                      light
                    )
                  })}
              />
            </PanelRowContent>
            <ColorIndicator
              color={lightConfiguration.bountyRuneSpawning.color
                ? lightConfiguration.bountyRuneSpawning.color.hex
                : "#eee"
              }
              onClick={() => this.handleOpenConfig('bountyRuneSpawning')}
            />
          </PanelRow>
          <PanelRow>
            <PanelRowTitle>
              <h3>Night</h3>
              <EnabledSelector
                enabled={lightConfiguration.night.enabled}
                onChange={() => this.handleConfigChange('night', {enabled: !lightConfiguration.night.enabled})}
              />
            </PanelRowTitle>
            <PanelRowContent active={openConfigurations.includes('night')}>
              <ColorSelector
                selectedColor={lightConfiguration.night.color}
                onSelectColor={color => this.handleConfigChange('night', {color})}
              />
              <LightSelector
                lights={availableLights}
                selectedLights={lightConfiguration.night.lights}
                onSelectLight={light => this.handleConfigChange(
                  'night',
                  {
                    lights: this.toggleList(
                      lightConfiguration.night.lights,
                      light
                    )
                  })}
              />
            </PanelRowContent>
            <ColorIndicator
              color={lightConfiguration.night.color
                ? lightConfiguration.night.color.hex
                : "#eee"
              }
              onClick={() => this.handleOpenConfig('night')}/>
          </PanelRow>
        </Panel> }

        <Button variant="contained" color="primary" onClick={() => startDotaHueService({lightConfiguration})}>
          Load Configuration
        </Button>

      </div>
    );
  }
}

export default App;
