import fetch from 'node-fetch';

import {app} from '../../';


const PORT = 5001;
let server;


export function callAPI(path, statusCode = 200) {
    return fetch(`http://localhost:${PORT+1}${path}`)
        .then(res => res)
        .catch(err => {
            throw err
        });
}


export function startServer () {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT+1, resolve);
        server.on('error', reject);
    })
}

export function stopServer () {
    return new Promise((resolve, reject) => {
        server.on('error', reject);
        server.close(resolve);
    });
}

export function restartServer () {
    console.log('restartServer');
    return stopServer().then(startServer);
}



export function registerAllAPIAttrTests (APIObjSignature, APIData) {
    Object.keys(APIObjSignature).forEach(key => {
        it(`should be an object containing '${key}'`, () => {
            if (APIData instanceof Array) {
                expect(APIData.length).toBeGreaterThan(0);
            } else {
                APIData = [APIData];
            }

            APIData.forEach(item => {
                expect(item).toEqual(
                    jasmine.objectContaining({[key]: APIObjSignature[key]})
                );
            });
        });
    });
}
