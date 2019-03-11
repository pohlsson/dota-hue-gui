const HueService = require('./hueService.js');

module.exports = class EventHandler {

  constructor(configuration) {
    this.setConfiguration(configuration);
    this.state = {
      gameHasStarted: false,
      bountyRuneSpawning: false,
      timedEffectIsActive: false,
      night: false,
    };
    this.activeEvents = [];
  }

  removeEventFromActiveEvents(event) {
    return this.activeEvents.filter(item => item !== event);
  }

  setConfiguration(configuration) {
    if(configuration) {
      this.hueService = new HueService(configuration);
      this.lightConfiguration = configuration.lightConfiguration;
    }
  };

  handlePlayerActivityEvent(activity) {
    if (activity === 'playing') {
      this.state.gameHasStarted = true;
    }
  };

  handleGameStateEvent(gameState) {
    console.log(gameState)
  };

  handleHealthPercentEvent(healthPercent) {
    const healthPercentLimit = 20;
    if (healthPercent < healthPercentLimit && !this.activeEvents.includes('lowHealth')) {
      this.state.timedEffectIsActive = true;
      this.activeEvents.push('lowHealth');
      this.hueService.setLightForEvent(this.lightConfiguration.lowHealth);
    }
    if (healthPercent >= healthPercentLimit && this.activeEvents.includes('lowHealth')) {
      this.state.timedEffectIsActive = false;
      this.removeEventFromActiveEvents('lowHealth');
      this.hueService.resetLights();
    }
  };

  handleManaPercentEvent(manaPercent) {
    const manaPercentLimit = 20;
    if (manaPercent < manaPercentLimit && !this.state.timedEffectIsActive) {
      this.state.timedEffectIsActive = true;
      this.hueService.setLightForEvent(this.lightConfiguration.lowMana);
    }
    if (manaPercent >= manaPercentLimit && this.state.timedEffectIsActive) {
      this.state.timedEffectIsActive = false;
      this.hueService.resetLights();
    }
  };

  handleClockTimeEvent(clockTime) {
    const timeBuffer = 15;
    if (this.lightConfiguration.bountyRuneSpawning && this.lightConfiguration.bountyRuneSpawning.enabled) {
      if ((clockTime + timeBuffer) % 300 === 0 && clockTime > 0 && !this.state.bountyRuneSpawning) {
        this.state.bountyRuneSpawning = true;
        this.hueService.setLightForEvent(this.lightConfiguration.bountyRuneSpawning);
      }
    }
    if (clockTime % 300 === 0 && this.state.bountyRuneSpawning) {
      console.log("Resetting light");
      this.state.bountyRuneSpawning = false;
      this.hueService.resetLights();
    }
  };

  handleDayTimeEvent(dayTime) {
    if (!dayTime) {
      this.state.night = true;
      this.hueService.setDayLight(this.lightConfiguration.night.light);
    }
    if (dayTime) {
      this.state.night = false;
      const dayLights =
      this.hueService.setDayLight(this.defaultLights);
    }
  };
};
