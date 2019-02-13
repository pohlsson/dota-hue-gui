const setLightForEvent = require('./hueService.js');
const state = {
  blocked: false,
  night: false,
};

const handleGameTimeEvent = (gameTime, lightConfiguration) => {
  if ((gameTime + 15) % 60 === 0 && !state.blocked) {
    setLightForEvent(lightConfiguration.bountyRuneSpawning);
    state.blocked = true;
  }
  if ((gameTime) % 60 === 0 && state.blocked) {
    setLightForEvent(lightConfiguration.default);
    state.blocked = false;
  }
};

const handleDayTimeEvent = (dayTime, lightConfiguration) => {
  if (!dayTime && !state.night) {
    setLightForEvent(lightConfiguration.night);
    state.night = true;
  }
  if (dayTime && state.isNight) {
    setLightForEvent(lightConfiguration.default);
    state.isNight = false;
  }
};

module.exports = {
  handleGameTimeEvent,
  handleDayTimeEvent
};