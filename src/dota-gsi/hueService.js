const Hue = require('philips-hue');
const hueService = new Hue();

hueService.bridge = '192.168.0.101';
hueService.username = 'kKhPZ2KLUPV1wamm43A1mmfBS3l9P4Et139tklpm';

const setLightForEvent = event => {
  if(event !== undefined) {
    if(event.on) {
      hueService.light(4).on();
    } else {
      hueService.light(4).off();
    }
    const hue = Math.round(event.color.h * 182.041666667);
    const sat = Math.round(event.color.s) * 100;
    const bri = Math.round(event.color.v)* 100;
    //hueService.light(4).setState({hue, sat, bri});
    console.log(hue)
    console.log(sat)
    console.log(bri)
  }
};



module.exports = {
  setLightForEvent
};