const {setLightForEvent} = require('./hueService.js');
const state = {
  gameHasStarted: false,
  bountyRuneSpawning: false,
  night: false,
};

const handlePlayerActivityEvent = (activity, lightConfiguration) => {
  console.log(activity)
  if(activity === 'playing') {
    state.gameHasStarted = true;
  }
};

const handleGameStateEvent = (gameState, lightConfiguration) => {
  console.log(gameState)
};

const handleGameTimeEvent = (gameTime, lightConfiguration) => {
  if(lightConfiguration.bountyRuneSpawning && lightConfiguration.bountyRuneSpawning.enabled && state.gameHasStarted) {
    if ((gameTime + 15) % 60 === 0 && !state.bountyRuneSpawning) {
      state.bountyRuneSpawning = true;
      setLightForEvent(lightConfiguration.bountyRuneSpawning);
    }
    if ((gameTime) % 60 === 0 && state.bountyRuneSpawning) {
      state.bountyRuneSpawning = false;
      resetLights(lightConfiguration);
    }
  }
};

const handleDayTimeEvent = (dayTime, lightConfiguration) => {
  if (!dayTime && !state.night && lightConfiguration.night.enabled && state.gameHasStarted) {
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
  handlePlayerActivityEvent,
  handleGameStateEvent,
  handleGameTimeEvent,
  handleDayTimeEvent
};