import express from 'express';
import colors from 'colors/safe';


import {
    trackController
} from './controllers';


export const router = express.Router();



// API Routes
router.get('/tracks', trackController.getList);
