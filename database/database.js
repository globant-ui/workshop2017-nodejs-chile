import Datastore from 'nedb';
import Promise from 'bluebird';



export class Database extends Datastore {
    constructor (options) {
        super(options);
    }

    promisifyParentMethod (parentMethod, parentArguments) {
        if (typeof parentArguments[parentArguments.length] === 'function') {
            super[parentMethod](...parentArguments);
        } else {
            return new Promise((resolve, reject) => {
                const parentCallback = (error, data) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(data);
                };

                parentArguments.push(parentCallback);

                super[parentMethod](...parentArguments);
            });
        }
    }

    insert (document, callback) {
        return this.promisifyParentMethod('insert', [...arguments]);
    }

    remove (query, options, callback) {
        return this.promisifyParentMethod('remove', [...arguments]);
    }

    find (query, callback) {
        return this.promisifyParentMethod('find', [...arguments]);
    }

    findOne (query, callback) {
        return this.promisifyParentMethod('findOne', [...arguments]);
    }

    count (query, callback) {
        return this.promisifyParentMethod('count', [...arguments]);
    }

    update (query, update, options, callback) {
        return this.promisifyParentMethod('update', [...arguments]);
    }
}


export const database = new Database({
    filename: './database/workshop.db',
    autoload: true,
    timestampData: true
});
