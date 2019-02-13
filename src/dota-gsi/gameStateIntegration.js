const d2gsi = require('dota2-gsi');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {setLightForEvent} = require('./hueService.js');

const configurationServerPort = process.env.REACT_APP_CONFIGURATION_PORT || 30033;
const gsiPort = process.env.REACT_APP_GSI_PORT || 30011;

let lightConfiguration = {}
const configurationServer = express();


configurationServer.use(cors());
configurationServer.use(bodyParser.json());
configurationServer.use(bodyParser.urlencoded({extended: true}));
configurationServer.post('/', (req, res) => {
  console.log(req.body.bountyRuneSpawning.color.h * 182);
  lightConfiguration = req.body;
  res.end();
});

configurationServer.listen(configurationServerPort, () => {
  console.log('Configuration server listening on ' + configurationServerPort);
});

const gsiServer = new d2gsi({port: gsiPort});

gsiServer.events.on('newclient', client => {
  client.on('player:activity', activity => {
    if (activity === 'playing') console.log("Game started!");
  });
  client.on('hero:level', level => {
    console.log("Now level " + level);
  });

  client.on('map:game_time', gameTime => getColorForGameTimeEvent(gameTime));

  client.on('abilities:ability0:can_cast', canCast => {
    if (canCast) console.log("Ability0 off cooldown!");
  });
});


const getColorForGameTimeEvent = gameTime => {
  if (gameTime % 5 === 0) {
    setLightForEvent(lightConfiguration.bountyRuneSpawning)
  }
};


