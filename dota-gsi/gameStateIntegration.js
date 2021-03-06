const d2gsi = require('dota2-gsi');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const EventHandler = require('./eventHandler.js');
const banner = require('./banner.js');
const pjson = require('../package.json');
const configurationServerPort = 30033;
const gsiPort = 30011;
const configurationServer = express();

const eventHandler = new EventHandler();

const jsonfile = require('jsonfile');
jsonfile.readFile('dota-gsi/configuration.json').then(configuration => {
  eventHandler.setConfiguration(configuration);
  console.log("Loaded configuration");
}).catch(() => console.log("No configuration found"));

configurationServer.use(cors());
configurationServer.use(bodyParser.json());
configurationServer.use(bodyParser.urlencoded({extended: true}));

configurationServer.post('/configuration', (req, res) => {
  const configuration = req.body;
  const jsonfile = require('jsonfile');
  jsonfile.writeFile('dota-gsi/configuration.json', configuration, err => {
    if (err) console.error(err)
  });
  eventHandler.setConfiguration(configuration);
  console.log("Configuration is updated and saved");
  res.end();
});

configurationServer.get('/configuration', (req, res) => {
  jsonfile.readFile('dota-gsi/configuration.json').then(configuration => {
    res.send(configuration);
  }).catch(() => res.sendStatus(404));
});

configurationServer.listen(configurationServerPort, () => {
  console.log(banner() + "v." + pjson.version + "\n\n");
});

const gsiServer = new d2gsi({port: gsiPort});

gsiServer.events.on('newclient', client => {

  client.on('player:activity', activity => {
    if (activity === 'playing') console.log("Game started!");
    eventHandler.handlePlayerActivityEvent(activity);
  });
  client.on('hero:level', level =>  eventHandler.handleLevelEvent(level));
  client.on('hero:health_percent', healthPercent => eventHandler.handleHealthPercentEvent(healthPercent));
  client.on('hero:mana_percent', manaPercent => eventHandler.handleManaPercentEvent(manaPercent));
  client.on('map:game_state', gameState => eventHandler.handleGameStateEvent(gameState));
  client.on('map:clock_time', clockTime => eventHandler.handleClockTimeEvent(clockTime));
  client.on('map:daytime', dayTime => eventHandler.handleDayTimeEvent(dayTime));

  client.on('abilities:ability0:can_cast', canCast => {

  });
});


