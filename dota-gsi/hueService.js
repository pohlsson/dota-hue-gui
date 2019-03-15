const Hue = require('philips-hue');
const DAY_LIGHT_COLOR = "#ffffe6";

module.exports = class HueService {

  constructor(configuration) {
    this.hue = new Hue();
    if (configuration) {
      this.hue.bridge = configuration.hueConfiguration.bridge;
      this.hue.username = configuration.hueConfiguration.username;
      this.lightConfiguration = configuration.lightConfiguration;
      this.hue.getLights().then(lights => {
        const availableLightIds = Object.keys(lights).filter(lightId => lights[lightId].productname.includes('color'));
        this.dayLight = availableLightIds.map((lightId) => ({
          id: lightId,
          enabled: true,
          color: DAY_LIGHT_COLOR,
        }));
        this.defaultLight = this.dayLight;
      }).catch(err => console.log(err));
    }
  };

  setLightForEvent(event) {
    if (event !== undefined) {
      event.lights.map(light => this.setLight(light));
    }
  };

  setLight(light) {
    if (light.enabled) {
      const convert = require('color-convert');
      const [h] = convert.hex.hsv(light.color);
      this.hue.light(light.id).setState({
        hue: h * 182,
        sat: 254,
        bri: 254,
      })
    }
  };

  setDefaultLight(defaultLight) {
    if(defaultLight) {
      this.defaultLight = defaultLight;
    }
    else {
      this.defaultLight = this.dayLight;
    }
    this.resetLights();
  };

  resetLights() {
    this.defaultLight.map(light => this.setLight(light));
  };
};
