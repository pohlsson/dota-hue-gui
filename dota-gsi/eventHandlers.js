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
  console.log(clockTime);
  if (lightConfiguration.bountyRuneSpawning && lightConfiguration.bountyRuneSpawning.enabled) {
    if ((clockTime + 15) % 300 === 0 && clockTime > 0 && !state.bountyRuneSpawning) {
      state.bountyRuneSpawning = true;
      setLightForEvent(lightConfiguration.bountyRuneSpawning, hueConfiguration);
    }
  }
  if (clockTime % 300 === 0 && state.bountyRuneSpawning) {
    console.log("Resetting light");
    state.bountyRuneSpawning = false;
    resetLights(lightConfiguration, hueConfiguration);
  }
};

const handleDayTimeEvent = (dayTime, configuration) => {
  const {lightConfiguration, hueConfiguration} = configuration;
  if (!dayTime) {
    setLightForEvent(lightConfiguration.night, hueConfiguration);
  }
  if (dayTime) {
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