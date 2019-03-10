const Hue = require('philips-hue');

module.exports = class HueService {

  constructor(configuration) {
    this.hue = new Hue();
    if (configuration) {
      this.hue.bridge = configuration.hueConfiguration.bridge;
      this.hue.username = configuration.hueConfiguration.username;
      this.lightConfiguration = configuration.lightConfiguration;
      this.hue.getLights().then(lights => {
        this.availableLightIds = Object.keys(lights).filter(lightId => lights[lightId].productname.includes('color'))
      }).catch(err => console.log(err));
    }
    this.defaultLight = {
      hue: 1000,
      sat: 0,
      bri: 254,
    };
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

  setDefaultLight(defaultLight) {
    this.defaultLight = defaultLight;
    this.resetLights();
  };

  resetLights() {
    console.log(this.availableLightIds);
    this.availableLightIds.map(light => (
      this.hue.light(light).setState(this.defaultLight)
    ));
  };
};
