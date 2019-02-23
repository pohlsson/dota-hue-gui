const Hue = require('philips-hue');
const hueService = new Hue();

const setLightForEvent = (event, hueConfiguration) => {
  hueService.bridge = hueConfiguration.bridge;
  hueService.username = hueConfiguration.username;
  if (event !== undefined) {
    const convert = require('color-convert');
    event.lights.map(light => {
      if(light.enabled) {
        const [h] = convert.hex.hsv(light.color);
        hueService.light(light.id).setState({
          hue: h * 182,
          sat: 254,
          bri: 254,
        })
      }
    });
  }
};

module.exports = {
  setLightForEvent
};