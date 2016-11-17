import {callAPI} from '../utils';
import {albumSignature} from '../signatures/album';
import {trackSignature} from '../signatures/track';



let res;
let json;


describe(`The route`, () => {
    describe(`to /albums`, () => {
        beforeAll((done) => {
            callAPI('/albums')
                .then(data => res = data)
                .then(data => res.json())
                .then(data => json = data)
                .then(done, done.fail);
        });


        it(`should return a 200 status code`, () => {
            expect(res.status).toBe(200);
        });


        it(`should return an array of bands`, () => {
            expect(json).toEqual(jasmine.any(Array));
        });


        it(`should be and object`, function () {
            expect(json.every(item => item instanceof Object)).toBe(true);
        });


        // registers multiple tests
        registerAllAPIAttrTests(albumSignature);
    });


	describe(`to /albums/:id`, () => {
		beforeAll((done) => {
			callAPI('/albums/0f9qO0HL9nJkmzu4')
			  .then(data => res = data)
			  .then(data => res.json())
			  .then(data => json = data)
			  // registers multiple tests
			  .then(done, done.fail);
		});


		it(`should return a 200 status code`, () => {
			expect(res.status).toBe(200);
		});


		it(`should return an array of bands`, () => {
			expect(json).toEqual(jasmine.any(Object));
		});


		it(`should be and object`, function () {
			expect(json instanceof Object).toBe(true);
		});


		registerAllAPIAttrTests(albumSignature);
	});


	describe(`to /albums/:id/tracks`, () => {
		beforeAll((done) => {
			callAPI('/albums/0f9qO0HL9nJkmzu4/tracks')
			  .then(data => res = data)
			  .then(data => res.json())
			  .then(data => json = data)
			  // registers multiple tests
			  .then(done, done.fail);
		});


		it(`should return a 200 status code`, () => {
			expect(res.status).toBe(200);
		});


		it(`should return an array of bands`, () => {
			expect(json).toEqual(jasmine.any(Object));
		});


		it(`should be and object`, function () {
			expect(json instanceof Object).toBe(true);
		});


		registerAllAPIAttrTests(trackSignature);
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
