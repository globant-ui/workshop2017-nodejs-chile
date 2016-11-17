import {database, docTypes} from '../../database';


export class TrackModelClass {
    getList () {
        return database.find({docType: docTypes.TRACK})
    }
}


export const trackModel = new TrackModelClass();
