import {database, docTypes} from '../../../database';

import {trackModel} from '../track-model';



describe(`The Track Model`, () => {
    describe(`getList method`, () => {
        it(`should call getListFiltered with no arguments`, () => {
            spyOn(trackModel, 'getListFiltered');
            trackModel.getList();
            expect(trackModel.getListFiltered).toHaveBeenCalled();
            expect(trackModel.getListFiltered).toHaveBeenCalledWith();
        });
    });


    describe(`getById method`, () => {
        it(`should query the database passing a received 'id' argument`, () => {
            let id = 1;
            let query = {_id: id, docType: docTypes.TRACK};
            spyOn(database, 'findOne');

            trackModel.getById(id);
            expect(database.findOne).toHaveBeenCalled();
            expect(database.findOne).toHaveBeenCalledWith(query);
        });
    });


    describe(`getListFiltered method`, () => {
        it(`should query the database passing a received 'filter' argument`, () => {
            let filter = {bla: true};
            let query = Object.assign({}, {docType: docTypes.TRACK}, filter);
            spyOn(database, 'find');

            trackModel.getListFiltered(filter);
            expect(database.find).toHaveBeenCalled();
            expect(database.find).toHaveBeenCalledWith(query);
        });
    });

});
