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

const resetLights = hueConfiguration =>  {
  const {bridge, username, lights} = hueConfiguration;
  hueService.bridge = bridge;
  hueService.username = username;
  lights.map(light => (
    hueService.light(light.id).setState({
      hue: 0,
      sat: 0,
      bri: 150,
    })
  ));
};

module.exports = {
  setLightForEvent,
  resetLights,
};