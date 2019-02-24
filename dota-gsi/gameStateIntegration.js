const d2gsi = require('dota2-gsi');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  handlePlayerActivityEvent,
  handleGameStateEvent,
  handleClockTimeEvent,
  handleDayTimeEvent,
} = require('./eventHandlers.js');

const configurationServerPort = 30033;
const gsiPort = 30011;

let configuration = undefined;

const configurationServer = express();

const jsonfile = require('jsonfile');
jsonfile.readFile('dota-gsi/configuration.json').then(conf => {
  configuration = conf;
  console.log("Loaded configuration");
  console.log(configuration.lightConfiguration)
}).catch(() => console.log("no configuration found"));

configurationServer.use(cors());
configurationServer.use(bodyParser.json());
configurationServer.use(bodyParser.urlencoded({extended: true}));

configurationServer.post('/configuration', (req, res) => {
  configuration = req.body;
  const jsonfile = require('jsonfile');
  jsonfile.writeFile('dota-gsi/configuration.json', configuration, err => {
    if (err) console.error(err)
  });
  console.log("Configuration is updated and saved");
  res.end();
});

configurationServer.get('/configuration', (req, res) => {
  if(configuration) {
    res.send(configuration);
  } else {
    const jsonfile = require('jsonfile');
    jsonfile.readFile('dota-gsi/configuration.json').then(configuration => {
      res.send(configuration);
    }).catch(() => res.send("no configuration found"));
  }
});

configurationServer.listen(configurationServerPort, () => {
  console.log('Configuration server listening on ' + configurationServerPort);
});

const gsiServer = new d2gsi({port: gsiPort});

gsiServer.events.on('newclient', client => {

  client.on('player:activity', activity => {
    if (activity === 'playing') console.log("Game started!");
    handlePlayerActivityEvent(activity, configuration);
  });
  client.on('hero:level', level => {
    console.log("Now level " + level);
  });
  client.on('map:game_state', gameState => handleGameStateEvent(gameState, configuration));
  client.on('map:clock_time', clockTime => handleClockTimeEvent(clockTime, configuration));
  client.on('map:daytime', dayTime => handleDayTimeEvent(dayTime, configuration));

  client.on('abilities:ability0:can_cast', canCast => {
    if (canCast) console.log("Ability0 off cooldown!");
  });
});


