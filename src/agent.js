import request from 'superagent';

export const saveConfiguration = configuration => {
  request.post('http://localhost:' + process.env.REACT_APP_CONFIGURATION_PORT + '/configuration')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(configuration))
    .end(() => {})
};

export const loadConfiguration = () => (
  request.get('http://localhost:' + process.env.REACT_APP_CONFIGURATION_PORT + '/configuration')
);