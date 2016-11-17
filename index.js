import colors from 'colors/safe';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan'

import {router} from './api/router';


export const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);
