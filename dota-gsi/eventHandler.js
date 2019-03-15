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
    this.activeEvents = {};
  }

  setConfiguration(configuration) {
    if (configuration) {
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
  };

  handleLevelEvent(level) {
    switch (level) {
      case 1:
        this.hueService.resetLights();
    }
  }

  handleHealthPercentEvent(healthPercent) {
    const healthPercentLimit = 25;
    if (healthPercent < healthPercentLimit && !this.activeEvents.lowHealth) {
      this.activeEvents.lowHealth = true;
      this.hueService.setLightForEvent(this.lightConfiguration.lowHealth);
    }
    if (healthPercent >= healthPercentLimit && this.activeEvents.lowHealth) {
      this.activeEvents.lowHealth = false;
      this.hueService.resetLights();
    }
  };

  handleManaPercentEvent(manaPercent) {
    const manaPercentLimit = 20;
    if (manaPercent < manaPercentLimit && !this.activeEvents.lowMana) {
      this.activeEvents.lowMana = true;
      this.hueService.setLightForEvent(this.lightConfiguration.lowMana);
    }
    if (manaPercent >= manaPercentLimit && this.activeEvents.lowMana) {
      this.activeEvents.lowMana = false;
      this.hueService.resetLights();
    }
  };

  handleClockTimeEvent(clockTime) {
    const timeBuffer = 15;
    if (this.lightConfiguration.bountyRuneSpawning && this.lightConfiguration.bountyRuneSpawning.enabled) {
      if ((clockTime + timeBuffer) % 300 === 0 && (clockTime > 0) && !this.activeEvents.bountyRuneSpawning) {
        this.activeEvents.bountyRuneSpawning = true;
        this.hueService.setLightForEvent(this.lightConfiguration.bountyRuneSpawning);
      }
    }
    if (clockTime % 300 === 0 && this.activeEvents.bountyRuneSpawning) {
      this.activeEvents.bountyRuneSpawning = false;
      this.hueService.resetLights();
    }
  };

  handleDayTimeEvent(dayTime) {
    if(this.lightConfiguration.night && this.lightConfiguration.night.enabled) {
      if (!dayTime) {
        this.hueService.setDefaultLight(this.lightConfiguration.night.lights);
      }
      if (dayTime) {
        this.hueService.setDefaultLight();
      }
    }
  };
};
