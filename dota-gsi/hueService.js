const Hue = require('philips-hue');
const hueService = new Hue();

hueService.bridge = '192.168.0.101';
hueService.username = 'kKhPZ2KLUPV1wamm43A1mmfBS3l9P4Et139tklpm';

const setLightForEvent = event => {
  if (event !== undefined) {
    const hue = Math.round(event.color.hsv.h * 182);
    const sat = Math.round(event.color.hsv.s * 255);
    const bri = Math.round(event.color.hsv.v * 255);

    event.lights.map(lightId => hueService.light(lightId).setState({hue, sat, bri}));
  }
};

module.exports = {
  setLightForEvent
};