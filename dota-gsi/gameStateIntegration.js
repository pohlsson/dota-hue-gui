const d2gsi = require('dota2-gsi');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  handlePlayerActivityEvent,
  handleGameStateEvent,
  handleGameTimeEvent,
  handleDayTimeEvent,
} = require('./eventHandlers.js');

const configurationServerPort = process.env.REACT_APP_CONFIGURATION_PORT || 30033;
const gsiPort = process.env.REACT_APP_GSI_PORT || 30011;

let lightConfiguration = {
  default: {
    on: true,
    lights: [1,2,3,4,5],
    color: {
      hsv: {
        h: 0,
        s: 0,
        v: 1,
      }
    }
  }
};
const configurationServer = express();

configurationServer.use(cors());
configurationServer.use(bodyParser.json());
configurationServer.use(bodyParser.urlencoded({extended: true}));

configurationServer.post('/', (req, res) => {
  lightConfiguration = Object.assign({}, lightConfiguration, req.body);
  res.end();
});

configurationServer.listen(configurationServerPort, () => {
  console.log('Configuration server listening on ' + configurationServerPort);
});

const gsiServer = new d2gsi({port: gsiPort});

gsiServer.events.on('newclient', client => {

  client.on('player:activity', activity => {
    if (activity === 'playing') console.log("Game started!");
    handlePlayerActivityEvent(activity, lightConfiguration);
  });
  client.on('hero:level', level => {
    console.log("Now level " + level);
  });
  client.on('map:game_state', gameState => handleGameStateEvent(gameState, lightConfiguration));
  client.on('map:game_time', gameTime => handleGameTimeEvent(gameTime, lightConfiguration));
  client.on('map:daytime', dayTime => handleDayTimeEvent(dayTime, lightConfiguration));

  client.on('abilities:ability0:can_cast', canCast => {
    if (canCast) console.log("Ability0 off cooldown!");
  });
});


