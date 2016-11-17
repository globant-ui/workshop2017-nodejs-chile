import {callAPI} from '../utils';
import {bandSignature} from '../signatures/band';
import {albumSignature} from '../signatures/album';
import {artistSignature} from '../signatures/artist';




let res;
let json;



describe(`The route`, () => {
    describe(`to /bands`, () => {
        beforeAll((done) => {
            callAPI('/bands')
                .then(data => res = data)
                .then(data => res.json())
                .then(data => json = data)
                .then(done, done.fail);
        });


        it(`should return a 200 status code`, () => {
            expect(res.status).toBe(200);
        });


        it(`should return an array of artists`, () => {
            expect(json).toEqual(jasmine.any(Array));
        });


        it(`should be an object`, function () {
            expect(json.every(item => item instanceof Object)).toBe(true);
        });


        // registers multiple tests
        registerAllAPIAttrTests(bandSignature);
    });


    describe(`to /bands/:id`, () => {
        beforeAll((done) => {
            callAPI('/bands/2K8WQ2Emoxt70A3V')
                .then(data => res = data)
                .then(data => res.json())
                .then(data => json = data)
                .then(done, done.fail);
        });


        it(`should return a 200 status code`, () => {
            expect(res.status).toBe(200);
        });


        it(`should return an object`, () => {
            expect(json).toEqual(jasmine.any(Object));
        });


        // registers multiple tests
        registerAllAPIAttrTests(bandSignature);
    });


    describe(`to /bands/:id/albums`, () => {
        beforeAll((done) => {
            callAPI('/bands/2K8WQ2Emoxt70A3V/albums')
                .then(data => res = data)
                .then(data => res.json())
                .then(data => json = data)
                .then(done, done.fail);
        });


        it(`should return a 200 status code`, () => {
            expect(res.status).toBe(200);
        });


        it(`should return an array of albums`, () => {
            expect(json).toEqual(jasmine.any(Array));
        });


        it(`should be an object`, function () {
            expect(json.every(item => item instanceof Object)).toBe(true);
        });


        // registers multiple tests
        registerAllAPIAttrTests(albumSignature);
    });


    describe(`to /bands/:id/artists`, () => {
        beforeAll((done) => {
            callAPI('/bands/2K8WQ2Emoxt70A3V/artists')
                .then(data => res = data)
                .then(data => res.json())
                .then(data => json = data)
                .then(done, done.fail);
        });


        it(`should return a 200 status code`, () => {
            expect(res.status).toBe(200);
        });


        it(`should return an array of artists`, () => {
            expect(json).toEqual(jasmine.any(Array));
        });


        it(`should be an object`, function () {
            expect(json.every(item => item instanceof Object)).toBe(true);
        });


        // registers multiple tests
        registerAllAPIAttrTests(artistSignature);
    });
});



function registerAllAPIAttrTests (itemSignature) {
    Object.keys(itemSignature).forEach(key => {
        it(`should be an object containing '${key}'`, () => {
            if (json instanceof Array) {
                expect(json.length).toBeGreaterThan(0);
            } else {
                json = [json];
            }

            json.forEach(item => {
                expect(item).toEqual(
                    jasmine.objectContaining({[key]: itemSignature[key]})
                );
            });
        });
    });
}
