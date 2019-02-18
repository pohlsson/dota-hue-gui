import request from 'superagent';

export const startDotaHueService = configuration => {
  request.post('http://localhost:' + process.env.REACT_APP_CONFIGURATION_PORT)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(configuration.lightConfiguration))
    .end(() => {})
};

export const saveHueConfiguration = configuration => {
  request.post('http://localhost:' + process.env.REACT_APP_CONFIGURATION_PORT)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(configuration.lightConfiguration))
    .end(() => {})
};