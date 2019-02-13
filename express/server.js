const express = require('express');
const cors = require('cors');
const bodyParser = require("express");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());


const philipsHueUsername = "ebl5-f1hdWgZBlzopjbnPE8GEkdp2MTaofEAKFya";
const philipsHueIp = "192.168.0.101";

const createDeploymentConfiguration = (lightConfiguration) => {
  const deployment = {};

  deployment['philipsHueUsername'] = philipsHueUsername;
  deployment['philipsHueIp'] = philipsHueIp;

  const applicationConnectors = [{
    type: "http",
    port: 54709
  }];

  const adminConnectors = [{
    type: "http",
    port: "8081",
  }];

  deployment['server'] = {
    applicationConnectors,
    adminConnectors,
  };

  Object.keys(lightConfiguration).map(event => (
    deployment[event] = {
      enabled: lightConfiguration[event].enabled,
      color: {
        saturation: Math.round(lightConfiguration[event].color.s * 100),
        brightness: Math.round(lightConfiguration[event].color.v * 100),
        hue: Math.round(lightConfiguration[event].color.h * 182.041666667)
      }
    }
  ));

  return JSON.stringify(deployment);
};

app.put('/start-service', (req, res) => {
  const {lightConfiguration} = req.body;
  const deployment = createDeploymentConfiguration(lightConfiguration);
  const fs = require('fs');
  fs.writeFile("deployment.json", deployment, err => {
    if(err) {
      return console.log(err);
    }
    const {spawn} = require('child_process');
    const process = spawn('java', ['-jar', 'dota-hue.jar', 'server', 'deployment.json']);

    process.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
    });

    process.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });

    process.on('error', function (code) {
      console.log('error ' + code.toString());
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
