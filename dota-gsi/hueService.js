const Hue = require('philips-hue');

const DEFAULT_DAY_LIGHT = {
  hue: 0,
  sat: 0,
  bri: 254,
};

module.exports = class HueService {

  constructor(configuration) {
    this.hue = new Hue();
    if (configuration) {
      this.hue.bridge = configuration.hueConfiguration.bridge;
      this.hue.username = configuration.hueConfiguration.username;
      this.lightConfiguration = configuration.lightConfiguration;
      this.hue.getLights().then(lights => {
        this.availableLightIds = Object.keys(lights).filter(lightId => lights[lightId].productname.includes('color'));
        this.dayLight = this.availableLightIds.reduce((lightId, acc) => ({
          ...acc,
          [lightId]: DEFAULT_DAY_LIGHT
        }), []);
      }).catch(err => console.log(err));
    }
  }

  setLightForEvent(event) {
    if (event !== undefined) {
      const convert = require('color-convert');
      event.lights.map(light => {
        if (light.enabled) {
          const [h] = convert.hex.hsv(light.color);
          this.hue.light(light.id).setState({
            hue: h * 182,
            sat: 254,
            bri: 254,
          })
        }
      });
    }
  };

  setDayLight(daylight) {
    let updatedDayLight = this.dayLight;

    this.resetLights();
  };

  resetLights() {
    this.availableLightIds.map((lightId, index) => (
      this.hue.light(lightId).setState(this.dayLight[index])
    ));
  };
};
