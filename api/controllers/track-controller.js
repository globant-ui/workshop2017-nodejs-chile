import {trackModel} from '../models';


class TrackControllerClass {
    getList (req, res) {
        return trackModel.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }
}

export const trackController = new TrackControllerClass();
