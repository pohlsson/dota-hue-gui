const {setLightForEvent, resetLights} = require('./hueService.js');
const state = {
  gameHasStarted: false,
  bountyRuneSpawning: false,
  timedEffectIsActive: false,
  night: false,
};

const handlePlayerActivityEvent = activity => {
  if (activity === 'playing') {
    state.gameHasStarted = true;
  }
};

const handleGameStateEvent = gameState => {
  console.log(gameState)
};

const handleHealthPercentEvent = (healthPercent, configuration) => {
  const {lightConfiguration, hueConfiguration} = configuration;
  const healthLimitPercent = 20;
  if(healthPercent < healthLimitPercent && !state.timedEffectIsActive) {
    state.timedEffectIsActive = true;
    setLightForEvent(lightConfiguration.lowHealth, hueConfiguration);
  }
  if(healthPercent >= healthLimitPercent && state.timedEffectIsActive) {
    state.timedEffectIsActive = false;
    handleResetLights(lightConfiguration, hueConfiguration);
  }
};

const handleClockTimeEvent = (clockTime, configuration) => {
  const {lightConfiguration, hueConfiguration} = configuration;
  const timeBuffer = 15;
  if (lightConfiguration.bountyRuneSpawning && lightConfiguration.bountyRuneSpawning.enabled) {
    if ((clockTime + timeBuffer) % 300 === 0 && clockTime > 0 && !state.bountyRuneSpawning) {
      state.bountyRuneSpawning = true;
      setLightForEvent(lightConfiguration.bountyRuneSpawning, hueConfiguration);
    }
  }
  if (clockTime % 300 === 0 && state.bountyRuneSpawning) {
    console.log("Resetting light");
    state.bountyRuneSpawning = false;
    handleResetLights(lightConfiguration, hueConfiguration);
  }
};

const handleDayTimeEvent = (dayTime, configuration) => {
  const {lightConfiguration, hueConfiguration} = configuration;
  if (!dayTime) {
    state.night = true;
    setLightForEvent(lightConfiguration.night, hueConfiguration);
  }
  if (dayTime) {
    state.night = false;
    handleResetLights(lightConfiguration, hueConfiguration);
  }
};

const handleResetLights = (lightConfiguration, hueConfiguration) => {
  if (state.night && lightConfiguration.night.enabled) {
    setLightForEvent(lightConfiguration.night, hueConfiguration);
  } else {
    resetLights(hueConfiguration);
  }
};

module.exports = {
  handleHealthPercentEvent,
  handlePlayerActivityEvent,
  handleGameStateEvent,
  handleClockTimeEvent,
  handleDayTimeEvent
};