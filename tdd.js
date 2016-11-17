let failFast = require('jasmine-fail-fast');
import {jasmine} from './test';


jasmine.addReporter(failFast.init());
