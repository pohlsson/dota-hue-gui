import fs from 'fs';
import cmd from 'node-cmd';

export const startDotaHueService = () => {
  let configuration = JSON.stringify({foo: true});
  fs.write('deployment.json', configuration, 'utf8', () => cmd.run('java -jar sqlproxy-1.0.0.1549017819952.jar server deployment'));
};