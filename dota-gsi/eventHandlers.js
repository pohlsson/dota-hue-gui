const {setLightForEvent} = require('./hueService.js');
const state = {
  gameHasStarted: false,
  bountyRuneSpawning: false,
  night: false,
};

const handlePlayerActivityEvent = (activity, configuration) => {
  console.log(activity)
  if (activity === 'playing') {
    state.gameHasStarted = true;
  }
};

const handleGameStateEvent = (gameState, configuration) => {
  console.log(gameState)
};

const handleClockTimeEvent = (clockTime, configuration) => {
  const {lightConfiguration, hueConfiguration} = configuration;
  if ((clockTime + 2) % 5 === 0 && !state.bountyRuneSpawning) {
    state.bountyRuneSpawning = true;
    setLightForEvent(lightConfiguration.bountyRuneSpawning, hueConfiguration);
  }
  if (clockTime % 5 === 0 && state.bountyRuneSpawning) {
    state.bountyRuneSpawning = false;
    resetLights(lightConfiguration, hueConfiguration);
  }
};

const handleDayTimeEvent = (dayTime, lightConfiguration, hueConfiguration) => {
  if (!dayTime && !state.night && lightConfiguration.night.enabled && state.gameHasStarted) {
    state.night = true;
    setLightForEvent(lightConfiguration.night, hueConfiguration);
  }
  if (dayTime && state.night) {
    state.night = false;
    resetLights(lightConfiguration, hueConfiguration);
  }
};

const resetLights = (lightConfiguration, hueConfiguration) => {
  if (state.night) {
    setLightForEvent(lightConfiguration.night, hueConfiguration);
  } else {
    setLightForEvent(lightConfiguration.default, hueConfiguration);
  }
};

module.exports = {
  handlePlayerActivityEvent,
  handleGameStateEvent,
  handleClockTimeEvent,
  handleDayTimeEvent
};