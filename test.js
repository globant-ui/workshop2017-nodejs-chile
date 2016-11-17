import path from 'path';
import Jasmine from 'jasmine';

import {startServer, stopServer} from './api/spec/utils';



export const jasmine = new Jasmine();
jasmine.loadConfigFile(path.join(__dirname, 'jasmine.conf.json'));



jasmine.onComplete(() => stopServer());

startServer().then(() => jasmine.execute());
