const setLightForEvent = require('./hueService.js');
const state = {
  blocked: false,
  night: false,
};

const handleGameTimeEvent = (gameTime, lightConfiguration) => {
  if ((gameTime + 15) % 60 === 0 && !state.blocked) {
    state.blocked = true;
    setLightForEvent(lightConfiguration.bountyRuneSpawning);
  }
  if ((gameTime) % 60 === 0 && state.blocked) {
    state.blocked = false;
    resetLights(lightConfiguration);
  }
};

const handleDayTimeEvent = (dayTime, lightConfiguration) => {
  if (!dayTime && !state.night) {
    state.night = true;
    setLightForEvent(lightConfiguration.night);
  }
  if (dayTime && state.night) {
    state.night = false;
    resetLights(lightConfiguration);
  }
};

const resetLights = lightConfiguration => {
  if (state.night) {
    setLightForEvent(lightConfiguration.night);
  } else {
    setLightForEvent(lightConfiguration.default);
  }
};

module.exports = {
  handleGameTimeEvent,
  handleDayTimeEvent
};